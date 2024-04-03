import {
  View,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { useEffect, useState } from "react";
import { fetchVehicles } from "../controllers/VehiclesAPI";
import { deleteListing, getListing } from "../controllers/ListingsDB";

const MyListingScreen = () => {
  const [vehiclesList, setVehiclesList] = useState([]);
  const [filteredVehiclesList, setFilteredVehiclesList] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getListing((listing) => {
      //   console.log(JSON.stringify(listing));
      setVehiclesList(listing);
    });
  }, []);

  const selectListing = (item) => {
    // console.log("selectListing", item);
    deleteListing(item.id, item.data, Number(!item.data.status));
  };

  const renderListItem = ({ item }) => (
    <View style={styles.listItem}>
      <Image
        source={{ uri: item.data.image }}
        style={styles.listImage}
        resizeMode="contain"
      />
      <View style={styles.listDetails}>
        <Text style={styles.listTitle}>
          {item.data.make} {item.data.model} ({item.data.licensePlate})
        </Text>
        <Text style={styles.subtitle}>
          {item.data.status ? "Active" : "Inactive"} - {item.id}
        </Text>
        <Text>$ {item.data.price}</Text>
        <Text>Location: {item.data.location}</Text>
        <Text>Seat Capacity: {item.data.seatCapacity}</Text>
        <Text>Type: {item.data.formFactor}</Text>
        <Text>Range: {item.data.electricRange} km</Text>
      </View>
      <TouchableOpacity onPress={() => selectListing(item)}>
        <Image
          source={{
            uri: item.data.status
              ? "https://cdn-icons-png.flaticon.com/512/3807/3807871.png"
              : "https://static.vecteezy.com/system/resources/previews/033/245/519/original/recycle-icon-recycling-garbage-symbol-environment-for-graphic-design-logo-web-site-social-media-mobile-app-ui-illustration-png.png",
          }}
          style={{ width: 25, height: 25, margin: 10 }}
        />
      </TouchableOpacity>
    </View>
  );

  const applyFilter = (text) => {
    setFilter(text);

    setFilteredVehiclesList(
      vehiclesList.filter((item) => {
        return (
          item.make.toLowerCase().includes(text.toLowerCase()) ||
          item.model.toLowerCase().includes(text.toLowerCase()) ||
          item.trim.toLowerCase().includes(text.toLowerCase()) ||
          item.form_factor.toLowerCase().includes(text.toLowerCase())
        );
      })
    );
  };

  return (
    <SafeAreaView style={styles.centeredView}>
      {/* BODY */}
      <FlatList
        style={styles.flatList}
        data={filter ? filteredVehiclesList : vehiclesList}
        renderItem={(item) => renderListItem(item)}
        key={(item) => {
          item.mal_id;
        }}
      />
    </SafeAreaView>
  );
};

export default MyListingScreen;

const styles = StyleSheet.create({
  button: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    height: "100%",
    width: "100%",
    marginTop: 10,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    elevation: 5,
  },
  tb: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgb(239, 239, 239)",
  },
  flatList: {
    alignContent: "stretch",
    width: "100%",
    marginBottom: 10,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  listImage: {
    width: 100,
    height: "100%",
  },
  listDetails: {
    flex: 1,
    marginLeft: 10,
    height: "100%",
  },
  listTitle: {
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 10,
    color: "gray",
  },
});
