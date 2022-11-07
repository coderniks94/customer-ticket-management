import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./config";

const roleCollection = "roles";

export async function getAllRoles() {
    const q = query(collection(db, roleCollection));

    const querySnapshot = await getDocs(q);
    var result = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.debug(doc.id, " => ", doc.data());
        result.push({
            id: doc.id,
            name: doc.data().name
        });
    });
    return result;
}