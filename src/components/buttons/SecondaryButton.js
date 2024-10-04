import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../../theme/colors";

export default function SecondaryButton({ title, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.root, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.carouselBottom,
    width: "35%",
    borderRadius: 15,
  },
  text: {
    color: COLORS.white,
  },
});
