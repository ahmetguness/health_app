import React, { useEffect, useState } from "react";
import { Dimensions, View, Text, ActivityIndicator } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import CarouselRenderCard from "../../components/cards/CarouselRenderCard";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { APP_NAME, CAROUSEL_DATA } from "../../data/data";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import en from "../../locales/en.json";
import tr from "../../locales/tr.json";
import { useDispatch, useSelector } from "react-redux";
import { updateLan } from "../../redux/slices/LanSlice";

const IntroScreen = () => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatcher = useDispatch();

  useEffect(() => {
    const loadLan = async () => {
      try {
        const storedLan = await AsyncStorage.getItem("@lan");
        if (storedLan) {
          dispatcher(updateLan(storedLan));
        } else {
          dispatcher(updateLan("en"));
        }
      } catch (error) {
        console.error("Error loading lan:", error);
        dispatcher(updateLan("en"));
      } finally {
        setLoading(false);
      }
    };

    loadLan();
  }, [dispatcher]);

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
        console.error("Error loading user data:", error);
      }
    };

    loadUserData();
  }, []);

  const nextPageHandler = () => {
    navigation.navigate(userData ? "HomeScreen" : "InformationScreen");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
