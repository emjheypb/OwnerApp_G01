// owner@one.com - password
// owner@two.com - password

import { SafeAreaView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { addUsers } from "../controllers/UsersDB";

const LoginScreen = ({ navigation }) => {
  const toHome = () => {
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.content}>
      <Text>Username</Text>
      <Text>Password</Text>
      <TouchableOpacity style={styles.button} onPress={toHome}>
        <Text>L O G I N</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.button} onPress={addUsers}>
        <Text>ADD USERS</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  content: {
    margin: 10,
    alignItems: "center",
  },
  button: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "lightblue",
    alignItems: "center",
  },
});
