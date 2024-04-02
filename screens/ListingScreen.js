import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import VehicleItemList from "./components/VehicleItemList";
import LabeledTextInput from "./components/LabeledTextInput";
import { auth } from "../config/FirebaseApp";
import { getUserDetails } from "../controllers/UsersDB";
import { addListing } from "../controllers/ListingsDB";
import { doForwardGeocode } from "../controllers/LocationManager";

const ListingScreen = ({ route, navigation }) => {
  // #region INPUT STATES
  const [modalVehicles, setModalVehicles] = useState(false);
  const [loadingScreen, setLoadingScren] = useState(false);
  const [vehicle, setVehicle] = useState(null);
  const [seatCapacity, setSeatCapacity] = useState(""); // seats_max
  const [formFactor, setFormFactor] = useState(""); // form_factor
  const [electricRange, setElectricRange] = useState(""); // electric_range
  const [licensePlate, setLicensePlate] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  // #endregion

  // #region ERROR STATES
  const [vehicleIsError, setVehicleIsError] = useState(false);
  const [seatCapacityIsError, setSeatCapacityIsError] = useState(false);
  const [formFactorIsError, setFormFactorIsError] = useState(false);
  const [electricRangeIsError, setElectricRangeIsError] = useState(false);
  const [licensePlateIsError, setLicensePlateIsError] = useState(false);
  const [locationIsError, setLocationIsError] = useState(false);
  const [priceIsError, setPriceIsError] = useState(false);
  // #endregion

  // AUTO FILL ON VEHICLE SELECT
  const selectVehicle = (selectedVehicle) => {
    // console.log("selectVehicle", selectedVehicle);
    setVehicle(selectedVehicle);
    setSeatCapacity(`${selectedVehicle.seats_max}`);
    setFormFactor(selectedVehicle.form_factor);
    setElectricRange(`${selectedVehicle.electric_range}`);
  };

  const validateFields = (_callback) => {
    //#region CHECKS
    const vehicleCheck = vehicle === null;
    const seatCapacityCheck = seatCapacity.trim() === "";
    const formFactorCheck = formFactor.trim() === "";
    const electricRangeCheck =
      electricRange.trim() === "" || isNaN(electricRange.trim());
    const licensePlateCheck = licensePlate.trim() === "";
    const priceCheck = price.trim() === "" || isNaN(price.trim());
    const locationCheck = location.trim() === "";
    //#endregion

    //#region UPDATE COMPONENTS
    setVehicleIsError(vehicleCheck);
    setSeatCapacityIsError(seatCapacityCheck);
    setFormFactorIsError(formFactorCheck);
    setElectricRangeIsError(electricRangeCheck);
    setLicensePlateIsError(licensePlateCheck);
    setPriceIsError(priceCheck);
    setLocationIsError(locationCheck);
    //#endregion

    if (locationCheck) {
      _callback(false);
      return;
    }

    // check if location is valid
    doForwardGeocode(location, (result, error) => {
      if (error === null) {
        // console.log("doForwardGeocode", JSON.stringify(result));
        if (result === undefined) {
          setLocationIsError(true);
          _callback(false);
          return;
        }

        _callback(
          !vehicleCheck &&
            !seatCapacityCheck &&
            !formFactorCheck &&
            !electricRangeCheck &&
            !licensePlateCheck &&
            !locationCheck &&
            !priceCheck,
          result
        );
      } else {
        console.log("doForwardGeocode", error);
        _callback(false);
      }
    });
  };

  const postListing = () => {
    validateFields((isValid, latLong) => {
      if (isValid) {
        getUserDetails(auth.currentUser.email, (result) => {
          if (result === null) {
            alert("Logged out unexpectedly.");
            navigation.popToTop();
          } else {
            setLoadingScren(true);
            const newPost = {
              model: vehicle.model,
              make: vehicle.make,
              trim: vehicle.trim,
              seatCapacity: Number(seatCapacity),
              formFactor: formFactor,
              electricRange: Number(electricRange),
              licensePlate: licensePlate,
              location: location,
              price: Number(price),
              image: vehicle.images[0].url_thumbnail,
              ownerName: result.name,
              ownerImage: result.image,
              ownerEmail: auth.currentUser.email,
              status: 1,
              latitude: latLong.latitude,
              longitude: latLong.longitude,
            };
            addListing(newPost, (result) => {
              if (result === null) {
                resetFields();
                alert("Listing Posted");
              } else {
                alert("Failed to Post Listing.");
              }

              setLoadingScren(false);
            });
          }
        });
      }
    });
  };

  const resetFields = () => {
    //#region INPUT FIELDS
    setVehicle(null);
    setSeatCapacity("");
    setFormFactor("");
    setElectricRange("");
    setLicensePlate("");
    setLocation("");
    setPrice("");
    //#endregion

    //#region ERROR CHECKS
    setVehicleIsError(false);
    setSeatCapacityIsError(false);
    setFormFactorIsError(false);
    setElectricRangeIsError(false);
    setLicensePlateIsError(false);
    setLocationIsError(false);
    setPriceIsError(false);
    //#endregion
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <VehicleItemList
            isVisible={modalVehicles}
            setIsVisible={setModalVehicles}
            selectedVehicle={selectVehicle}
          />

          {/* #region INPUT FIELDS */}
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "rgb(187,39,26)", fontWeight: "bold" }}>
                *{" "}
              </Text>
              <Text style={styles.label}>Vehicle</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setModalVehicles(true);
              }}
              style={[
                styles.inputs,
                {
                  backgroundColor: vehicleIsError
                    ? "pink"
                    : "rgb(239, 239, 239)",
                },
              ]}
              disabled={loadingScreen}>
              <Text style={{ color: vehicle ? "black" : "rgb(189,189,189)" }}>
                {vehicle
                  ? `${vehicle.make} ${vehicle.model} ${vehicle.trim}`.trim()
                  : "Select Vehicle"}
              </Text>
            </TouchableOpacity>
          </View>
          <LabeledTextInput
            label="Seat Capacity"
            placeholder="Enter seat capacity"
            value={seatCapacity}
            onChangeText={setSeatCapacity}
            inputMode="numeric"
            isMandatory={true}
            isError={seatCapacityIsError}
            disabled={loadingScreen}
          />
          <LabeledTextInput
            label="Vehicle Type"
            placeholder="Enter type (sedan, suv, etc.)"
            value={formFactor}
            onChangeText={setFormFactor}
            isMandatory={true}
            isError={formFactorIsError}
            disabled={loadingScreen}
          />
          <LabeledTextInput
            label="Electric Range (km)"
            placeholder="Enter electric range (km)"
            value={electricRange}
            onChangeText={setElectricRange}
            inputMode="numeric"
            isMandatory={true}
            isError={electricRangeIsError}
            disabled={loadingScreen}
          />
          <LabeledTextInput
            label="License Plate"
            placeholder="Enter license plate"
            value={licensePlate}
            onChangeText={setLicensePlate}
            isMandatory={true}
            isError={licensePlateIsError}
            disabled={loadingScreen}
          />
          <LabeledTextInput
            label="Pickup Location"
            placeholder="Enter pickup location address"
            value={location}
            onChangeText={setLocation}
            isMandatory={true}
            isError={locationIsError}
            autoCapitalize="words"
            disabled={loadingScreen}
          />
          <LabeledTextInput
            label="Rent Price (CAD)"
            placeholder="Enter rent price (CAD)"
            value={price}
            onChangeText={setPrice}
            inputMode="numeric"
            isMandatory={true}
            isError={priceIsError}
            disabled={loadingScreen}
          />
          {/* #endregion */}

          {loadingScreen ? <ActivityIndicator size="large" /> : <Text></Text>}

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "rgb(234,196,81)" }]}
            onPress={resetFields}
            disabled={loadingScreen}>
            <Text style={{ fontWeight: "bold" }}>R E S E T</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "rgb(120, 166, 90)" }]}
            onPress={postListing}
            disabled={loadingScreen}>
            <Text style={{ fontWeight: "bold", color: "white" }}>P O S T</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default ListingScreen;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginTop: 20,
    gap: 10,
  },
  label: {
    fontWeight: "bold",
  },
  inputs: {
    padding: 10,
    borderRadius: 10,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
});
