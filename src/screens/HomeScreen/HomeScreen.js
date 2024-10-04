import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Modal,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Calendar } from "react-native-calendars";
import ManagementCard from "../../components/cards/ManagementCard";
import { styles } from "./styles";
import { daysOfWeek, MANAGEMENT_MENU, monthsOfYear } from "../../data/data";
import { COLORS } from "../../theme/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MealCard from "../../components/cards/MealCard";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { height } = Dimensions.get("window");
  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    weight: "",
    gender: "",
    height: "",
  });

  // Function to load user data from AsyncStorage
  const loadUserData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("@user_info");
      if (storedData) {
        setUserData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  // Load user data when the component is focused
  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [])
  );

  const calculateBMI = useCallback(() => {
    const { weight, height } = userData;
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      return bmi.toFixed(1);
    }
    return "N/A";
  }, [userData]);

  const getBodyType = useCallback(() => {
    const bmi = calculateBMI();
    if (bmi === "N/A") return "Unknown";

    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5) return "Underweight";
    if (bmiValue < 25) return "Normal weight";
    if (bmiValue < 30) return "Overweight";
    if (bmiValue < 35) return "Obese (Class 1)";
    if (bmiValue < 40) return "Obese (Class 2)";
    return "Morbidly obese (Class 3)";
  }, [calculateBMI]);

  const formatSelectedDate = useCallback((dateString) => {
    const selectedDay = new Date(dateString);
    return {
      formatted: `${
        daysOfWeek[selectedDay.getDay()]
      }, ${selectedDay.getDate()} ${
        monthsOfYear[selectedDay.getMonth()]
      } ${selectedDay.getFullYear()}`,
      dayOfWeek: daysOfWeek[selectedDay.getDay()],
    };
  }, []);

  const handleDayPress = useCallback(
    ({ dateString }) => {
      const { formatted, dayOfWeek } = formatSelectedDate(dateString);
      setSelectedDate(dateString);
      setFormattedDate(formatted);
      setDayOfWeek(dayOfWeek);
      setIsModalVisible(true);
    },
    [formatSelectedDate]
  );

  return (
    <View style={styles.root}>
      <View style={[styles.navbar, { height: height * 0.06 }]}>
        <Text style={styles.navbarText}>Hello {userData.name}!</Text>
      </View>

      <View style={styles.calendarContainer}>
        <Calendar
          style={styles.calendar}
          onDayPress={handleDayPress}
          markedDates={{
            [selectedDate]: {
              selected: true,
              marked: true,
              selectedColor: COLORS.carouselBottom,
            },
          }}
        />
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text>{formattedDate}</Text>
          <Button title="Close" onPress={() => setIsModalVisible(false)} />
        </View>
      </Modal>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.managementContainer}>
          <Text style={styles.title}>Management</Text>
          <ScrollView
            style={styles.menuContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.scrollContent, { paddingRight: 45 }]}
          >
            {MANAGEMENT_MENU.map((item, index) => (
              <ManagementCard
                key={index}
                btnName={item.btnName}
                iconName={item.iconName}
                onPress={() => navigation.navigate(item.screenName)}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.informationContainer}>
          <Text style={styles.title}>Personal Information</Text>
          <View style={styles.innerInformationContainer}>
            {[
              {
                icon: "birthday-cake",
                label: `Age: ${userData.age}`,
                Icon: FontAwesome,
              },
              {
                icon: "human-male-height",
                label: `Height: ${userData.height}cm`,
                Icon: MaterialCommunityIcons,
              },
              {
                icon: "weight",
                label: `Weight: ${userData.weight}kg`,
                Icon: FontAwesome5,
              },
              {
                icon: "gender-male-female",
                label: `Gender: ${userData.gender}`,
                Icon: MaterialCommunityIcons,
              },
              {
                icon: "human",
                label: `Body Mass Index: ${calculateBMI()}`,
                Icon: MaterialCommunityIcons,
              },
              {
                icon: "info-circle",
                label: `Body Type: ${getBodyType()}`,
                Icon: FontAwesome,
              },
            ].map(({ icon, label, Icon }, idx) => (
              <View key={idx} style={styles.infoCard}>
                <Icon name={icon} size={24} color="white" />
                <Text style={styles.infoText}>{label}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.mealListContainer}>
          <Text style={styles.title}>Meal List</Text>
          <View style={styles.mealListInnerContainer}>
            <MealCard mealTime={"Breakfast"} />
            <MealCard mealTime={"Lunch"} />
            <MealCard mealTime={"Dinner"} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
