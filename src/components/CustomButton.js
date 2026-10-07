import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { colors, radius } from "../theme";

//Botón reutilizable!!!!
const CustomButton = ({
  title,
  onPress,
  loading = false,
  variant = "primary",
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === "secondary" && styles.secondaryButton,
        variant === "danger" && styles.dangerButton,
      ]}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === "secondary" ? colors.accent : variant === "danger" ? colors.danger : colors.primaryText}
        />
      ) : (
        <Text
          style={[
            styles.text,
            variant === "secondary" && styles.secondaryText,
            variant === "danger" && styles.dangerText,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 54,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: colors.accent,
  },

  dangerButton: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: colors.danger,
  },

  text: {
    color: colors.primaryText,
    fontSize: 16,
    fontWeight: "800",
  },

  secondaryText: {
    color: colors.accent,
  },

  dangerText: {
    color: colors.danger,
  },
});
