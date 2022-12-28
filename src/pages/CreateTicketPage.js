import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import { useAuth } from "../contexts/AuthContextProvider";
import { createTicket } from "../firebase/ticketService";

export default function CreateTicketPage() {
    const {loggedInUser} = useAuth();

    const [shortDescription, setShortDescription] = useState("");
    const [longDescription, setLongDescription] = useState("");
    const [alert, setAlert] = useState({});
    const [userData, setUserData] = useState({});

    useEffect(function(){
        if(!loggedInUser){
            return;
        }

        setUserData({
            displayName: loggedInUser.displayName,
            uid: loggedInUser.uid
        });

    }, [loggedInUser]);

    const clearAllFields = function() {
        setShortDescription("");
        setLongDescription("");
    }


    const handleCreateTicket = function(event){
        event.preventDefault();

        if(!validateFields()){
            return;
        }

        var args = {
            shortDescription, longDescription, createdBy: userData
        }
        createTicket(args).then(function(response){
            console.debug(response.message + response.ticket.number);
            setAlert({message: response.message + " : ", type: "success", link: "/ticket-details/" + response.ticket.number, linkText: response.ticket.number});
            clearAllFields();
        });
    }

    const validateFields = function() {
        if(!shortDescription){
            setAlert({ message: "Short Description cannot be empty", type: "error" });
            return false;
        }

        if(!longDescription){
            setAlert({ message: "Long Description cannot be empty", type: "error" });
            return false;
        }

        return true;
    }

    return (
        <div>
        
            <Link to={"/"}>Go back to home page</Link>
            <form>
                <h3>Create new ticket</h3>
                
                <div className="form-group mt-3">
                    <label htmlFor="shortDescription">Short description</label>
                    <input type="text" className="form-control" id="shortDescription" aria-describedby="shortDescHelp" value={shortDescription}
                        placeholder="Describe your issue briefly" onChange={(event)=>setShortDescription(event.target.value)}/>
                    {/* <small id="shortDescriptionHelp" className="form-text text-muted"></small> */}
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="longDescription">Long description</label>
                    <textarea className="form-control" id="longDescription" rows="3" value={longDescription}
                        placeholder="Describe your issue in detail" onChange={(event)=>setLongDescription(event.target.value)}></textarea>
                </div>
                
                {alert && alert.message ? <AlertMessage alert={alert} className="mt-3 pt-3"/> : ""}
                
                <button type="submit" className="btn btn-primary mt-3" onClick={(event)=>handleCreateTicket(event)}>Create ticket</button>
            </form>
        </div>
    )
}
