// owner@one.com - password
// owner@two.com - password

import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { getUser } from "../controllers/UsersDB";
import { useContext, useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";

const LoginScreen = ({ navigation }) => {
  const toHome = async () => {
    try {
      const user = await getUser(email, password);

      if (user && user.type === "owner") {
        setError(false);
        // alert(`Login successful!`);
        navigation.navigate("Home", {
          user: user,
        });
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError(true);
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  //const { setCurrUser } = useContext(UserContext);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.content, { gap: 10 }]}>
        <Image
          style={{ width: "100%", height: 250 }}
          resizeMode="stretch"
          source={{
            uri: "https://www.dailyfreepsd.com/wp-content/uploads/2014/03/Moving-Car-Animation-Photoshop-PSD.gif",
          }}
        />
        <View style={{ alignItems: "center" }}>
          <Text style={styles.title}>RentEV</Text>
          <Text style={styles.subtitle}>Owner Application</Text>
        </View>
        <TextInput
          style={styles.tb}
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError(false); // Clear error when typing
          }}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.tb}
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError(false); // Clear error when typing
          }}
          autoCapitalize="none"
          secureTextEntry
        />
        {error && ( // Display error text only when error is true
          <Text style={styles.errorStyle}>Invalid Credentials</Text>
        )}
        <TouchableOpacity style={styles.button} onPress={toHome}>
          <Text style={{ fontWeight: "bold", color: "white" }}>L O G I N</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.button} onPress={addUsers}>
        <Text>ADD USERS</Text>
      </TouchableOpacity> */}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 10,
    alignItems: "center",
    height: "100%",
  },
  button: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgb(120, 166, 90)",
    alignItems: "center",
    marginTop: 25,
  },
  tb: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgb(239, 239, 239)",
  },
  errorStyle: {
    color: "rgb(255,0,0)",
    fontWeight: "bold",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  subtitle: {
    fontSize: 12,
    color: "gray",
  },
});
