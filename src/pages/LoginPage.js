import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import Loading from "../components/Loading";
import { useAuth } from "../contexts/AuthContextProvider";
import hexagonSunset from "../resources/hexagon-sunset.png";
import hexagonLogo from "../resources/hexagon-logo.png";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [errorMessage, setErrorMessage] = useState("");
    const [alert, setAlert] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { loginUser } = useAuth();
    const { loggedInUser } = useAuth();

    const queryParams = new URLSearchParams(window.location.search);
    // console.debug("queryParams: ", queryParams);
    // console.debug("queryParams.get(\"redirect-path\") ", queryParams.get("redirect-path"));

    // const redirectPage = window.location || "/";
    const redirectPath = queryParams.get("redirect-path") || "/";
    // console.debug("redirectPath: ", redirectPath);

    const handleLoginClick = function (event) {
        event.preventDefault();
        
        if(validateFields()){
            setIsLoading(true);
            // var loginAction = loginUser(email, password);
            // console.debug("loginAction: ",loginAction);
            loginUser(email, password).then(function(response){
                console.debug(response);
                if(response.status === "failed"){
                    // setErrorMessage(response.message);
                    setAlert({message: response.message, type: "error"});
                } else if(response.status === "success"){
                    setAlert({message: response.message, type: "success"});
                }
                setIsLoading(false);
            })
        }
        
    }

    const validateFields = function() {
        if(!email){
            // setErrorMessage("Email cannot be empty");
            setAlert({message: "Email cannot be empty", type: "error"});
            return false;
        }
        if(!password){
            // setErrorMessage("Password cannot be empty");
            setAlert({message: "Password cannot be empty", type: "error"});
            return false;
        }

        return true;
    }

    const redirectToPage = function () {
        // return <Redirect to={redirectPath} />
        return <Navigate to={redirectPath}></Navigate>
    }

    // const getErrorAlert = function(){
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

    const getLoginForm = function () {
        return (
            <form className="d-flex flex-column align-items-center w-50 border border-1 p-3 rounded-3">
                <div className="w-100">
                    <h4>Welcome to Support Assistant!</h4>
                    <p className="text-secondary">Please enter your details to login</p>
                    <div className="form-group mt-2 mb-2">
                        <label htmlFor="inputEmail">Email address</label>
                        <input type="email" className="form-control" id="inputEmail" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)} />
                        {/* <small id="emailHelp" className="form-text text-muted">Enter email address</small> */}
                    </div>
                    <div className="form-group mt-2 mb-2">
                        <label htmlFor="inputPassword1">Password</label>
                        <input type="password" className="form-control " id="inputPassword1" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    {/* {errorMessage ? getErrorAlert() : ""} */}
                    {alert && alert.message ? <AlertMessage alert={alert} /> : ""}
                    <button type="submit" className="btn btn-primary w-100 mt-2 mb-2" onClick={(event) => handleLoginClick(event)}
                        disabled={isLoading}>Login</button>
                    
                    <div className="form-group mt-2 mb-2 d-flex justify-content-center">
                        New user? &nbsp;<Link to={"/signup"}> Sign up here</Link>
                    </div>
                    
                </div>
            </form>
        )
    }

    const getLogoImage = function(){
        return (
            <img src={hexagonLogo} class="img-fluid" alt="logo"></img>
        )
    }

    return (
        <main className="mt-5 bg-light d-flex align-items-center" style={{minHeight: "95vh"}}>
            <div id="login-container" className="w-100 pt-5 d-flex align-items-center align-content-center justify-content-center flex-column">
                {isLoading ? <Loading/> : ""}
                {loggedInUser ? redirectToPage() : getLoginForm()}
            </div>
            {/* <div id="right-container" className="bg-secondary w-100">
                {getLogoImage()}
            </div> */}
        </main>
    )
}