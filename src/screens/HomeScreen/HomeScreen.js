import React, { useState, useCallback, useEffect } from "react";
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
// import  from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MealCard from "../../components/cards/MealCard";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";


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
  const [meals, setMeals] = useState({
    breakfast: "",
    lunch: "",
    dinner: "",
  });

  // Kullanıcının bilgilerini yüklüyoruz
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

  // Bugünkü günün yemek planını yüklüyoruz (ilk açılışta)
  const loadMealsForToday = useCallback(async () => {
    try {
      const storedMeals = await AsyncStorage.getItem("meals");
      if (storedMeals) {
        const allMeals = JSON.parse(storedMeals);
        const todayDay = new Date().getDay(); // Bugünün günü (0 = Pazar, 6 = Cumartesi)
        if (allMeals[todayDay]) {
          setMeals(allMeals[todayDay]);
        }
      }
    } catch (error) {
      console.error("Error loading meals:", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadUserData();
      const todayDayOfWeek = daysOfWeek[new Date().getDay()];
      setDayOfWeek(todayDayOfWeek); // Bugünün gününü ayarla
      loadMealsForToday(); // Sadece bugünün yemek planını göster
    }, [loadMealsForToday])
  );

  // BMI hesaplama
  const calculateBMI = useCallback(() => {
    const { weight, height } = userData;
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      return bmi.toFixed(1);
    }
    return "N/A";
  }, [userData]);

  // Vücut tipi hesaplama
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

  // Seçilen tarihi formatlama
  const formatSelectedDate = useCallback((dateString) => {
    const selectedDay = new Date(dateString);
    return {
      formatted: `${
        daysOfWeek[selectedDay.getDay()]
      }, ${selectedDay.getDate()} ${
        monthsOfYear[selectedDay.getMonth()]
      } ${selectedDay.getFullYear()}`,
    };
  }, []);

  // Takvimde tıklanan tarihi göster, meal listi etkileme
  const handleDayPress = useCallback(
    ({ dateString }) => {
      const { formatted } = formatSelectedDate(dateString);
      setSelectedDate(dateString); // Tıklanan tarihi ayarla
      setFormattedDate(formatted); // Formatlı tarih modalda gösterilecek
      setIsModalVisible(true); // Modalı aç
    },
    [formatSelectedDate]
  );

  // Icon componentini getir
  const getIconComponent = (iconType) => {
    switch (iconType) {
      case "FontAwesome":
        return FontAwesome;
      case "MaterialCommunityIcons":
        return MaterialCommunityIcons;
      case "FontAwesome5":
        return FontAwesome5;
      default:
        return FontAwesome;
    }
  };

  return (
    <View style={styles.root}>
      <View style={[styles.navbar, { height: height * 0.06 }]}>
        <Text style={styles.navbarText}>Hello {userData.name}!</Text>
      </View>

      <View style={styles.calendarContainer}>
        <Calendar
          style={styles.calendar}
          onDayPress={handleDayPress} // Takvimde tıklama işlemi
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
            {MANAGEMENT_MENU.map((item, index) => {
              const IconComponent = getIconComponent(item.iconType);
              return (
                <ManagementCard
                  key={index}
                  btnName={item.btnName}
                  iconName={item.iconName}
                  onPress={() => navigation.navigate(item.screenName)}
                  IconComponent={IconComponent}
                />
              );
            })}
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
            <MealCard mealTime={"Breakfast"} mealPlan={meals.breakfast} />
            <MealCard mealTime={"Lunch"} mealPlan={meals.lunch} />
            <MealCard mealTime={"Dinner"} mealPlan={meals.dinner} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
