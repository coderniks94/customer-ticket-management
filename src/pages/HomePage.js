import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useAuth } from "../contexts/AuthContextProvider"

export default function HomePage() {
    const { loggedInUser, userDetailsFromDb } = useAuth();

    const getRedirectPath = function() {
        var navigatePath = "";
        if(!userDetailsFromDb.roles || userDetailsFromDb.roles.length == 0) {
            return <div>You don't have permission to access</div>
        }

        console.debug("userDetailsFromDb.roles:", userDetailsFromDb.roles);

        if(userDetailsFromDb.roles.find(role => role.name === "support")) {
            console.debug("support role");
            return <Navigate to="/support-home"/>
        }

        if(userDetailsFromDb.roles.find(role => role.name === "customer")) {
            console.debug("customer role");
            return <Navigate to="/customer-home"/>
        }

        if(userDetailsFromDb.roles.find(role => role.name === "admin")) {
            console.debug("customer role");
            return <Navigate to="/admin-home"/>
        }
        
        return  <div>You don't have permission to access</div>
    }

    return (
        <main>
            {userDetailsFromDb ? getRedirectPath() : <Loading/>}
        </main>
    )
}