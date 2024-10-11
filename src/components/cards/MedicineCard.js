import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { daysOfWeek } from "../../data/data";
import { useSelector } from "react-redux";

import en from "../../locales/en.json";
import tr from "../../locales/tr.json";

export default function MedicineCard({
  name,
  description,
  dosesPerDay,
  doseTimes,
  selectedDays,
  onDelete,
  onEdit,
}) {
  const lan = useSelector((state) => state.lan.lan);
  const localizedData = lan === "en" ? en : tr;
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
          <Text style={styles.info}>
            {localizedData.dosesPerDay}: {dosesPerDay}
          </Text>
          <Text style={styles.info}>
            {localizedData.times}:{" "}
            {doseTimes.map((time) => time.toLocaleTimeString()).join(", ")}
          </Text>
          <Text style={styles.info}>
            {localizedData.days}:{" "}
            {selectedDays
              .map((day, index) =>
                day ? localizedData[daysOfWeek[index]] : null
              )
              .filter(Boolean)
              .join(", ")}
          </Text>
        </View>
        <TouchableOpacity onPress={onDelete}>
          <Icon name="delete" size={30} color="#DC3545" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onEdit}>
          <Icon name="edit" size={30} color="green" />
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
