import { Link } from "react-router-dom";
import SupportHomeTicketCountCard from "../components/SupportHomeTicketCountCard";
import { useAuth } from "../contexts/AuthContextProvider";

export default function SupportHomePage() {
    
    const {loggedInUser} = useAuth();

    const getHomePageView = function () {
        return (
            <div>

                <h3>{'Hello, ' + loggedInUser.displayName}</h3>
                {/* <Link to={"/customer-tickets"}>View customer tickets</Link> */}
                <SupportHomeTicketCountCard />
            </div>
        )
    }

    return (
        // <>{isLoading ? <Loading/> : getPageView()}</>
        <>{getHomePageView()}</>
    )
}