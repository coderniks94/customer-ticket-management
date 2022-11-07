import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./config";

const userCollection = "userDetails";

export async function updateUserDetailsInDb(userData, userId) {
    console.debug("updateUserDetails:userData: ", userData);
    console.debug("updateUserDetails:userId: ", userId);
    
    return await setDoc(doc(db, userCollection, userId), userData);
}

export async function getUserDetailsFromDbById(userId) {
    console.debug("userId: ", userId);
    const docRef = doc(db, userCollection, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.debug("User details from db:", docSnap.data());
        return docSnap.data();
    } else {
        // doc.data() will be undefined in this case
        console.debug("No such document!");
        return {};
    }
}