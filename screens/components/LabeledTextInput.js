import { Text, StyleSheet, TextInput, View } from "react-native";

const LabeledTextInput = (props) => {
  return (
    <View>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        style={styles.inputs}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        autoCapitalize={props.autoCapitalize ? props.autoCapitalize : "none"}
        inputMode={props.inputMode ? props.inputMode : "text"}
      />
    </View>
  );
};

export default LabeledTextInput;

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
  },
  inputs: {
    padding: 10,
    backgroundColor: "rgb(239, 239, 239)",
    borderRadius: 10,
  },
});
