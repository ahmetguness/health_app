import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { daysOfWeek } from "../../data/data";

export default function MedicineCard({
  name,
  description,
  dosesPerDay,
  doseTimes,
  selectedDays,
  onDelete,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
          <Text style={styles.info}>Doses per Day: {dosesPerDay}</Text>
          <Text style={styles.info}>
            Times:{" "}
            {doseTimes.map((time) => time.toLocaleTimeString()).join(", ")}
          </Text>
          <Text style={styles.info}>
            Days:{" "}
            {selectedDays
              .map((day, index) => (day ? daysOfWeek[index] : null))
              .filter(Boolean)
              .join(", ")}
          </Text>
        </View>
        <TouchableOpacity onPress={onDelete}>
          <Icon name="delete" size={30} color="#DC3545" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontStyle: "italic",
    color: "#666",
  },
  info: {
    color: "#333",
  },
});
