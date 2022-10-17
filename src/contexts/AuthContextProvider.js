import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { updateUserDetails } from "../firebase/dbUserDetailService";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthContextProvider(props) {
    const [loggedInUser, setLoggedInUser] = useState();
    const [loading, setLoading] = useState(true);

    function signUpUser({ email, password }) {
        return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            setLoggedInUser(userCredential.user);
            // updateUserDetails(userCredential.user).then(function(response){
            //     console.log("Updated user details: ", response);
            // });
            console.log("Signup success.");
            return { status: "success", message: "Signup success.", user: userCredential.user };
            // setLoading(false);
        }).catch((error) => {
            console.log("Signup failed: ", error);
            return { status: "failed", message: "Signup failed: " + error }
            // setLoading(false);
        })
    }

    function loginUser(email, password) {
        // setLoading(true);
        return signInWithEmailAndPassword(auth, email, password).then(function (userCredential) {
            setLoggedInUser(userCredential.user);
            console.log("Login success.");
            // setLoading(false);
            return { status: "success", message: "Login success" };
        }).catch(function (error) {
            console.log("Login failed.", error);
            // setLoading(false);
            return { status: "failed", message: "Login failed. " + error };
        });
    }

    function logoutUser() {
        // setLoading(true);
        return signOut(auth).then(() => {
            // Sign-out successful.
            // console.log("Sign-out successful.");
            setLoggedInUser(null);
            return { status: "success", message: "Sign-out successful." };
            // setLoading(false);
        }).catch((error) => {
            // An error happened.
            // console.log("Sign-out failed.", error);
            return { status: "failed", message: "Sign-out failed." };
            // setLoading(false);
        });

    }

    function updateUserProfile(userDetails) {
        // { displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg" }
        return updateProfile(auth.currentUser, userDetails)
            .then(() => {
                // Profile updated!
                // ...
                // console.log("Profile update successful");
                return {status: "success", message: "Profile updated successfully."}
            }).catch((error) => {
                // An error occurred
                // ...
                // console.log("Profile update failed", error);
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
            return {status: "failes", message: "Email update failed.", error}
          });
    }

    function updateUserPassword(newPassword) {
        updatePassword(auth.currentUser, newPassword).then(() => {
            // Update successful.
            return {status: "success", message: "Password updated successfully."}
          }).catch((error) => {
            // An error ocurred
            // ...
            return {status: "failes", message: "Password update failed.", error}
          });
    }

    useEffect(function () {
        const unsub = onAuthStateChanged(auth, function (user) {
            setLoggedInUser(user);
            setLoading(false);
        })

        return unsub;
    }, []);

    const value = {
        loggedInUser, 
        signUpUser, 
        loginUser, 
        logoutUser, 
        updateUserProfile, 
        updateUserEmail,
        updateUserPassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading ? props.children : <h2>Loading...</h2>}
            {/* {props.children} */}
        </AuthContext.Provider>
    )
}