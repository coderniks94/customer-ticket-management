import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContextProvider";

export default function SupportHomePage() {
    
    const {loggedInUser} = useAuth();

    const getHomePageView = function () {
        return (
            <div>

                <h1>Support Home Page</h1>
                <Link to={"/customer-tickets"}>View customer tickets</Link>
            </div>
        )
    }

    return (
        // <>{isLoading ? <Loading/> : getPageView()}</>
        <>{getHomePageView()}</>
    )
}