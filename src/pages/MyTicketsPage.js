import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import NoAccess from "../components/NoAccess";
import TicketTile from "../components/TicketTile";
import { useAuth } from "../contexts/AuthContextProvider"
import { getUserDetailsFromDbById } from "../firebase/dbUserDetailService";
import { getTicketsCreatedByUser } from "../firebase/ticketService";
import { userHasAccessToPage } from "../utils/accessControlUtil";

/**
 * this page is only for customer role
 */
export default function MyTicketsPage() {
    // const [userDetails, setUserDetails] = useState({});
    const [ticketsCreatedByUser, setTicketsCreatedByUser] = useState([]);
    const [hasPageAccess, setHasPageAccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { loggedInUser } = useAuth();


    useEffect(function () {
        if (!loggedInUser) {
            return;
        }

        var args = {
            entity: "my-tickets",
            entityType: "page",
            loggedInUser
        };
        userHasAccessToPage(args).then((response)=>{
            setHasPageAccess(response);
            if(!response) {
                setIsLoading(false);
            }
        })

        // getTicketsCreatedByUser(loggedInUser.uid).then((response) => {
        //     console.debug("response", response);
        //     setTicketsCreatedByUser(response);
        // });
    }, []);

    useEffect(()=>{
        if(hasPageAccess) {
            getTicketsCreatedByUser(loggedInUser.uid).then((response) => {
                console.debug("response", response);
                setTicketsCreatedByUser(response);
                setIsLoading(false);
            });
        }
    }, [hasPageAccess])

    // useEffect(function(){
    //     getUserDetailsFromDbById(loggedInUser.uid).then((response)=>{
    //         setUserDetails(response);
    //     })
    // }, []);

    // useEffect(function(){
    //     if(!userDetails || !userDetails.hasOwnProperty(roles)){
    //         return;
    //     }

    // }, [userDetails]);

    const getTicketsList = function () {
        return (
            <ul className="ps-0">
                {ticketsCreatedByUser.map((ticket) => {
                    // return <li key={ticket.number}>{ticket.number} : {ticket.shortDescription}</li>
                    return <li className="card w-100 mt-2" key={ticket.number}>
                        <TicketTile ticket={ticket} />
                        {/* <Link className="card-body text-decoration-none" to={"/ticket-details/" + ticket.number} state={{ ticket }}>
                            <span className="card-title text-decoration-none">{ticket.number}</span> &nbsp;
                            <span className="card-text">{ticket.shortDescription}</span>
                        </Link> */}
                    </li>
                })}
            </ul>
        )
    }

    const getMyTicketsPageView = function () {
        if(!hasPageAccess) {
            return <NoAccess/>
        }
        return (
            <>
                <h3>My tickets list</h3>
                {ticketsCreatedByUser && ticketsCreatedByUser.length > 0 && getTicketsList()}
            </>
        )
    }

    return (
        <>{isLoading ? <Loading/> : getMyTicketsPageView()}</>
    )
}