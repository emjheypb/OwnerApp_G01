import firebaseConfig from "../config/FirebaseApp";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const db = getFirestore(firebaseConfig);
const USERS_COLECTION = "Users";

export const getUser = async (userID, _callback) => {
  try {
    console.log("getUser", userID);
    const docRef = doc(db, USERS_COLECTION, userID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("getUser", "Document data:", docSnap.data());
      _callback(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("getUser", "No such document!");
    }
  } catch (err) {
    console.log("getUser", err);
  }
};

export const addUsers = async () => {
  const users = [
    {
      id: "owner@one.com",
      data: {
        name: "Uno O. Primis",
        image:
          "https://firebasestorage.googleapis.com/v0/b/rent-an-ev-2fd04.appspot.com/o/Driver.jpg?alt=media&token=a28efc40-c514-46b8-ae86-9728a1935567",
      },
    },
    {
      id: "owner@two.com",
      data: {
        name: "Deux O. Secondo",
        image:
          "https://firebasestorage.googleapis.com/v0/b/rent-an-ev-2fd04.appspot.com/o/Driver.jpg?alt=media&token=a28efc40-c514-46b8-ae86-9728a1935567",
      },
    },
    {
      id: "renter@one.com",
      data: {
        name: "Ichi R. Yi",
        image:
          "https://firebasestorage.googleapis.com/v0/b/rent-an-ev-2fd04.appspot.com/o/Driver.jpg?alt=media&token=a28efc40-c514-46b8-ae86-9728a1935567",
      },
    },
    {
      id: "renter@two.com",
      data: {
        name: "Zwei R. Doosara",
        image:
          "https://firebasestorage.googleapis.com/v0/b/rent-an-ev-2fd04.appspot.com/o/Driver.jpg?alt=media&token=a28efc40-c514-46b8-ae86-9728a1935567",
      },
    },
  ];

  try {
    for (const user of users) {
      console.log("addUsers", user);
      const addedUser = await setDoc(
        doc(db, USERS_COLECTION, user.id),
        user.data
      );
      console.log("addUsers", addedUser);
    }
  } catch (err) {
    console.log("addUsers", err);
  }
};
