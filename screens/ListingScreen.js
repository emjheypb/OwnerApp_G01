import { SafeAreaView, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useEffect, useState } from "react";

const ListingScreen = () => {
  useEffect(() => {
    console.log;
  });
  const [vehicle, setVehicle] = useState("");
  const [vehiclesList, setVehiclesList] = useState([]);
  const [vehicleModelsList, setVehicleModelsList] = useState([]);

  return (
    <SafeAreaView>
      <Text>Listing</Text>
      <RNPickerSelect
        onValueChange={(value) => setVehicle(value)}
        items={[
          { label: "Football", value: "football" },
          { label: "Baseball", value: "baseball" },
          { label: "Hockey", value: "hockey" },
        ]}
      />
    </SafeAreaView>
  );
};

export default ListingScreen;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "lightblue",
    alignItems: "center",
  },
});
