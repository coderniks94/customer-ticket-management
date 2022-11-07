import { useEffect, useState } from "react"
import TicketTile from "../components/TicketTile";
import { useAuth } from "../contexts/AuthContextProvider";
import { getAllOpenTickets } from "../firebase/ticketService";
import Loading from "../components/Loading";
import NoAccess from "../components/NoAccess";


/**
 * This page is for support role (maybe admin in future)
 */
export default function CustomerTicketsPage() {
    const [allOpenTickets, setAllOpenTickets] = useState([]);
    // const [hasPageAccess, setHasPageAccess] = useState(false);
    const [userDetails, setUserDetails] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { loggedInUser } = useAuth();

    useEffect(() => {

        getAllOpenTickets().then((response) => {
            setAllOpenTickets(response);
            setIsLoading(false);
        })

    }, [])

    const getTicketsListView = function () {
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
            {isLoading ? <Loading /> : getTicketsListView()}
        </>
    )
}