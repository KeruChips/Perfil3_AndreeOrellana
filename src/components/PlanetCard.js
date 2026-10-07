import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors, radius } from "../theme";

const PlanetCard = ({ planet }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: planet.image }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{planet.name}</Text>

          <View
            style={[
              styles.statusBadge,
              planet.isDestroyed ? styles.destroyedBadge : styles.activeBadge,
            ]}
          >
            <Text style={styles.statusText}>
              {planet.isDestroyed ? "Destruido" : "Activo"}
            </Text>
          </View>
        </View>

        <Text style={styles.description}>{planet.description}</Text>
      </View>
    </View>
  );
};

export default PlanetCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    marginBottom: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
  },

  image: {
    width: "100%",
    height: 210,
    backgroundColor: colors.surfaceAlt,
  },

  content: {
    padding: 18,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 10,
  },

  title: {
    flex: 1,
    fontSize: 21,
    fontWeight: "800",
    color: colors.text,
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radius.pill,
    borderWidth: 1,
  },

  activeBadge: {
    backgroundColor: "#E8F5E9",
    borderColor: colors.success,
  },

  destroyedBadge: {
    backgroundColor: "#FDECEA",
    borderColor: colors.danger,
  },

  statusText: {
    fontSize: 11,
    fontWeight: "800",
    color: colors.text,
  },

  description: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.muted,
  },
});
