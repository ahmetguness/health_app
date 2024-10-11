import React, { useEffect, useState } from "react";
import { Dimensions, View, Text } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import CarouselRenderCard from "../../components/cards/CarouselRenderCard";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { APP_NAME, CAROUSEL_DATA } from "../../data/data";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import en from "../../locales/en.json";
import tr from "../../locales/tr.json";
import { useSelector } from "react-redux";

const IntroScreen = () => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userData, setUserData] = useState(null);

  const lan = useSelector((state) => state.lan.lan);

  const localizedData = lan === "en" ? en : tr;

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await AsyncStorage.getItem("@user_info");
        if (data) {
          setUserData(JSON.parse(data));
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadUserData();
  }, []);

  const nextPageHandler = () => {
    navigation.navigate(userData ? "HomeScreen" : "InformationScreen");
  };

  return (
    <View style={styles.root}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          {localizedData.welcome} {APP_NAME}
        </Text>
      </View>
      <Carousel
        style={[styles.carousel, { height: height * 0.6 }]}
        loop
        autoPlay
        autoPlayInterval={5000}
        width={width}
        height={height * 0.8}
        data={CAROUSEL_DATA}
        scrollAnimationDuration={1000}
        onSnapToItem={setCurrentIndex}
        renderItem={({ item }) => (
          <CarouselRenderCard
            imagePath={item.imgName}
            desc={localizedData[item.desc]}
          />
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
      <View style={[styles.btnContainer, { height: height * 0.1 }]}>
        <PrimaryButton
          btnName={localizedData.getStartedButton}
          onPress={nextPageHandler}
        />
      </View>
    </View>
  );
};

export default IntroScreen;
