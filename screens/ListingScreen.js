import { SafeAreaView, Text, StyleSheet } from "react-native";

const ListingScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text>Listing</Text>
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
