import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Calendar } from "react-native-calendars";
import ManagementCard from "../../components/cards/ManagementCard";
import { styles } from "./styles";
import { daysOfWeek, MANAGEMENT_MENU, monthsOfYear } from "../../data/data";
import { COLORS } from "../../theme/colors";
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
  const [todayMeals, setTodayMeals] = useState({
    breakfast: "",
    lunch: "",
    dinner: "",
  });
  const [appointments, setAppointments] = useState([]);
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    const getMealsForToday = async () => {
      try {
        const mealsData = await AsyncStorage.getItem("meals");

        if (mealsData !== null) {
          const meals = JSON.parse(mealsData);

          const tdy = new Date();
          const dayOfWeekNumber = tdy.getDay();
          const dayOfWeekName = daysOfWeek[dayOfWeekNumber];

          const mealsForToday = meals[dayOfWeekNumber];

          setTodayMeals({
            breakfast: mealsForToday.breakfast,
            lunch: mealsForToday.lunch,
            dinner: mealsForToday.dinner,
          });
        } else {
          console.log("Yemek verisi bulunamadı.");
        }
      } catch (error) {
        console.error("Async Storage okuma hatası:", error);
      }
    };

    getMealsForToday();
  }, [todayMeals]);

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

  const loadMealsForToday = useCallback(async () => {
    try {
      const storedMeals = await AsyncStorage.getItem("meals");
      if (storedMeals) {
        const allMeals = JSON.parse(storedMeals);
        const todayDay = new Date().getDay();
        if (allMeals[todayDay]) {
          setMeals(allMeals[todayDay]);
        }
      }
    } catch (error) {
      console.error("Error loading meals:", error);
    }
  }, []);

  const loadMealsForDate = useCallback(async (selectedDate) => {
    try {
      const storedMeals = await AsyncStorage.getItem("meals");
      if (storedMeals) {
        const allMeals = JSON.parse(storedMeals);
        const dayOfWeekIndex = new Date(selectedDate).getDay();
        setMeals(
          allMeals[dayOfWeekIndex] || { breakfast: "", lunch: "", dinner: "" }
        );
      }
    } catch (error) {
      console.error("Error loading meals:", error);
    }
  }, [meals]);

  const loadAppointmentsForDate = useCallback(async (selectedDate) => {
    try {
      const storedAppointments = await AsyncStorage.getItem("appointments");
      if (storedAppointments) {
        const allAppointments = JSON.parse(storedAppointments);
        const filteredAppointments = allAppointments.filter(
          (appointment) => appointment.date.split("T")[0] === selectedDate
        );
        setAppointments(filteredAppointments);
      }
    } catch (error) {
      console.error("Error loading appointments:", error);
    }
  }, []);

  const loadMedicationsForDate = useCallback(async (selectedDate) => {
    try {
      const storedMedications = await AsyncStorage.getItem("medications");
      if (storedMedications) {
        const allMedications = JSON.parse(storedMedications);
        const dayOfWeekIndex = new Date(selectedDate).getDay();
        const filteredMedications = allMedications.filter(
          (medication) => medication.selectedDays[dayOfWeekIndex]
        );
        setMedications(filteredMedications);
      }
    } catch (error) {
      console.error("Error loading medications:", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadUserData();
      const todayDayOfWeek = daysOfWeek[new Date().getDay()];
      setDayOfWeek(todayDayOfWeek);
      loadMealsForToday();
    }, [loadMealsForToday])
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
    };
  }, []);

  const handleDayPress = useCallback(
    ({ dateString }) => {
      const { formatted } = formatSelectedDate(dateString);
      setSelectedDate(dateString);
      setFormattedDate(formatted);
      setIsModalVisible(true);

      loadAppointmentsForDate(dateString);
      loadMedicationsForDate(dateString);
      loadMealsForDate(dateString);
    },
    [
      formatSelectedDate,
      loadAppointmentsForDate,
      loadMedicationsForDate,
      loadMealsForDate,
    ]
  );

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
          <Text style={styles.modalText}>{formattedDate}</Text>

          <Text style={styles.sectionTitle}>Meals</Text>
          {meals.breakfast || meals.lunch || meals.dinner ? (
            <View style={{ width: "100%" }}>
              {meals.breakfast && (
                <View style={styles.mealCard}>
                  <Text style={styles.modalText}>
                    Breakfast: {meals.breakfast}
                  </Text>
                </View>
              )}
              {meals.lunch && (
                <View style={styles.mealCard}>
                  <Text style={styles.modalText}>Lunch: {meals.lunch}</Text>
                </View>
              )}
              {meals.dinner && (
                <View style={styles.mealCard}>
                  <Text style={styles.modalText}>Dinner: {meals.dinner}</Text>
                </View>
              )}
            </View>
          ) : (
            <Text style={styles.modalText}>No meals for this date.</Text>
          )}

          <Text style={styles.sectionTitle}>Doctor Appointments</Text>
          {appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <View key={index} style={styles.appointmentCard}>
                <Text style={styles.modalText}>
                  Doctor: {appointment.doctorName}
                </Text>
                <Text style={styles.modalText}>
                  Department: {appointment.department}
                </Text>
                <Text style={styles.modalText}>
                  Hospital: {appointment.hospital}
                </Text>
                <Text style={styles.modalText}>Note: {appointment.note}</Text>
                <Text style={styles.modalText}>
                  Time: {new Date(appointment.time).toLocaleTimeString()}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.modalText}>No appointments for this date.</Text>
          )}

          <Text style={styles.sectionTitle}>Medications</Text>
          {medications.length > 0 ? (
            medications.map((medication, index) => (
              <View key={index} style={styles.medicationCard}>
                <Text style={styles.modalText}>
                  Medication: {medication.name}
                </Text>
                <Text style={styles.modalText}>
                  Description: {medication.description}
                </Text>
                <Text style={styles.modalText}>
                  Doses Per Day: {medication.dosesPerDay}
                </Text>
                <Text style={styles.modalText}>
                  Times: {medication.doseTimes.join(", ")}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.modalText}>No medications for this date.</Text>
          )}

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
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
          <Text style={styles.title}>Today's Food List</Text>
          <View style={styles.mealListInnerContainer}>
            <MealCard mealTime={"Breakfast"} mealPlan={todayMeals.breakfast} />
            <MealCard mealTime={"Lunch"} mealPlan={todayMeals.lunch} />
            <MealCard mealTime={"Dinner"} mealPlan={todayMeals.dinner} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
