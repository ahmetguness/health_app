import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../../theme/colors";

export default function MealCard({ mealTime }) {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>{mealTime}</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: COLORS.white,
  },
});
