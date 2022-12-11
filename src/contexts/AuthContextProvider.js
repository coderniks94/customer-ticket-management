import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import { auth } from "../firebase/config";
import { getUserDetailsFromDbById, updateUserDetails } from "../firebase/dbUserDetailService";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthContextProvider(props) {
    const [loggedInUser, setLoggedInUser] = useState();
    const [loading, setLoading] = useState(true);
    const [userDetailsFromDb, setUserDetailsFromDb] = useState();

    useEffect(function(){
        console.debug("loggedInUser modified");
        loggedInUser && getUserDetailsFromDbById(loggedInUser.uid).then(function(response){
            setUserDetailsFromDb(response || {});
        })
    },[loggedInUser])

    // function setAllUserData(user) {
    //     setLoggedInUser(user);
    //     user && getUserDetailsFromDbById(user.uid).then(function(response){
    //         setUserDetailsFromDb(response || {});
    //         // setLoggedInUser(user);
    //     })
    // }

    function signUpUser({ email, password }) {
        return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            setLoggedInUser(userCredential.user);
            // setAllUserData(userCredential.user);

            console.debug("Signup success.");
            return { status: "success", message: "Signup success.", user: userCredential.user };
            // setLoading(false);
        }).catch((error) => {
            console.debug("Signup failed: ", error);
            return { status: "failed", message: "Signup failed: " + error }
            // setLoading(false);
        })
    }

    function loginUser(email, password) {
        // setLoading(true);
        return signInWithEmailAndPassword(auth, email, password).then(function (userCredential) {
            setLoggedInUser(userCredential.user);
            // setAllUserData(userCredential.user);
            console.debug("Login success.");
            // setLoading(false);
            return { status: "success", message: "Login success" };
        }).catch(function (error) {
            console.debug("Login failed.", error);
            // setLoading(false);
            return { status: "failed", message: "Login failed. " + error };
        });
    }

    function logoutUser() {
        // setLoading(true);
        return signOut(auth).then(() => {
            setLoggedInUser(null);
            setUserDetailsFromDb(null);
            return { status: "success", message: "Sign-out successful." };
        }).catch((error) => {
            return { status: "failed", message: "Sign-out failed." };
        });

    }

    function updateUserProfile(userDetails) {
        // { displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg" }
        return updateProfile(auth.currentUser, userDetails)
            .then(() => {
                console.debug("Profile update successful");
                return {status: "success", message: "Profile updated successfully."}
            }).catch((error) => {
                console.debug("Profile update failed", error);
                return {status: "failed", message: "Profile update failed.", error}
            });
    }

    function updateUserEmail(newEmail) {
        return updateEmail(auth.currentUser, newEmail).then(() => {
            // Email updated!
            // ...
            return {status: "success", message: "Email updated successfully."}
          }).catch((error) => {
            // An error occurred
            // ...
            return {status: "failed", message: "Email update failed.", error}
          });
    }

    function updateUserPassword(newPassword) {
        updatePassword(auth.currentUser, newPassword).then(() => {
            // Update successful.
            return {status: "success", message: "Password updated successfully."}
          }).catch((error) => {
            // An error ocurred
            // ...
            return {status: "failed", message: "Password update failed.", error}
          });
    }

    useEffect(function () {
        const unsub = onAuthStateChanged(auth, function (user) {
            setLoggedInUser(user);
            // setAllUserData(user);
            setLoading(false);
        })

        return unsub;
    }, []);

    const value = {
        loggedInUser, 
        userDetailsFromDb,
        signUpUser, 
        loginUser, 
        logoutUser, 
        updateUserProfile, 
        updateUserEmail,
        updateUserPassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading ? props.children : <Loading/>}
            {/* {props.children} */}
        </AuthContext.Provider>
    )
}