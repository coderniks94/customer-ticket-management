import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContextProvider";

export default function PrivateRoute() {
    const {loggedInUser} = useAuth();

    console.log("window.location.href: "+window.location.href);
    console.log("window.location.pathname: "+window.location.pathname);
    // const loginRedirectPath = (window.location.pathname && window.location.pathname !== "/logout") ? window.location.pathname : ""

    var loginNavigationPath = "/login";

    if(window.location.pathname && window.location.pathname !== "/logout" && window.location.pathname !== "/") {
        loginNavigationPath += "?redirect-path=" + window.location.pathname;
    }

    return (
        loggedInUser ? <Outlet/> : <Navigate to={loginNavigationPath}/>
    )
}