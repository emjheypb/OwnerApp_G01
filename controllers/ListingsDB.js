import { auth, db } from "../config/FirebaseApp";
import { collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore";

const LISTING_COLLECTION = "Listing";
const USERS_COLLECTION = "Users";

export const addListing = async (listing, _callback) => {
  try {
    const miniListing = {
      make: listing.make,
      model: listing.model,
      trim: listing.trim,
      location: listing.location,
      price: listing.price,
      licensePlate: listing.licensePlate,
      status: 1,
    };

    const addedListing = await addDoc(
      collection(db, LISTING_COLLECTION),
      listing
    );

    await setDoc(
      doc(
        db,
        USERS_COLLECTION,
        auth.currentUser.email,
        LISTING_COLLECTION,
        addedListing.id
      ),
      miniListing
    );

    console.log("addListing", addedListing.id);
    _callback(null);
  } catch (err) {
    console.log("addListing", err);
    _callback(err);
  }
};
