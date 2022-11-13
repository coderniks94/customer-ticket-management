import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContextProvider";
import { doesUserHaveAccessToEntity, userHasAccessToPage } from "../utils/accessControlUtil";
import Loading from "./Loading";
import NoAccess from "./NoAccess";

export default function PrivateRoute() {
    const [hasPageAccess, setHasPageAccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { loggedInUser, userDetailsFromDb } = useAuth();
    let location = useLocation();

    useEffect(() => {
        if(!loggedInUser) {
            setIsLoading(false);
            return;
        }
        console.debug("location modified: ", location);
        console.debug("loggedInUser: ", loggedInUser);
        console.debug("userDetailsFromDb: ", userDetailsFromDb);
        var args = {
            entity: "/" + location.pathname.split("/")[1],
            entityType: "page",
            loggedInUser,
            userDetailsFromDb
        }
        // userHasAccessToPage(args).then((response) => {
        //     setHasPageAccess(response);
        //     setIsLoading(false);
        // })

        doesUserHaveAccessToEntity(args).then((response) => {
            setHasPageAccess(response);
            setIsLoading(false);
        })
    }, [location]);

    
    // const loginRedirectPath = (window.location.pathname && window.location.pathname !== "/logout") ? window.location.pathname : ""

    var loginNavigationPath = "/login";

    if (location.pathname && location.pathname !== "/logout" && location.pathname !== "/") {
        loginNavigationPath += "?redirect-path=" + location.pathname;
    }

    function getView() {
        if (isLoading) {
            return <Loading />
        }
        if (!loggedInUser) {
            return <Navigate to={loginNavigationPath} />
        }

        if (!hasPageAccess) {
            return <NoAccess />;
        }

        return <Outlet />;
    }

    return (
        <>{getView()}</>
    )
    //loggedInUser ? <Outlet/> : <Navigate to={loginNavigationPath}/>
}