
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContextProvider";

export default function Navbar() {
    const { loggedInUser } = useAuth();

    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark fixed-top d-flex justify-content-between">
            
            {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button> */}
            <Link className="navbar-brand ms-2" to="/">Support Assistant</Link>
            {/* {loggedInUser && <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav d-flex align-items-lg-center w-100">
                    <li className="nav-item active ms-3">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item active ms-3">
                        <Link className="nav-link" to="/support-home">Support Home</Link>
                    </li>
                    <li className="nav-item active ms-3">
                        <Link className="nav-link" to="/customer-home">Customer Home</Link>
                    </li>
                    <li className="nav-item active ms-lg-auto ms-3">
                        <div className="dropdown me-2">
                            <i className="bi bi-person-circle" id="dropdownMenuButton1" data-bs-toggle="dropdown" type="button" style={{ color: "white", fontSize: "2rem" }}></i>
                            <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                                <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                <li><Link className="dropdown-item" to="/logout">Logout</Link></li>
                            </ul>
                        </div>
                    </li>
                    
                </ul>
            </div>} */}


            {loggedInUser && <div className="dropdown me-2">
                <i className="bi bi-person-circle" id="dropdownMenuButton1" data-bs-toggle="dropdown" type="button" style={{ color: "white", fontSize: "2rem" }}></i>
                <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                    <li className="dropdown-item bg-primary">{loggedInUser.displayName}</li>
                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                    <li><Link className="dropdown-item" to="/logout">Logout</Link></li>
                </ul>
            </div>}
        </nav>

    )
}