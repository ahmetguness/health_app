import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function NavbarContainer({
  title,
  style,
  onPressToAdd,
  showAddIcon = true,
}) {
  const navigation = useNavigation();

  return (
    <View style={[styles.root, style]}>
      <TouchableOpacity
        onPress={() => {
          try {
            navigation.goBack();
          } catch (error) {
            console.error("Error navigating back:", error);
          }
        }}
      >
        <Ionicons name="arrow-back-outline" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.text}>{title}</Text>
      {showAddIcon ? (
        <TouchableOpacity onPress={onPressToAdd}>
          <Ionicons name="add-sharp" size={24} color="white" />
        </TouchableOpacity>
      ) : (
        <Text> </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    backgroundColor: COLORS.carouselBottom,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 15,
    flexDirection: "row",
    paddingHorizontal: "4%",
    marginTop: "2%",
  },
  text: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 20,
  },
});
