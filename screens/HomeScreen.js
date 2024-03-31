import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import BookingsScreen from "./BookingsScreen";
import ListingScreen from "./ListingScreen";
import { useEffect, useState } from "react";
import { getUser } from "../controllers/UsersDB";
import { Image } from "react-native";

const Drawer = createDrawerNavigator();

const HomeScreen = () => {
  useEffect(() => {
    getUser("owner@one.com", (user) => {
      setCurrUser(user);
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
              style={{ width: 50, height: 50 }}
            />
          )}
          onPress={() => {}}
        />
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          onPress={() => props.navigation.popToTop()}
        />
      </DrawerContentScrollView>
    );
  };

  return (
    <Drawer.Navigator drawerContent={additionalDrawerItems}>
      <Drawer.Screen name="Listing" component={ListingScreen} />
      <Drawer.Screen name="Bookings" component={BookingsScreen} />
    </Drawer.Navigator>
  );
};

export default HomeScreen;
