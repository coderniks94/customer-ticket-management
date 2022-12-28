import { doc, getDoc, getDocs } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import { db } from "./config";

// const docRef = doc(db, "cities", "SF");
// const docSnap = await getDoc(docRef);

const companyCollection = "companies";

export async function getCompaniesList() {
    const companiesRef = collection(db, companyCollection);
    const q = query(companiesRef);
    const querySnapshot = await getDocs(q);
    console.debug("querySnapshot: ", querySnapshot);
    // return querySnapshot;
    var companiesList = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.debug(doc.id, " => ", doc.data());
        var docData = doc.data();
        docData.id = doc.id;
        companiesList.push(docData);
    });
    return companiesList;
}