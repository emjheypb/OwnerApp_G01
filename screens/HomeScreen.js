import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import BookingsScreen from "./BookingsScreen";
import ListingScreen from "./ListingScreen";

const Drawer = createDrawerNavigator();

const HomeScreen = () => {
  const additionalDrawerItems = (props) => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          onPress={() => props.navigation.navigate("Login")}
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
