import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";

import { useAuth } from "../hooks/useAuth";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { colors, radius } from "../theme";

const Login = ({ navigation }) => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.form}>
          <Text style={styles.title}>Iniciar sesión</Text>

          <Text style={styles.subtitle}>
            Ingresa tus credenciales para continuar
          </Text>

          <InputField
            label="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            placeholder="micorreo@ejemplo.com"
            keyboardType="email-address"
          />

          <InputField
            label="Contraseña"
            value={password}
            onChangeText={setPassword}
            placeholder="Contraseña"
            secureTextEntry
          />

          <CustomButton
            title="Iniciar sesión"
            onPress={() => login(email, password)}
          />

          <Text
            style={styles.registerText}
            onPress={() => navigation.navigate("Register")}
          >
            ¿No tienes una cuenta?{" "}
            <Text style={styles.registerLink}>Regístrate</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 8,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    color: colors.muted,
    textAlign: "center",
    marginBottom: 24,
  },

  form: {
    width: "100%",
    backgroundColor: colors.surface,
    padding: 24,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },

  registerText: {
    textAlign: "center",
    color: colors.muted,
    fontSize: 14,
    marginTop: 22,
  },

  registerLink: {
    color: colors.primary,
    fontWeight: "800",
  },
});
