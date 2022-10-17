import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import { useAuth } from "../contexts/AuthContextProvider";

export default function LogoutPage() {
    // const [errorMessage, setErrorMessage] = useState("");
    const [alert, setAlert] = useState("");
    const { loggedInUser } = useAuth();
    const { logoutUser } = useAuth();

    const redirectPage = "/login";

    useEffect(() => {
        if (loggedInUser) {
            logoutUser().then((response) => {
                if (response.status === "failed") {
                    // setErrorMessage(response.message);
                    setAlert({message: response.message, type: "error"});
                }
            });
        }
        // logoutUser();
    }, [loggedInUser, logoutUser]);
    // logoutUser();

    // const getErrorAlert = function () {
    //     return (
    //         <div className="alert alert-danger d-flex align-items-center" role="alert">
    //             {/* <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill" /></svg> */}
    //             <i className="bi bi-exclamation-triangle"></i>
    //             <div>
    //                 {errorMessage}
    //             </div>
    //         </div>
    //     )
    // }


    return (
        <>
            {loggedInUser ? <h3>Logging out...</h3> : <Navigate to={redirectPage}></Navigate>}
            {/* {errorMessage ? getErrorAlert() : ""} */}
            {alert && alert.message ? <AlertMessage alert={alert}/> : ""}
        </>
    )
}