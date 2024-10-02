import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../theme/colors";

export default function PrimaryButton({
  btnName,
  onPress,
  containerStyle,
  textStyle,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.root, containerStyle]}
    >
      <Text style={[styles.text, textStyle]}>{btnName}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 220,
    backgroundColor: COLORS.carouselBottom,
    borderRadius: 15,
  },
  text: {
    fontSize: 19,
    fontWeight: "700",
    color: COLORS.black,
  },
});
