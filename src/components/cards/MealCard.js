import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../../theme/colors";

export default function MealCard({ mealTime, mealPlan }) {
  return (
    <View style={styles.root}>
      <Text style={styles.mealTime}>{mealTime}</Text>
      <View style={{ padding: "4%" }}>
        <Text style={styles.text}>{mealPlan}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "32%",
    height: 200,
    backgroundColor: COLORS.carouselBottom,
    borderRadius: 15,
    marginTop: "3%",
    alignItems: "center",
  },
  mealTime: {
    color: COLORS.white,
    marginTop: "4%",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  text: {
    fontSize: 13,
    marginTop: "4%",
  },
});
