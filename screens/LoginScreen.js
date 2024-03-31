// owner@one.com - password
// owner@two.com - password

import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { UserContext, getUser } from "../controllers/UsersDB";
import { useContext, useState } from "react";

const LoginScreen = ({ navigation }) => {
  const toHome = () => {
    getUser(email, (user) => {
      console.log("toHome", user);
      if (user.type == "owner") {
        setCurrUser(user);
        navigation.navigate("Home");
      }
    });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrUser } = useContext(UserContext);

  return (
    <SafeAreaView style={[styles.content, { gap: 10 }]}>
      <TextInput
        style={styles.tb}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.tb}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={toHome}>
        <Text style={{ fontWeight: "bold" }}>L O G I N</Text>
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
    backgroundColor: "rgb(226, 238, 254)",
    alignItems: "center",
  },
  tb: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgb(239, 239, 239)",
  },
});
