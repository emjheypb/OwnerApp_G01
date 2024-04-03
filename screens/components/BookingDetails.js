import {
  View,
  Image,
  Text,
  StyleSheet,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { updateBooking } from "../../controllers/BookingsDB";

const BookingDetails = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingScreen, setLoadingScren] = useState(false);
  const [details, setDetails] = useState({});

  useEffect(() => {
    setDetails(props.selectedBooking.data);
  });

  const closeModal = () => {
    props.setIsVisible(false);
    setModalVisible(false);
    setLoadingScren(false);
  };

  const generateConfirmationCode = () => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 7) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };

  const updateBookingStatus = (status) => {
    //#region VALIDATE IF VEHICLE IS BOOKED FOR THE DATE
    if (status === 1) {
      for (bookedDate of props.bookedDates) {
        // console.log(bookedDate.id, details.listingID);
        // console.log(bookedDate.date, details.date.toDate().toDateString());
        if (
          bookedDate.id === details.listingID &&
          bookedDate.date === details.date.toDate().toDateString()
        ) {
          alert("Vehicle is already booked for this date.");
          return;
        }
      }

      // return;
      details.confirmationCode = generateConfirmationCode();
    }
    //#endregion

    setLoadingScren(true);
    details.status = status;
    updateBooking(props.selectedBooking.id, details, (success) => {
      if (success) {
        closeModal();
        alert("Booking " + (status === 1 ? "Approved" : "Declined"));
      } else {
        alert("Failed to Update Booking.");
        setLoadingScren(false);
      }
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.isVisible}
      presentationStyle="overFullScreen"
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}>
      <SafeAreaView>
        <View style={styles.modalView}>
          {/* HEADER */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingRight: 10,
            }}>
            {details.status === 0 ? (
              <Text style={[styles.title, { color: "rgb(234,196,81)" }]}>
                PENDING - {props.selectedBooking.id}
              </Text>
            ) : (
              <></>
            )}
            {details.status === 1 ? (
              <Text style={[styles.title, { color: "rgb(120, 166, 90)" }]}>
                APPROVED - #{details.confirmationCode}
              </Text>
            ) : (
              <></>
            )}
            {details.status === 2 ? (
              <Text style={[styles.title, { color: "maroon" }]}>
                DECLINED - {props.selectedBooking.id}
              </Text>
            ) : (
              <></>
            )}
            <TouchableOpacity onPress={() => closeModal()}>
              <Image
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/rent-an-ev-2fd04.appspot.com/o/Close.png?alt=media&token=0369ba38-fc54-4e53-9052-e5940e896305",
                }}
                style={styles.button}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* BODY */}
          <View style={{ gap: 10, marginTop: 10 }}>
            <View>
              <Text style={styles.detailsTitle}>
                {details.make} {details.model} ({details.licensePlate})
              </Text>
              <Text>{props.selectedBooking.id}</Text>
            </View>

            <View>
              <Text style={styles.detailsTitle}>Listing</Text>
              <Text>
                {details.date ? details.date.toDate().toDateString() : ""}
              </Text>
              <Text>$ {details.price}</Text>
              <Text>{details.pickupLocation}</Text>
            </View>

            <View>
              <Text style={styles.detailsTitle}>Renter</Text>
              <Text>{details.renter}</Text>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={{ uri: details.renterImage }}
              />
            </View>
          </View>

          {loadingScreen ? <ActivityIndicator size="large" /> : <Text></Text>}

          {/* BUTTONS */}
          {details.status === 0 ? (
            <View style={{ width: "100%", gap: 10, flexDirection: "row" }}>
              <TouchableOpacity
                style={[styles.fullButton, { backgroundColor: "maroon" }]}
                onPress={() => updateBookingStatus(2)}
                disabled={loadingScreen}>
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  D E C L I N E
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.fullButton,
                  { backgroundColor: "rgb(120, 166, 90)" },
                ]}
                onPress={() => updateBookingStatus(1)}
                disabled={loadingScreen}>
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  A P P R O V E
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default BookingDetails;

const styles = StyleSheet.create({
  button: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  fullButton: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    height: "100%",
    width: "100%",
    marginTop: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    elevation: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
  },
  subtitle: {
    color: "gray",
  },
  detailsTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  image: {
    height: 250,
  },
});
