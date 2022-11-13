import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContextProvider";
import { getTicketsCreatedByUser, getUserTicketsCountByState } from "../firebase/ticketService";

export default function CustomerHomeTicketCountCard(props) {
    const {ticketState} = props;
    const {loggedInUser} = useAuth();
    const [ticketCount, setTicketCount] = useState(0);
    const [cardText, setCardText] = useState("Tickets");
    const [ticketsRedirectLink, setTicketsRedirectLink] = useState("/my-tickets");
    const [viewTicketsButtonText, setViewTicketsButtonText] = useState("View Tickets");

    useEffect(function(){
        if(ticketState == "open") {
            setCardText("Open Tickets");
            setTicketsRedirectLink("/my-tickets?state=open");
            setViewTicketsButtonText("View Open Tickets");
        } else if(ticketState == "closed") {
            setCardText("Closed Tickets");
            setTicketsRedirectLink("/my-tickets?state=closed");
            setViewTicketsButtonText("View Closed Tickets");
        } else {
            setCardText("All Tickets");
            setTicketsRedirectLink("/my-tickets");
            setViewTicketsButtonText("View All Tickets");
        }

        async function fetchData() {
            // You can await here
            // const response = await MyAPI.getData(someId);
            // const count = await getUserTicketsCountByState({userId: loggedInUser.uid, ticketState});
            const ticketFilterState = ticketState == "open" ? "Open" : (ticketState == "closed" ? "Closed" : "");
            const ticketsByUser = await getTicketsCreatedByUser(loggedInUser.uid);
            if(!ticketFilterState) {
                setTicketCount(ticketsByUser.length);
            } else {
                const count = ticketsByUser.filter((ticket)=>{
                    return ticket.state == ticketFilterState;
                }).length;
                setTicketCount(count);
            }
            
            // ...
        }
        fetchData();

        
    }, [])

    return (
        <div className="card flex-fill">
            {/* <div className="card-header">
                8
            </div> */}
            <div className="card-body">
                <h3 className="card-title">{ticketCount}</h3>
                <p className="card-text">{cardText}</p>
                <Link to={ticketsRedirectLink} className="btn btn-outline-primary stretched-link">{viewTicketsButtonText}</Link>
                {/* <a href="#" className="btn btn-primary">View Open Tickets</a> */}
            </div>
        </div>
    )
}