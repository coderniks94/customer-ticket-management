import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContextProvider";
import { getUserDetailsFromDbById, updateUserDetailsInDb } from "../firebase/dbUserDetailService";
import { getCompaniesList } from "../firebase/companyService";
import { getAllRoles } from "../firebase/roleService";
import AlertMessage from "../components/AlertMessage";

export default function ProfilePage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    // const [alert, setAlert] =useState({});
    const [company, setCompany] = useState({});
    const [companiesList, setCompaniesList] = useState([]);
    const [allRoles, setAllRoles] = useState([]);
    const [userRoles, setUserRoles] = useState([]);
    const [alert, setAlert] = useState();

    // const [userDetails, setUserDetails] = useState({});

    const {loggedInUser, updateUserProfile, updateUserEmail, updateUserPassword, userDetailsFromDb} = useAuth();

    useEffect(function(){
        // getCompaniesList();
        
        getCompaniesList().then(function(response){
            console.debug("all companies: ", response);
            setCompaniesList(response);
        });

        getAllRoles().then(function(response){
            console.debug("all roles: ", response);
            setAllRoles(response);
        })
        
    }, []);

    useEffect(function(){
        if(!loggedInUser) {
            return;
        }
        // console.debug("loggedInUser: ", loggedInUser);
        setName(loggedInUser.displayName || "");
        setPhotoUrl(loggedInUser.photoURL || "");
        setEmail(loggedInUser.email || "");
        setCompany(userDetailsFromDb.company || "");
        setUserRoles(userDetailsFromDb.roles || []);
    }, [loggedInUser]);

    const handleUpdateProfile = function(event) {
        event.preventDefault();
        // update auth related details
        updateUserAuthData();
        updateUserAuthEmail();
        if(password && confirmPassword && password === confirmPassword){
            updateUserAuthPassword();
        }

        //update db data
        updateDbUserData();

        setAlert({ message: "Profile updated successfully", type: "success" });
    }

    const updateUserAuthData = function() {
        var userAuthDetailsToUpdate = {
            displayName: name,
            photoURL: photoUrl
        }
        
        updateUserProfile(userAuthDetailsToUpdate).then((response)=>{
            console.debug(response.message);
        })
    }

    const updateUserAuthEmail = function() {
        updateUserEmail(email).then((response)=>{
            console.debug(response.message);
        })
    }

    const updateUserAuthPassword = function() {
        updateUserPassword(password).then((response)=>{
            console.debug(response.message);
        })
    }

    const updateDbUserData = function() {
        var dbUserDetailsToUpdate = {...userDetailsFromDb};
        
        dbUserDetailsToUpdate.company = company;


        updateUserDetailsInDb(dbUserDetailsToUpdate, loggedInUser.uid);
    }

    const handleChangeCompany = function(event) {
        var selectedCompany = companiesList.filter((company)=>{return company.name === event.target.value})
        setCompany(selectedCompany[0]);
    }

    const getProfileForm = function(){
        return (
            <form className="d-flex flex-column mt-3">
                <h3>Update your profile</h3>
                {alert && alert.message ? <AlertMessage alert={alert} className="mt-2"/> : ""}
                <div className="form-group mt-3">
                    <label htmlFor="inputName">Name</label>
                    <input type="text" className="form-control" id="inputName" aria-describedby="nameHelp"
                        placeholder="eg. John Doe" value={name} onChange={(event) => setName(event.target.value)} />
                    {/* <small id="nameHelp" className="form-text text-muted">eg. John Doe</small> */}
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="inputEmail">Email address</label>
                    <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp"
                        placeholder="eg. john.doe@example.com" value={email} onChange={(event) => setEmail(event.target.value)} />
                    {/* <small id="emailHelp" className="form-text text-muted">eg. john.doe@example.com</small> */}
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" className="form-control" id="inputPassword" placeholder="Password"
                        value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="inputConfirmPassword">Confirm Password</label>
                    <input type="password" className="form-control" id="inputConfirmPassword" placeholder="Confirm Password"
                        value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="inputPhotoUrl">Profile pic URL</label>
                    <input type="text" className="form-control" id="inputPhotoUrl" aria-describedby="photoUrlHelp"
                        placeholder="https://example.com/jane-q-user/profile.jpg" value={photoUrl} onChange={(event) => setPhotoUrl(event.target.value)} />
                    {/* <small id="photoUrlHelp" className="form-text text-muted">eg. https://example.com/jane-q-user/profile.jpg</small> */}
                </div>

                <label htmlFor="companySelect" className="mt-3">Company</label>
                <select className="form-select" aria-label="Company" onChange={handleChangeCompany} value={company.name} id={"companySelect"}>
                    <option value={""}>---Select Company---</option>
                    {/* {companiesList.map((company)=>{return <option value={company.name}>company.name</option>}} */}
                    {companiesList.map((company) => <option value={company.name} key={company.id}>{company.name}</option>)}
                </select>

                {userRoles && userRoles.length > 0 && 
                <div>
                    <label htmlFor="companySelect">Roles</label>&nbsp;
                    {userRoles.map((role)=>{return <span className="badge rounded-pill bg-secondary mt-3" key={role.id}>{role.name}</span>})}
                </div>}
                
                <div className="d-flex flex-row justify-content-end">
                    <button type="submit" className="btn btn-primary mt-3 w-20" onClick={(event)=>handleUpdateProfile(event)}>Update Profile</button>
                </div>
                
            </form>
        )
    }

    return (
        <main className="mt-5 pt-2">
            {getProfileForm()}
        </main>
    )
}