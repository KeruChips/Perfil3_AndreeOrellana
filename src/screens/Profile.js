import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";

import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";

import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { colors, radius } from "../theme";

const Profile = () => {
  const { user, logout } = useAuth();

  const { profile, loadingProfile, savingProfile, updateField, saveProfile } =
    useProfile(user);

  const [editing, setEditing] = useState(false);

  if (loadingProfile) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />

        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

  const handleSave = async () => {
    const saved = await saveProfile();

    if (saved) {
      setEditing(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi perfil</Text>

        <Text style={styles.headerSubtitle}>
          Administra tu información personal
        </Text>
      </View>

      <View style={styles.profileCard}>
        {profile.imageUrl ? (
          <Image
            source={{
              uri: profile.imageUrl,
            }}
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>
              {profile.nombreCompleto
                ? profile.nombreCompleto.charAt(0).toUpperCase()
                : "?"}
            </Text>
          </View>
        )}

        <Text style={styles.profileName}>
          {profile.nombreCompleto || "Usuario"}
        </Text>

        <Text style={styles.profileEmail}>{profile.email || user?.email}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Datos personales</Text>

        {editing ? (
          <>
            <InputField
              label="Nombre completo"
              value={profile.nombreCompleto}
              onChangeText={(value) => updateField("nombreCompleto", value)}
            />

            <InputField
              label="Fecha de nacimiento"
              value={profile.fechaNacimiento}
              onChangeText={(value) => updateField("fechaNacimiento", value)}
              placeholder="DD/MM/AAAA"
            />

            <InputField
              label="Carnet institucional"
              value={profile.carnet}
              onChangeText={(value) => updateField("carnet", value)}
            />

            <InputField
              label="URL de imagen"
              value={profile.imageUrl}
              onChangeText={(value) => updateField("imageUrl", value)}
              keyboardType="url"
            />

            <CustomButton
              title="Guardar cambios"
              onPress={handleSave}
              loading={savingProfile}
            />

            <CustomButton
              title="Cancelar"
              onPress={() => setEditing(false)}
              variant="secondary"
            />
          </>
        ) : (
          <>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Nombre completo</Text>

              <Text style={styles.infoValue}>{profile.nombreCompleto}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Fecha de nacimiento</Text>

              <Text style={styles.infoValue}>{profile.fechaNacimiento}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Carnet institucional</Text>

              <Text style={styles.infoValue}>{profile.carnet}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Correo electrónico</Text>

              <Text style={styles.infoValue}>
                {profile.email || user?.email}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>URL de imagen</Text>

              <Text style={styles.urlValue} numberOfLines={3}>
                {profile.imageUrl}
              </Text>
            </View>

            <CustomButton
              title="Modificar perfil"
              onPress={() => setEditing(true)}
            />
          </>
        )}
      </View>

      {!editing && (
        <CustomButton title="Cerrar sesión" onPress={logout} variant="danger" />
      )}
    </ScrollView>
  );
};

export default Profile;

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
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.text,
  },

  headerSubtitle: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 4,
  },

  profileCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },

  profileImage: {
    width: 108,
    height: 108,
    borderRadius: 8,
    marginBottom: 14,
  },

  imagePlaceholder: {
    width: 108,
    height: 108,
    borderRadius: 8,
    backgroundColor: colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  placeholderText: {
    fontSize: 40,
    fontWeight: "800",
    color: colors.primary,
  },

  profileName: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.text,
    textAlign: "center",
  },

  profileEmail: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 4,
  },

  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 18,
  },

  infoRow: {
    paddingVertical: 5,
  },

  infoLabel: {
    fontSize: 12,
    color: colors.muted,
    marginBottom: 5,
  },

  infoValue: {
    fontSize: 15,
    color: colors.text,
    fontWeight: "600",
  },

  urlValue: {
    fontSize: 14,
    color: colors.muted,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 14,
  },
});
