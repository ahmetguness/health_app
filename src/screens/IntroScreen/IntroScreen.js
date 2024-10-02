import React, { useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import CarouselRenderCard from "../../components/cards/CarouselRenderCard";
import { APP_NAME, CAROUSEL_DATA } from "../../data/data";
import { Dimensions, View, Text } from "react-native";
import { styles } from "./styles";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useNavigation } from "@react-navigation/native";

export default function IntroScreen() {
  const navigation = useNavigation();
  const windowDimensions = Dimensions.get("window");

  const carouselWidth = windowDimensions.width;
  const carouselHeight = windowDimensions.height * 0.8;

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View style={styles.root}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Welcome to {APP_NAME}</Text>
      </View>
      <Carousel
        style={[styles.carousel, { height: carouselHeight }]}
        loop={true}
        autoPlay={true}
        autoPlayInterval={5000}
        width={carouselWidth}
        height={carouselHeight}
        data={CAROUSEL_DATA}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={({ item }) => (
          <CarouselRenderCard imagePath={item.imgName} desc={item.desc} />
        )}
      />
      <View style={styles.indicatorContainer}>
        {CAROUSEL_DATA.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicatorDot,
              currentIndex === index && styles.activeIndicatorDot,
            ]}
          />
        ))}
      </View>

      <View
        style={[styles.btnContainer, { height: windowDimensions.height * 0.1 }]}
      >
        <PrimaryButton
          btnName={"Let's get started!"}
          onPress={() => navigation.navigate("InformationScreen")}
        />
      </View>
    </View>
  );
}
