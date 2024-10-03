import { Text, StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS } from "../../theme/colors";

export default function ManagementCard({ btnName, icon }) {
  return (
    <TouchableOpacity style={styles.root}>
      {icon}
      <Text style={styles.text}>{btnName}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 100,
    height: 100,
    marginHorizontal: "1%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.carouselBottom,
  },
  half: {
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 12,
    textAlign: "center",
    color: COLORS.white,
  },
});
