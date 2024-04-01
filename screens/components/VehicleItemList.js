import {
  View,
  Image,
  Text,
  StyleSheet,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { useEffect, useState } from "react";
import { fetchVehicles } from "../../controllers/VehiclesAPI";

const VehicleItemList = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [vehiclesList, setVehiclesList] = useState([]);
  const [filteredVehiclesList, setFilteredVehiclesList] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (vehiclesList.length == 0) {
      fetchVehicles((response, err) => {
        // console.log("useEffect response", response == null);
        // console.log("useEffect error", err == null);
        setVehiclesList(response);
      });
    }
  }),
    [];

  const closeModal = () => {
    props.setIsVisible(false);
    setModalVisible(false);
  };

  const selectVehicle = (item) => {
    // console.log("selectVehicle", item);
    props.selectedVehicle(item);
    closeModal();
  };

  const renderListItem = ({ item }) => (
    <TouchableOpacity onPress={() => selectVehicle(item)}>
      <View style={styles.listItem}>
        <Image
          source={{ uri: item.images[0].url_thumbnail }}
          style={styles.listImage}
          resizeMode="contain"
        />
        <View style={styles.listDetails}>
          <Text style={styles.listTitle}>
            {item.make} {item.model}
          </Text>
          <Text>{item.trim}</Text>
          <Text>Seat Capacity: {item.seats_max}</Text>
          <Text>Type: {item.form_factor}</Text>
          <Text>Range: {item.electric_range} km</Text>
        </View>
      </View>
    </TouchableOpacity>
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
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.isVisible}
      presentationStyle="overFullScreen"
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}>
      <SafeAreaView style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingRight: 10,
            }}>
            <Text
              style={{
                fontWeight: "bold",
                margin: 10,
                fontSize: 20,
                flex: 1,
              }}>
              Select Vehicle
            </Text>
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

          <View
            style={{
              width: "100%",
              paddingHorizontal: 10,
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
            }}>
            <Image
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/rent-an-ev-2fd04.appspot.com/o/Filter.png?alt=media&token=3e419f8e-2907-4c57-b737-719bba229264",
              }}
              resizeMode="contain"
              style={{ width: 20, height: 20, marginRight: 10 }}
            />
            <TextInput
              style={styles.tb}
              placeholder="Enter vehicle make, model, trim, or type"
              value={filter}
              onChangeText={(text) => applyFilter(text)}
              autoCapitalize="none"
            />
          </View>

          <FlatList
            style={styles.flatList}
            data={filter ? filteredVehiclesList : vehiclesList}
            renderItem={(item) => renderListItem(item)}
            key={(item) => {
              item.mal_id;
            }}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default VehicleItemList;

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
});
