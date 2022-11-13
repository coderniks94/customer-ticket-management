import { Link } from "react-router-dom";
import CustomerHomeTicketCountCard from "../components/CustomerHomeTicketCountCard";
import { useAuth } from "../contexts/AuthContextProvider";

export default function CustomerHomePage() {
    const {loggedInUser} = useAuth();
    const getHomePageView = function () {
        return (
            <div>
                <h3>{'Hello, ' + loggedInUser.displayName}</h3>
                {/* <button type="button" class="btn btn-link">View tickets created by you</button> */}

                <br />
                {/* <Link to={"/my-tickets"}>View my tickets</Link> */}
                <br />
                <div className="d-flex w-100">
                    <CustomerHomeTicketCountCard ticketState="open" />
                    <div className="ms-1 me-1"></div>
                    <CustomerHomeTicketCountCard ticketState="closed" />
                    <div className="ms-1 me-1"></div>
                    <CustomerHomeTicketCountCard />
                </div>
                <br/><br/>
                <Link to={"/create-ticket"} className="btn btn-primary">Create a new ticket</Link>
            </div>
        )
    }

    return (
        <>
            {getHomePageView()}
        </>
    )
}