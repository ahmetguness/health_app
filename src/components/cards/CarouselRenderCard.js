import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../theme/colors";

const images = {
  food: require("../../assets/carousel_images/food.png"),
  pill: require("../../assets/carousel_images/pill.png"),
  sport: require("../../assets/carousel_images/sport.png"),
};

export default function CarouselRenderCard({ imagePath, desc }) {
  return (
    <LinearGradient
      colors={[COLORS.carouselTop, COLORS.carouselBottom]}
      style={styles.cardContainer}
    >
      <Image source={images[imagePath]} style={styles.image} />
      <Text style={styles.description}>{desc}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    padding: 20,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 20,
    marginBottom: 10,
    resizeMode: "contain",
  },
  description: {
    textAlign: "center",
    fontSize: 18,
    color: "#2F4F4F",
    fontWeight: "600",
    paddingHorizontal: 5,
    marginTop: 20,
  },
});
