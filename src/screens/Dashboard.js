import React from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { useAuth } from "../hooks/useAuth";
import { useUsers } from "../hooks/useUsers";

import CustomButton from "../components/CustomButton";
import { colors, radius } from "../theme";

const Dashboard = ({ navigation }) => {
  const { user, logout } = useAuth();

  const { users, loadingUsers } = useUsers();

  if (loadingUsers) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />

        <Text style={styles.loadingText}>Cargando usuarios...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Dashboard</Text>

          <Text style={styles.headerSubtitle}>
            Usuarios registrados en la aplicación
          </Text>
        </View>
      </View>

      <View style={styles.countContainer}>
        <Text style={styles.countText}>
          Usuarios registrados: {users.length}
        </Text>
      </View>

      {users.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No hay usuarios registrados</Text>

          <Text style={styles.emptyText}>
            Los usuarios registrados aparecerán aquí.
          </Text>
        </View>
      ) : (
        users.map((item) => (
          <View key={item.id} style={styles.userCard}>
            <View style={styles.userHeader}>
              {item.imageUrl ? (
                <Image
                  source={{
                    uri: item.imageUrl,
                  }}
                  style={styles.userImage}
                />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.placeholderText}>
                    {item.nombreCompleto
                      ? item.nombreCompleto.charAt(0).toUpperCase()
                      : "?"}
                  </Text>
                </View>
              )}

              <View style={styles.userMainInfo}>
                <Text style={styles.userName} numberOfLines={2}>
                  {item.nombreCompleto || "Sin nombre"}
                </Text>

                <Text style={styles.userCarnet}>
                  Carnet: {item.carnet || "No registrado"}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Correo</Text>

              <Text style={styles.infoValue} numberOfLines={2}>
                {item.email || "No registrado"}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Fecha de nacimiento</Text>

              <Text style={styles.infoValue}>
                {item.fechaNacimiento || "No registrada"}
              </Text>
            </View>
          </View>
        ))
      )}
      <View style={styles.actions}>
        <CustomButton
          title="Mi perfil"
          onPress={() => navigation.navigate("Profile")}
        />

        <CustomButton
          title="Ver planetas de Dragon Ball"
          onPress={() => navigation.navigate("Planets")}
        />

        <CustomButton title="Cerrar sesión" onPress={logout} variant="danger" />
      </View>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: 20,
    paddingBottom: 35,
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },

  loadingText: {
    marginTop: 12,
    color: colors.muted,
    fontSize: 14,
  },

  header: {
    marginBottom: 18,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.text,
  },

  headerSubtitle: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 5,
  },

  actions: {
    marginTop: 8,
    marginBottom: 18,
  },

  countContainer: {
    backgroundColor: "#E3F2FD",
    borderRadius: radius.pill,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.accent,
  },

  countText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "700",
  },

  userCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },

  userHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  userImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 14,
  },

  imagePlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  placeholderText: {
    fontSize: 25,
    fontWeight: "800",
    color: colors.primary,
  },

  userMainInfo: {
    flex: 1,
  },

  userName: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 5,
  },

  userCarnet: {
    fontSize: 13,
    color: colors.muted,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 15,
  },

  infoRow: {
    marginBottom: 11,
  },

  infoLabel: {
    fontSize: 12,
    color: colors.muted,
    marginBottom: 3,
  },

  infoValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "600",
  },

  emptyContainer: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 6,
  },

  emptyText: {
    fontSize: 14,
    color: colors.muted,
    textAlign: "center",
  },
});
