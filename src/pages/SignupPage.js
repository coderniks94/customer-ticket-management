import { useEffect, useState } from "react"
import { Link, Navigate } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import { useAuth } from "../contexts/AuthContextProvider";
import { getCompaniesList } from "../firebase/companyService";
import {getAllRoles} from "../firebase/roleService";
import { updateUserDetailsInDb } from "../firebase/dbUserDetailService";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [alert, setAlert] = useState({});
    const [company, setCompany] = useState({});
    const [companiesList, setCompaniesList] = useState([]);
    // const [allRoles, setAllRoles] = useState([]);
    const [userRoles, setUserRoles] = useState([]);

    // const {  } = useAuth();
    const { signUpUser, loggedInUser, updateUserProfile } = useAuth();

    useEffect(function () {
        // getCompaniesList();
        getCompaniesList().then(function (response) {
            console.debug("response: ", response);
            setCompaniesList(response);
        });

        getAllRoles().then(function(response){
            // setAllRoles(response);
            setUserRoles(response.filter((role)=>{
                return role.name === "customer";
            }))
        });

    }, []);

    // const redirectPath = queryParams.get("redirect-path") || "/";
    const redirectPath = "/";

    const redirectToPage = function () {
        // return <Redirect to={redirectPath} />
        return <Navigate to={redirectPath}></Navigate>

    }

    const handleCreateAccount = function (event) {
        event.preventDefault();
        var args = {
            email, password, name
        }
        if (validateForm()) {
            signUpUser(args).then(function (response) {
                if (response.status === "failed") {
                    // setErrorMessage(response.message);
                    setAlert({ message: response.message, type: "error" });
                } else if (response.status === "success") {
                    var userDetails = {
                        company: company,
                        roles: userRoles
                    }
                    updateUserDetailsInDb(userDetails, response.user.uid);

                    var userProfileDetails = {
                        displayName: name,
                        photoURL: photoUrl
                    }
                    updateUserProfile(userProfileDetails).then((response)=>{
                        setAlert({ message: response.message, type: response.status });
                    })
                    
                }
            });
        }
        console.debug("alert: ", alert);

    }

    const validateForm = function () {
        if (!name) {
            // setErrorMessage("Name cannot be empty");
            setAlert({ message: "Name cannot be empty", type: "error" });
            return false;
        }

        if (!email) {
            // setErrorMessage("Email id cannot be empty");
            setAlert({ message: "Email id cannot be empty", type: "error" });
            return false;
        }

        if (!password) {
            // setErrorMessage("Password cannot be empty");
            setAlert({ message: "Password cannot be empty", type: "error" });
            return false;
        }

        if (!confirmPassword) {
            // setErrorMessage("Confirm Password cannot be empty");
            setAlert({ message: "Confirm Password cannot be empty", type: "error" });
            return false;
        }
        if (confirmPassword && password !== confirmPassword) {
            // setErrorMessage("Passwords do not match");
            setAlert({ message: "Passwords do not match", type: "error" });
            return false;
        }

        // setErrorMessage("");
        setAlert({});
        return true;
    }

    const handleCompanyChange = function(event){
        var selectedCompany = companiesList.filter((c)=>{return c.name === event.target.value})[0];
        setCompany(selectedCompany);
    }

    const getSignupForm = function () {
        return (
            <div id="signup-container" className="d-flex align-items-center justify-content-center w-100">
                <form className="d-flex flex-column align-items-center border border-1 p-3 rounded-3 w-50">
                    <div className="w-100">
                        <h4>Create new account</h4>
                        <p className="text-secondary">Please enter your details to create account</p>
                        <div className="form-group mt-3">
                            <label htmlFor="inputName">Name</label>
                            <input type="text" className="form-control" id="inputName" aria-describedby="nameHelp"
                                placeholder="eg. John Doe" value={name} onChange={(event) => setName(event.target.value)} />
                            {/* <small id="nameHelp" className="form-text text-muted">eg. John Doe</small> */}
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="inputEmail">Email address</label>
                            <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp"
                                placeholder="eg. john.doe@example.com" value={email} onChange={(event) => setEmail(event.target.value)} />
                            {/* <small id="emailHelp" className="form-text text-muted">eg. john.doe@example.com</small> */}
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="inputPassword">Password</label>
                            <input type="password" className="form-control" id="inputPassword" placeholder="Password"
                                value={password} onChange={(event) => setPassword(event.target.value)} />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="inputConfirmPassword">Confirm Password</label>
                            <input type="password" className="form-control" id="inputConfirmPassword" placeholder="Confirm Password"
                                value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="inputPhotoUrl">Profile pic URL</label>
                            <input type="text" className="form-control" id="inputPhotoUrl" aria-describedby="photoUrlHelp"
                                placeholder="eg. https://example.com/jane-q-user/profile.jpg" value={photoUrl} onChange={(event) => setPhotoUrl(event.target.value)} />
                            {/* <small id="photoUrlHelp" className="form-text text-muted">eg. https://example.com/jane-q-user/profile.jpg</small> */}
                        </div>
                        {/* <div className="dropdown">
                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Company
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                            <li className="dropdown-item" value={"google"}>Google</li>
                            <li className="dropdown-item" value={"google"}>Facebook</li>
                            <li className="dropdown-item" value={"amazon"}>Amazon</li>
                        </ul>
                    </div> */}

                        <label htmlFor="companySelect mt-2">Company</label>
                        <select className="form-select" aria-label="Company" onChange={(event) => handleCompanyChange(event)} defaultValue={""} id={"companySelect"}>
                            <option value={""}>---Select Company---</option>
                            {/* {companiesList.map((company)=>{return <option value={company.name}>company.name</option>}} */}
                            {companiesList.map((company) => <option value={company.name} key={company.name}>{company.name}</option>)}
                            {/* <option value="google">Google</option>
                        <option value="amazon">Amazon</option>
                        <option value="facebook">Facebook</option> */}
                        </select>
                        {/* {errorMessage ? <AlertMessage errorMessage={errorMessage} type={"error"} /> : ""} */}
                        {alert && alert.message ? <AlertMessage alert={alert} className="mt-2"/> : ""}
                        <button type="submit" className="btn btn-primary mt-2 w-100" onClick={handleCreateAccount}>Create Account</button>
                        
                        <div className="mt-2 d-flex justify-content-center">Already have an account? &nbsp;<Link to={"/login"}>Login here</Link></div>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <main className="mt-5 bg-light d-flex align-items-center" style={{ minHeight: "95vh" }}>

            {loggedInUser ? redirectToPage() : getSignupForm()}

        </main>
    )
}