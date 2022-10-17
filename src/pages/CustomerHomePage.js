import { Link } from "react-router-dom";

export default function CustomerHomePage() {
    return (
        <div>
            <h1>Customer Home Page</h1>
            {/* <button type="button" class="btn btn-link">View tickets created by you</button> */}
            <Link to={"/create-ticket"}>Create a new ticket</Link>
            <br/>
            <Link to={"/my-tickets"}>View my tickets</Link>
        </div>
    )
}