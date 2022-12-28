import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContextProvider";

export default function Navbar() {
  const { loggedInUser } = useAuth();

  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark fixed-top d-flex justify-content-between">
      <div className="container">
        <Link className="navbar-brand ms-2" to="/">
          Customer Ticket Manager
        </Link>

        {loggedInUser && (
          <div className="dropdown me-2">
            <i
              className="bi bi-person-circle"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              type="button"
              style={{ color: "white", fontSize: "2rem" }}
            ></i>
            <ul
              className="dropdown-menu dropdown-menu-dark dropdown-menu-end"
              aria-labelledby="dropdownMenuButton1"
            >
              <li className="dropdown-item bg-primary">
                {loggedInUser.displayName}
              </li>
              <li>
                <Link className="dropdown-item" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/logout">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
