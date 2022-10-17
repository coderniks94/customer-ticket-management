import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./config";

const userCollection = "userDetails";

export async function updateUserDetailsInDb(userData, userId) {
    console.log("updateUserDetails:userData: ", userData);
    console.log("updateUserDetails:userId: ", userId);
    
    return await setDoc(doc(db, userCollection, userId), userData);
}

export async function getUserDetailsFromDbById(userId) {
    console.log("userId: ", userId);
    const docRef = doc(db, userCollection, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data();
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return {};
    }
}