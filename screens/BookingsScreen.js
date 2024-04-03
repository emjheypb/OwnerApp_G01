import { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { getBooking, unsubsribe } from "../controllers/BookingsDB";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import BookingDetails from "./components/BookingDetails";

const BookingsScreen = ({ route, navigation }) => {
  useEffect(() => {
    // console.log("BookingsScreen", JSON.stringify(route.params.user));
    getBooking((booking) => {
      // console.log(booking);
      setBookings(booking);
    });
  }, []);

  const [bookings, setBookings] = useState([]);
  const [statusFilterIndex, setStatusFilterIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const renderListItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => {
        setShowDetails(true);
        setSelectedBooking(item);
      }}>
      <Text style={styles.listTitle}>
        {item.data.make} {item.data.model} ({item.data.licensePlate})
      </Text>
      <Text>Date: {item.data.date.toDate().toDateString()}</Text>
      <Text>Renter: {item.data.renter}</Text>
      {statusFilterIndex === 1 ? (
        <Text style={{ color: "rgb(120, 166, 90)", fontWeight: "bold" }}>
          Confirmation #{item.data.confirmationCode}
        </Text>
      ) : (
        <></>
      )}
      <Text style={styles.subtitle}>{item.id}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {selectedBooking !== null ? (
        <BookingDetails
          isVisible={showDetails}
          setIsVisible={setShowDetails}
          selectedBooking={selectedBooking}
          bookedDates={bookings
            .filter((item) => {
              return item.data.status === 1;
            })
            .map((item) => ({
              date: item.data.date.toDate().toDateString(),
              id: item.data.listingID,
            }))}
        />
      ) : (
        <></>
      )}
      <View style={{ width: "100%", height: "100%", gap: 10 }}>
        <SegmentedControl
          values={["Pending", "Approved", "Declined"]}
          selectedIndex={statusFilterIndex}
          onChange={(event) => {
            setStatusFilterIndex(event.nativeEvent.selectedSegmentIndex);
          }}
        />
        {!bookings.filter((item) => {
          return item.data.status === statusFilterIndex;
        }).length ? (
          <Text style={{ fontWeight: "bold" }}>NO BOOKINGS</Text>
        ) : (
          <FlatList
            style={styles.flatList}
            data={bookings.filter((item) => {
              return item.data.status === statusFilterIndex;
            })}
            renderItem={(item) => renderListItem(item)}
            key={(item) => {
              item.id;
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default BookingsScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    margin: 10,
  },
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
  },
  listItem: {
    alignItems: "flex-start",
    padding: 5,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  listTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subtitle: {
    fontSize: 10,
    color: "gray",
  },
});
