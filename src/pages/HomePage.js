import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useAuth } from "../contexts/AuthContextProvider"
import { getUserDetailsFromDbById } from "../firebase/dbUserDetailService";

export default function HomePage() {
    const [userDetails, setUserDetails] = useState();
    const { loggedInUser } = useAuth();


    useEffect(() => {
        getUserDetailsFromDbById(loggedInUser.uid).then((response) => {
            setUserDetails(response || {});
        });
    }, []);
    // console.log("loggedInUser: ", loggedInUser)

    const getRedirectPath = function() {
        var navigatePath = "";
        if(!userDetails.roles || userDetails.roles.length == 0) {
            return <div>You don't have permission to access</div>
        }

        console.debug("userDetails.roles:", userDetails.roles);

        if(userDetails.roles.find(role => role.name === "support")) {
            console.debug("support role");
            return <Navigate to="/support-home"/>
        }

        if(userDetails.roles.find(role => role.name === "customer")) {
            console.debug("customer role");
            return <Navigate to="/customer-home"/>
        }
        
        return  <div>You don't have permission to access</div>
    }

    return (
        <main>
            {userDetails ? getRedirectPath() : <Loading/>}
        </main>
    )
}