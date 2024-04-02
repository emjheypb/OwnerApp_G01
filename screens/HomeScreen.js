import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import BookingsScreen from "./BookingsScreen";
import ListingScreen from "./ListingScreen";
import { useContext, useEffect, useState } from "react";
import {
  UserContext,
  getUserDetails,
  logOutUser,
} from "../controllers/UsersDB";
import { Image } from "react-native";
import { auth } from "../config/FirebaseApp";
import { unsubsribe } from "../controllers/BookingsDB";

const Drawer = createDrawerNavigator();

const HomeScreen = () => {
  // const { currUser, setCurrUser } = useContext(UserContext);
  useEffect(() => {
    getUserDetails(auth.currentUser.email, (result) => {
      // console.log("HomeScreen", result);
      setCurrUser(result);
    });
  }, []);

  const [currUser, setCurrUser] = useState(null);

  const additionalDrawerItems = (props) => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label={currUser ? currUser.name : ""}
          icon={({ focused, color, size }) => (
            <Image
              source={{
                uri: currUser
                  ? currUser.image
                  : "https://firebasestorage.googleapis.com/v0/b/rent-an-ev-2fd04.appspot.com/o/Profile.png?alt=media&token=d73f1879-0940-46f6-bf2d-6e2dd3bba4a1",
              }}
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />
          )}
          onPress={() => {}}
        />
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          onPress={() => {
            unsubsribe();
            setCurrUser(null);
            logOutUser();
            props.navigation.popToTop();
          }}
        />
      </DrawerContentScrollView>
    );
  };

  return (
    <Drawer.Navigator drawerContent={additionalDrawerItems}>
      <Drawer.Screen name="Create Listing" component={ListingScreen} />
      {/* <Drawer.Screen name="My Listings" component={ListingScreen} /> */}
      <Drawer.Screen name="Bookings" component={BookingsScreen} />
    </Drawer.Navigator>
  );
};

export default HomeScreen;
