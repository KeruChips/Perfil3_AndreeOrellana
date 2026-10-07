import React from "react";

import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import PlanetCard from "../components/PlanetCard";
import CustomButton from "../components/CustomButton";
import { usePlanets } from "../hooks/usePlanets";
import { colors, radius } from "../theme";

const Planets = () => {
  const { planets, loadingPlanets, error, refetch } = usePlanets();

  if (loadingPlanets && planets.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />

        <Text style={styles.loadingText}>Cargando planetas...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={loadingPlanets}
          onRefresh={refetch}
          colors={[colors.primary]}
          tintColor={colors.primary}
        />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>Planetas de Dragon Ball</Text>

        <Text style={styles.subtitle}>
          Datos obtenidos desde la API de Dragon Ball
        </Text>
      </View>

      {error && planets.length === 0 ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>No fue posible cargar los datos</Text>

          <Text style={styles.errorText}>
            Comprueba tu conexión a Internet y vuelve a intentarlo.
          </Text>

          <CustomButton title="Reintentar" onPress={refetch} />
        </View>
      ) : (
        planets.map((planet) => <PlanetCard key={planet.id} planet={planet} />)
      )}
    </ScrollView>
  );
};

export default Planets;

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

  title: {
    fontSize: 27,
    fontWeight: "800",
    color: colors.text,
  },

  subtitle: {
    marginTop: 5,
    fontSize: 14,
    color: colors.muted,
  },

  errorContainer: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.danger,
    alignItems: "center",
  },

  errorTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.danger,
    textAlign: "center",
    marginBottom: 8,
  },

  errorText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.muted,
    textAlign: "center",
    marginBottom: 10,
  },
});
