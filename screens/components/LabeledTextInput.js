import { Text, StyleSheet, TextInput, View } from "react-native";

const LabeledTextInput = (props) => {
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        {props.isMandatory ? (
          <Text style={{ color: "red", fontWeight: "bold" }}>* </Text>
        ) : (
          <Text></Text>
        )}
        <Text style={styles.label}>{props.label}</Text>
      </View>
      <TextInput
        style={[
          styles.inputs,
          { backgroundColor: props.isError ? "pink" : "rgb(239, 239, 239)" },
        ]}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        autoCapitalize={props.autoCapitalize ? props.autoCapitalize : "none"}
        inputMode={props.inputMode ? props.inputMode : "text"}
        editable={!props.disabled}
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
    borderRadius: 10,
  },
});
