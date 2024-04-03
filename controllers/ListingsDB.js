import { auth, db } from "../config/FirebaseApp";
import { collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore";

const LISTING_COLLECTION = "Listing";

export const addListing = async (listing, _callback) => {
  try {
    const addedListing = await addDoc(
      collection(db, LISTING_COLLECTION),
      listing
    );

    console.log("addListing", addedListing.id);
    _callback(null);
  } catch (err) {
    console.log("addListing", err);
    _callback(err);
  }
};
