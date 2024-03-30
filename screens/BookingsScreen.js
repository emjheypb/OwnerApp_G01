import { SafeAreaView, Text, StyleSheet } from "react-native";

const BookingsScreen = ({ navigation }) => {
  const logout = () => {
    navigation.popToTop();
  };

  return (
    <SafeAreaView>
      <Text>Booking</Text>
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
});
