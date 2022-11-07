import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import TicketTile from "../components/TicketTile";
import { useAuth } from "../contexts/AuthContextProvider"
import { getTicketsCreatedByUser } from "../firebase/ticketService";


/**
 * this page is only for customer role
 */
export default function MyTicketsPage() {
    // const [userDetails, setUserDetails] = useState({});
    const [ticketsCreatedByUser, setTicketsCreatedByUser] = useState([]);
    // const [hasPageAccess, setHasPageAccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { loggedInUser } = useAuth();

    useEffect(() => {
        getTicketsCreatedByUser(loggedInUser.uid).then((response) => {
            console.debug("response", response);
            setTicketsCreatedByUser(response);
            setIsLoading(false);
        });

    }, [])

    const getTicketsList = function () {
        return (
            <ul className="ps-0">
                {ticketsCreatedByUser.map((ticket) => {
                    // return <li key={ticket.number}>{ticket.number} : {ticket.shortDescription}</li>
                    return <li className="card w-100 mt-2" key={ticket.number}>
                        <TicketTile ticket={ticket} />
                    </li>
                })}
            </ul>
        )
    }

    const getMyTicketsPageView = function () {
        return (
            <>
                <h3>My tickets list</h3>
                {ticketsCreatedByUser && ticketsCreatedByUser.length > 0 && getTicketsList()}
            </>
        )
    }

    return (
        <>{isLoading ? <Loading /> : getMyTicketsPageView()}</>
    )
}