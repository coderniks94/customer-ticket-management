import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContextProvider";

export default function AdminHomePage() {

    const getHomePageView = function () {
        return (
            <div>

                <h1>Admin Home Page</h1>
                <Link to={"/customer-tickets"}>View customer tickets</Link>
                <br/>
                <Link to={"/access-control"}>Manage Access Control</Link>
            </div>
        )
    }

    return (
        // <>{isLoading ? <Loading/> : getPageView()}</>
        <>{getHomePageView()}</>
    )
}