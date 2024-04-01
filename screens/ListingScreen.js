import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { useState } from "react";
import VehicleItemList from "./components/VehicleItemList";
import LabeledTextInput from "./components/LabeledTextInput";

const ListingScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [vehicle, setVehicle] = useState(null);
  const [seatCapacity, setSeatCapacity] = useState(""); // seats_max
  const [formFactor, setFormFactor] = useState(""); // form_factor
  const [electricRange, setElectricRange] = useState(""); // electric_range
  const [licensePlate, setLicensePlate] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const selectVehicle = (selectedVehicle) => {
    console.log("selectVehicle", selectedVehicle);
    setVehicle(selectedVehicle);
    setSeatCapacity(`${selectedVehicle.seats_max}`);
    setFormFactor(selectedVehicle.form_factor);
    setElectricRange(`${selectedVehicle.electric_range}`);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <VehicleItemList
            isVisible={modalVisible}
            setIsVisible={setModalVisible}
            selectedVehicle={selectVehicle}
          />
          <View>
            <Text style={styles.label}>Vehicle</Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
              style={styles.inputs}>
              <Text>
                {vehicle
                  ? `${vehicle.make} ${vehicle.model} ${vehicle.trim}`.trim()
                  : "Select Vehicle..."}
              </Text>
            </TouchableOpacity>
          </View>
          <LabeledTextInput
            label="Seat Capacity"
            placeholder="Enter seat capacity"
            value={seatCapacity}
            onChangeText={setSeatCapacity}
            inputMode="numeric"
          />
          <LabeledTextInput
            label="Vehicle Type"
            placeholder="Enter type (sedan, suv, etc.)"
            value={formFactor}
            onChangeText={setFormFactor}
          />
          <LabeledTextInput
            label="Electric Range (km)"
            placeholder="Enter electric range (km)"
            value={electricRange}
            onChangeText={setElectricRange}
            inputMode="numeric"
          />
          <LabeledTextInput
            label="License Plate"
            placeholder="Enter license plate"
            value={licensePlate}
            onChangeText={setLicensePlate}
          />
          <LabeledTextInput
            label="Pickup Location"
            placeholder="Enter pickup location address"
            value={location}
            onChangeText={setLocation}
          />
          <LabeledTextInput
            label="Rent Price (CAD)"
            placeholder="Enter rent price (CAD)"
            value={electricRange}
            onChangeText={setElectricRange}
            inputMode="numeric"
          />
        </SafeAreaView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default ListingScreen;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    gap: 10,
  },
  label: {
    fontWeight: "bold",
  },
  inputs: {
    padding: 10,
    backgroundColor: "rgb(239, 239, 239)",
    borderRadius: 10,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    height: "100%",
    backgroundColor: "lightblue",
  },
});
