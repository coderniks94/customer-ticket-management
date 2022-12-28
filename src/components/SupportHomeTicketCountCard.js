import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContextProvider";
import { getAllOpenTickets, getTicketsCreatedByUser, getUserTicketsCountByState } from "../firebase/ticketService";

export default function SupportHomeTicketCountCard(props) {
    const {loggedInUser} = useAuth();
    const [ticketCount, setTicketCount] = useState(0);
    const [cardText, setCardText] = useState("Open Customer Tickets");
    const [ticketsRedirectLink, setTicketsRedirectLink] = useState("/customer-tickets");
    const [viewTicketsButtonText, setViewTicketsButtonText] = useState("View Open Customer Tickets");

    useEffect(function() {
        async function fetchData() {
            const allOpenTickets = await getAllOpenTickets(loggedInUser.uid);
            setTicketCount(allOpenTickets.length);
            
            // ...
        }
        fetchData();

        
    }, [])

    return (
        <div className="card flex-fill">
            <div className="card-body">
                <h3 className="card-title">{ticketCount}</h3>
                <p className="card-text">{cardText}</p>
                <Link to={ticketsRedirectLink} className="btn btn-outline-primary stretched-link">{viewTicketsButtonText}</Link>
                {/* <a href="#" className="btn btn-primary">View Open Tickets</a> */}
            </div>
        </div>
    )
}