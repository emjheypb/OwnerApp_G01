import { useState } from "react";
import { auth, db } from "../config/FirebaseApp";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  setDoc,
  orderBy,
} from "firebase/firestore";

const BOOKING_COLLECTION = "Booking";
let currSnapshot = null;

export const getBooking = async (_callback) => {
  const q = query(
    collection(db, BOOKING_COLLECTION),
    where("ownerID", "==", auth.currentUser.email),
    orderBy("date")
  );

  currSnapshot = onSnapshot(
    q,
    (querySnapshot) => {
      const booking = [];
      querySnapshot.forEach((doc) => {
        booking.push({ id: doc.id, data: doc.data() });
      });
      //   console.log("getBooking", booking);
      _callback(booking);
    },
    (error) => {
      console.log("getBooking", error);
    }
  );
};

export const unsubsribe = () => {
  console.log("unsubscribe");
  currSnapshot();
};

export const getBookingDetails = async (id, _callback) => {
  try {
    const docRef = doc(db, BOOKING_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("getBookingDetails", "Document data:", docSnap.data());
      _callback(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("getBookingDetails", "No such document!");
      _callback(null);
    }
  } catch (err) {
    console.log("getBookingDetails", err);
    _callback(null);
  }
};

export const updateBooking = async (id, listing, _callback) => {
  try {
    await setDoc(doc(db, BOOKING_COLLECTION, id), listing);

    // console.log("updateBooking", id);
    _callback(true);
  } catch (err) {
    console.log("updateBooking", err);
    _callback(false);
  }
};
