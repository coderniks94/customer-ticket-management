import { Link } from "react-router-dom";
import Card from "../components/Card";

export default function CustomerHomePage() {
    const getHomePageView = function () {
        return (
            <div>
                <h1>Customer Home Page</h1>
                {/* <button type="button" class="btn btn-link">View tickets created by you</button> */}
                <Link to={"/create-ticket"}>Create a new ticket</Link>
                <br />
                <Link to={"/my-tickets"}>View my tickets</Link>
                <br/>
                <Card/>
            </div>
        )
    }

    return (
        <>
            {getHomePageView()}
        </>
    )
}