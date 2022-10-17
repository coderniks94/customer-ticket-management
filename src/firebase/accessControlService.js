import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "./config";

const accessControlCollection = "accessControl";

export async function getAccessControlDetails (args) {

    const accessControlRef = collection(db, accessControlCollection);
    const q = query(accessControlRef,
        where("entity", "==", args.entity),
        where("entityType", "==", args.entityType)
    );

    const querySnapshot = await getDocs(q);

    var accessControlList = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        var docData = doc.data();
        docData.id = doc.id;
        accessControlList.push(docData);
    });
    return accessControlList;

}
