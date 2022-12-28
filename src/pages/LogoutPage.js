import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import { useAuth } from "../contexts/AuthContextProvider";

export default function LogoutPage() {
  const [alert, setAlert] = useState("");
  const { loggedInUser } = useAuth();
  const { logoutUser } = useAuth();

  const redirectPage = "/login";

  useEffect(() => {
    if (loggedInUser) {
      logoutUser().then((response) => {
        if (response.status === "failed") {
          setAlert({ message: response.message, type: "error" });
        }
      });
    }

  }, [loggedInUser, logoutUser]);

  return (
    <>
      {loggedInUser ? (
        <h3>Logging out...</h3>
      ) : (
        <Navigate to={redirectPage}></Navigate>
      )}

      {alert && alert.message ? <AlertMessage alert={alert} /> : ""}
    </>
  );
}
