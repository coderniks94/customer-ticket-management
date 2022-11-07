

import { async } from "@firebase/util";
import { collection, doc, getDoc, getDocs, onSnapshot, query, runTransaction, serverTimestamp, setDoc, Timestamp, where } from "firebase/firestore";
import { db } from "./config";

const ticketsCollection = "tickets";
const ticketIdDigits = 6;
// const increment = FieldValue.increment(1);
const statsDocRef = doc(db, ticketsCollection, "--stats--");

// async function getStats() {
//     // const statsRef = doc(db, ticketsCollection, "--stats--");
//     const docSnap = await getDoc(statsRef);
//     if (docSnap.exists()) {
//         console.debug("Document data:", docSnap.data());
//         return docSnap.data();
//     } else {
//         // doc.data() will be undefined in this case
//         console.debug("No such document!");
//         return {};
//     }
// }

async function incrementAndGetCount() {
    try {
        return await runTransaction(db, async (transaction) => {
            const statsDoc = await transaction.get(statsDocRef);
            if (!statsDoc.exists()) {
                // throw "Document does not exist!";
                await setDoc(statsDocRef, {count: 0});
            }

            const newCount = statsDoc.data().count + 1;
            transaction.update(statsDocRef, { count: newCount });
            // statsDoc = await transaction.get(statsDocRef);
            return statsDoc.data();
        });
        console.debug("Transaction successfully committed!");
    } catch (e) {
        console.debug("Transaction failed: ", e);
    }
}

// async function incrementTicketCount() {
//     var statsCount = {
//         count: increment(1)
//     }
//     const response = await updateDoc(statsDocRef, statsCount);
//     return response;
// }

function _getTicketId(ticketNumber) {
    var digits = 0;
    var ticketNumberCopy = ticketNumber;
    while (ticketNumber >= 1) {
        digits++;
        ticketNumber = ticketNumber / 10;
    }
    var tickeId = "TK";
    var zeroes = ticketIdDigits - digits;
    for (var i = 0; i < zeroes; i++) {
        tickeId += "0";
    }
    // tickeId += ticketNumberCopy.toString();
    tickeId += ticketNumberCopy;

    return tickeId;
}

export async function createTicket(ticketDetails) {
    // incrementTicketCount().then(async (statsDoc) => {
    return incrementAndGetCount().then(async (statsDoc) => {
        const ticketId = _getTicketId(statsDoc.count);
        // const serverTime = serverTimestamp();
        ticketDetails.createdOn = serverTimestamp();
        ticketDetails.updatedOn = serverTimestamp();
        ticketDetails.assignedTo = "";
        ticketDetails.number = ticketId;
        ticketDetails.state = "Open";
        ticketDetails.notes = [
            {
                createdBy: ticketDetails.createdBy,
                createdOn: Timestamp.now(),
                text: "New ticket " + ticketId + " created by " + ticketDetails.createdBy.displayName
            }
        ];
        // const batch = writeBatch(db);

        const ticketDocRef = doc(db, ticketsCollection, ticketId);
        const ticketDoc = await setDoc(ticketDocRef, ticketDetails);
        // batch.set(nyticketRefcRef, ticketDetails);

        // return await setDoc(doc(db, ticketsCollection), ticketDetails);
        console.debug("Ticket created");
        // return ticketDoc;
        return {
            status: "success",
            message: "Ticket created successfully.",
            ticket: ticketDetails
        }

    });
    
}

export async function updateTicketDetails(updatedTicketDetails){
    console.debug("Updating ticket details");
    const ticketRef = doc(db, ticketsCollection, updatedTicketDetails.number);
    return await setDoc(ticketRef, updatedTicketDetails);
}

export async function getTicketsCreatedByUser(userId) {
    const q = query(collection(db, ticketsCollection), where("createdBy.uid", "==", userId));

    const querySnapshot = await getDocs(q);
    var result = [];
    console.debug("tickets by user");
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.debug(doc.id, " => ", doc.data());
        result.push(doc.data());
        console.debug(doc.data());
    });
    return result;
}

export async function getAllOpenTickets() {
    const q = query(collection(db, ticketsCollection), where("state", "==", "Open"));

    const querySnapshot = await getDocs(q);
    var result = [];
    console.debug("All open tickets");
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.debug(doc.id, " => ", doc.data());
        result.push(doc.data());
        console.debug(doc.data());
    });
    return result;
}

export async function getTicketDetailsById(ticketId) {
    const docRef = doc(db, ticketsCollection, ticketId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.debug("Ticket data:", docSnap.data());
        return docSnap.data();
    } else {
        // doc.data() will be undefined in this case
        console.debug("No such document!");
        return {};
    }
}

export function listenToSnapshot(ticketId, cb) {
    const unsub = onSnapshot(doc(db, ticketsCollection, ticketId), (doc) => {
        console.debug("Current data: ", doc.data());
        cb(doc.data());
        // return doc.data();
    });

    return unsub;
}
