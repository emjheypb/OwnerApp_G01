import { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { getBooking, unsubsribe } from "../controllers/BookingsDB";

const BookingsScreen = ({ navigation }) => {
  useEffect(() => {
    getBooking((booking) => {
      setBookings(booking);
    });
  }, []);

  const [bookings, setBookings] = useState([]);

  const renderListItem = ({ item }) => (
    <TouchableOpacity>
      <Text>{item.id}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <FlatList
        style={styles.flatList}
        data={bookings}
        renderItem={(item) => renderListItem(item)}
        key={(item) => {
          item.id;
        }}
      />
    </SafeAreaView>
  );
};

export default BookingsScreen;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "lightblue",
    alignItems: "center",
  },
  flatList: {
    alignContent: "stretch",
    width: "100%",
    marginBottom: 10,
  },
});
