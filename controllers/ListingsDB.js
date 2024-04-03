import { auth, db } from "../config/FirebaseApp";
import {
  collection,
  query,
  addDoc,
  doc,
  setDoc,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const LISTING_COLLECTION = "Listing";
let currSnapshot = null;

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

export const deleteListing = async (id, listing, status) => {
  try {
    listing.status = status;
    await setDoc(doc(db, LISTING_COLLECTION, id), listing);

    // console.log("deleteListing", id);
  } catch (err) {
    console.log("deleteListing", err);
  }
};

export const getListing = async (_callback) => {
  const q = query(
    collection(db, LISTING_COLLECTION),
    where("ownerEmail", "==", auth.currentUser.email),
    orderBy("status", "desc"),
    orderBy("make")
  );

  currSnapshot = onSnapshot(
    q,
    (querySnapshot) => {
      const listing = [];
      querySnapshot.forEach((doc) => {
        listing.push({ id: doc.id, data: doc.data() });
      });
      //   console.log("getListing", listing);
      _callback(listing);
    },
    (error) => {
      console.log("getListing", error);
    }
  );
};

export const unsubsribeListing = () => {
  console.log("unsubsribeListing");
  currSnapshot();
};
