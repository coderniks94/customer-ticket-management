import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import NoAccess from "../components/NoAccess";
import { useAuth } from "../contexts/AuthContextProvider";
import { userHasAccessToPage } from "../utils/accessControlUtil";

export default function SupportHomePage() {
    
    const {loggedInUser} = useAuth();
    const [hasPageAccess, setHasPageAccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        var args = {
            entity: "support-home",
            entityType: "page",
            loggedInUser
        };
        userHasAccessToPage(args).then((response)=>{
            setHasPageAccess(response);
            setIsLoading(false);
        })
    }, []);

    const getHomePageView = function () {
        return (
            <div>

                <h1>Support Home Page</h1>
                <Link to={"/customer-tickets"}>View customer tickets</Link>
            </div>
        )
    }

    const getPageView = function() {
        return (
            <>
                {hasPageAccess ? getHomePageView() : <NoAccess/>}
            </>
        )
    }

    return (
        <>{isLoading ? <Loading/> : getPageView()}</>
    )
}