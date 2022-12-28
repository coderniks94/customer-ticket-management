import { Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom'
import AlertMessage from '../components/AlertMessage';
import { useAuth } from '../contexts/AuthContextProvider';
import { listenToSnapshot, updateTicketDetails } from '../firebase/ticketService';

export default function TicketDetailsPage(){
    const [ticketData, setTicketData] = useState();
    const [alert, setAlert] = useState({});
    const [newNotes, setNewNotes] = useState("");
    const [allTicketStates, setAllTicketStates] = useState(["Open", "Closed"]);
    const [isSupportRole, setIsSupportRole] = useState(false);

    const location = useLocation();
    const { ticketId } = useParams();
    const {userDetailsFromDb, loggedInUser} = useAuth();

    
    useEffect(function () {

        var supportRole = userDetailsFromDb.roles.filter((role)=>{
            return role.name === "support";
        });

        // if(supportRole && supportRole.length > 0){
        console.debug("isSupportRole: ", supportRole && supportRole.length > 0);
        setIsSupportRole(supportRole && supportRole.length > 0);

        const unsub = listenToSnapshot(ticketId, setTicketData);

        return unsub;
        // }
    }, []);

    const setUserHasSupportRole = function(response) {
        var supportRole = response.roles.filter((role)=>{
            return role.name === "support";
        });

        // if(supportRole && supportRole.length > 0){
        console.debug("isSupportRole: ", supportRole && supportRole.length > 0);
        setIsSupportRole(supportRole && supportRole.length > 0);
        // }
    }

    const handleNotesChange = function(event) {
        event.preventDefault();
        setNewNotes(event.target.value);
    }

    const handleCommentClick = function(event) {
        event.preventDefault();
        if(!newNotes) return;
        var ticketDataCopy = {...ticketData};
        ticketDataCopy.notes.push({
            createdBy: {
                displayName: loggedInUser.displayName,
                uid: loggedInUser.uid
            },
            createdOn: Timestamp.now(),
            text: newNotes
        });
        setTicketData(ticketDataCopy);
        updateTicketDetails(ticketDataCopy);//.then(()=>{
        setNewNotes("");
    }

    const getNotesView = function () {
        return (
            <ul>
                {ticketData.notes.map((val, index, ticketArray) => {
                    return <li className='d-flex flex-column border rounded mt-2 mb-2' key={Math.random().toString()}>
                        <div className='d-flex flex-row justify-content-between p-1 bg-light bg-gradient rounded-top'>
                            <p className='m-0 p-1'>{ticketArray[ticketArray.length - 1 - index].createdBy.displayName}</p>
                            <p className='m-0 p-1'>{new Date(ticketArray[ticketArray.length - 1 - index].createdOn.seconds * 1000).toUTCString()}</p>
                        </div>
                        <div>
                            <p className='p-2'>{ticketArray[ticketArray.length - 1 - index].text}</p>
                        </div>
                    </li>
                })}
            </ul>
        )
    }

    const handleTicketStateChange = function(event){
        event.preventDefault();
        var ticketDataCopy = {...ticketData};

        ticketDataCopy.state = event.target.value;

        setTicketData(ticketDataCopy);
    }

    const handleUpdateButtonClick = function(event) {
        event.preventDefault();

        updateTicketDetails(ticketData).then(()=>{
            console.debug("Ticket details update success.")
        });
    }

    const assignTicketToMe = function(event) {
        event.preventDefault();
        var ticketDataCopy = {...ticketData};
        ticketDataCopy.assignedTo = {displayName: loggedInUser.displayName, uid: loggedInUser.uid};
        setTicketData(ticketDataCopy);
        updateTicketDetails(ticketDataCopy).then(()=>{
            console.debug("Ticket details update success.")
        });
    }

    const getTicketDetailsView = function(){
        return (
            <main className="mt-5 pt-5">
                <div className='d-flex flex-row justify-content-between align-items-start'>
                    <h1>Ticket Detail Page</h1>
                    <button type="button" className="btn btn-primary" onClick={(event) => handleUpdateButtonClick(event)}>Update</button>
                </div>

                <form>
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label htmlFor="ticketNumber" className="form-label">Ticket number</label>
                                <input type="text" className="form-control" id="ticketNumber" value={ticketData.number} disabled={true} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="createdBy" className="form-label">Created by</label>
                                <input type="text" className="form-control" id="createdBy" value={ticketData.createdBy.displayName} disabled={true} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="assignedTo" className="form-label">Assigned to</label>
                                <input type="text" className="form-control" id="assignedTo" value={ticketData.assignedTo && ticketData.assignedTo.displayName} disabled={true} />
                            </div>
                            {isSupportRole && !ticketData.assignedTo && <button type="button" className="btn btn-link ps-0 pt-0" onClick={assignTicketToMe}>Assign to me</button>}
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label htmlFor="createdOn" className="form-label">Created on</label>
                                <input type="text" className="form-control" id="createdOn" value={new Date(ticketData.createdOn.seconds * 1000).toUTCString()} disabled={true} />
                            </div>
                            {/* <div className="mb-3">
                                <label htmlFor="state" className="form-label">State</label>
                                <input type="text" className="form-control" id="state" defaultValue={ticketData.state} disabled={true} />
                            </div> */}
                            <label htmlFor="state" className="form-label">State</label>
                            <select className="form-select" aria-label="Default select example" value={ticketData.state} onChange={(event)=>{handleTicketStateChange(event)}}>
                                {allTicketStates.map(function(state){return <option key={state}>{state}</option>})}
                            </select>
                        </div>
                    </div>
                    <div className='row d-flex flex-column'>
                        <div className="mb-3">
                            <label htmlFor="shortDescription" className="form-label">Short Description</label>
                            <input type="text" className="form-control" id="shortDescription" value={ticketData.shortDescription} disabled={true} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="longDescription" className="form-label">Long Description</label>
                            <textarea className="form-control" id="shortDescription" value={ticketData.longDescription} disabled={true} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="addNotes" className="form-label">Add notes/comments</label>
                            <textarea className="form-control" id="addNotes" value={newNotes} onChange={handleNotesChange} />
                        </div>
                        <div className='d-flex flex-row justify-content-end'>
                            <button type="button" className="btn btn-primary" onClick={(event)=>handleCommentClick(event)}>Comment</button>
                        </div>
                        {getNotesView()}
                        {/* <div> */}
                        {/* <ul>
                            {ticketData.notes.map((val, index, ticketArray) => { return ticketArray[ticketArray.length - 1 - index].text })}
                        </ul> */}
                        {/* </div> */}
                    </div>
                </form>
            </main>
        )
    }

    const getTicketDetailsError = function() {
        setAlert({ message: "Error fetching ticket details", type: "error" });

        return (alert && alert.message ? <AlertMessage alert={alert} className="mt-3 pt-3"/> : "")
    }

    return (
        <>
            {ticketData && ticketData.hasOwnProperty("number") ? getTicketDetailsView() : "" }
        </>
    )
}