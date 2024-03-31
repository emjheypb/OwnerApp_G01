import firebaseConfig from "../config/FirebaseApp";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const db = getFirestore(firebaseConfig);

export const addData = async () => {
  try {
    const addedUser = await addDoc(collection(db, "Users"), user);
    console.log("addData", addedUser);
  } catch (err) {
    console.log("addData", err);
  }
};
