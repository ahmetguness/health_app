import { Text, StyleSheet, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS } from "../../theme/colors";
import Icon from "react-native-vector-icons/FontAwesome";

export default function ManagementCard({ btnName, iconName, onPress }) {
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon name={iconName} size={24} color={COLORS.white} />
      </View>
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
  iconContainer: {
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    textAlign: "center",
    color: COLORS.white,
  },
});
