import { useEffect, useState } from "react"
import TicketTile from "../components/TicketTile";
import { useAuth } from "../contexts/AuthContextProvider";
import { getAccessControlDetails } from "../firebase/accessControlService";
import { getUserDetailsFromDbById } from "../firebase/dbUserDetailService";
import { getAllOpenTickets } from "../firebase/ticketService";
import {userHasAccessToPage} from "../utils/accessControlUtil";
import Loading from "../components/Loading";
import NoAccess from "../components/NoAccess";


/**
 * This page is for support role (maybe admin in future)
 */
export default function CustomerTicketsPage(){
    const [allOpenTickets, setAllOpenTickets] = useState([]);
    const [hasPageAccess, setHasPageAccess] = useState(false);
    const [userDetails, setUserDetails] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const {loggedInUser} = useAuth();

    useEffect(()=>{
        var args = {
            entity: "customer-tickets",
            entityType: "page",
            loggedInUser
        }
        userHasAccessToPage(args).then((response)=>{
            setHasPageAccess(response);
            if(!response) {
                setIsLoading(false);
            }
        })
    }, []);

    useEffect(()=>{
        if(hasPageAccess) {
            getAllOpenTickets().then((response)=>{
                setAllOpenTickets(response);
                setIsLoading(false);
            })
        }
        
    }, [hasPageAccess])

    const getTicketsListView = function() {
        if(!hasPageAccess) {
            return <NoAccess/>;
        }
        return (
            <div>
                <h1>All Customer open tickets list</h1>
                <ul className="ps-0">
                    {allOpenTickets.map((ticket) => {
                        return <li className="card w-100 mt-2" key={ticket.number}>
                            <TicketTile ticket={ticket} />
                        </li>
                    })}
                </ul>
            </div>
        )

    }

    return (
        <>
            {isLoading ? <Loading/> : getTicketsListView()}
        </>
    )
}