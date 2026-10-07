import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { colors, radius } from "../theme";

//Componente reutilizable INPUTTT
const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  editable = true,
  multiline = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[
          styles.input,
          multiline && styles.multilineInput,
          !editable && styles.disabledInput,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        editable={editable}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
        autoCapitalize="none"
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.muted,
    marginBottom: 7,
  },

  input: {
    width: "100%",
    height: 52,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 16,
    backgroundColor: colors.surfaceAlt,
    color: colors.text,
    fontSize: 15,
  },

  multilineInput: {
    height: 90,
    paddingTop: 14,
  },

  disabledInput: {
    backgroundColor: colors.surface,
    color: colors.muted,
  },
});
