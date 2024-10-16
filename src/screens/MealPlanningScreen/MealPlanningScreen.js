import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, Dimensions, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavbarContainer from "../../components/navbar/NavbarContainer";
import { daysOfWeek } from "../../data/data";
import { Picker } from "@react-native-picker/picker";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import { styles } from "./styles";
import en from "../../locales/en.json";
import tr from "../../locales/tr.json";
import { useDispatch, useSelector } from "react-redux";
import { triggerRefresh } from "../../redux/slices/RefreshSlice";

const MealInput = ({ label, value, onChangeText, onSubmitEditing, lan }) => (
  <>
    <Text style={styles.mealLabel}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder={
        lan === "en"
          ? `Enter ${label.toLowerCase()}`
          : `${label.toLowerCase()} Giriniz`
      }
      multiline
      numberOfLines={4}
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
    />
  </>
);

const MealPlanningScreen = () => {
  const lan = useSelector((state) => state.lan.lan);
  const localizedData = lan === "en" ? en : tr;
  const { height } = Dimensions.get("window");
  const dispatch = useDispatch();

  const localizedDaysOfWeek = daysOfWeek.map((day) => localizedData[day]);

  const [selectedDay, setSelectedDay] = useState(daysOfWeek[0]);
  const [meals, setMeals] = useState(
    daysOfWeek.map(() => ({
      breakfast: "",
      lunch: "",
      dinner: "",
    }))
  );

  const loadMeals = async () => {
    try {
      const storedMeals = await AsyncStorage.getItem("meals");
      if (storedMeals) {
        setMeals(JSON.parse(storedMeals));
      }
    } catch (error) {
      console.error("Failed to load meals:", error);
    }
  };

  const saveMeals = async (mealData) => {
    try {
      await AsyncStorage.setItem("meals", JSON.stringify(mealData));
      Alert.alert("Success", "Meals saved successfully!");

      dispatch(triggerRefresh());
    } catch (error) {
      console.error("Failed to save meals:", error);
    }
  };

  const handleMealChange = useCallback(
    (mealType, value) => {
      const dayIndex = daysOfWeek.indexOf(selectedDay);
      setMeals((prevMeals) => {
        const updatedMeals = [...prevMeals];
        updatedMeals[dayIndex][mealType] = value;
        return updatedMeals;
      });
    },
    [selectedDay]
  );

  useEffect(() => {
    const today = new Date().getDay();
    setSelectedDay(daysOfWeek[today]);
    loadMeals();
  }, []);

  return (
    <View style={styles.root}>
      <NavbarContainer
        title={localizedData.mealPlanning}
        style={{ height: height * 0.06 }}
        showAddIcon={false}
      />

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>{localizedData.selectADay}:</Text>
        <Picker
          selectedValue={selectedDay}
          style={styles.picker}
          onValueChange={setSelectedDay}
        >
          {daysOfWeek.map((day, index) => (
            <Picker.Item
              key={day}
              label={localizedDaysOfWeek[index]}
              value={day}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.mealContainer}>
        <MealInput
          lan={lan}
          label={localizedData.breakfast}
          value={meals[daysOfWeek.indexOf(selectedDay)].breakfast}
          onChangeText={(text) => handleMealChange("breakfast", text)}
        />
        <MealInput
          lan={lan}
          label={localizedData.lunch}
          value={meals[daysOfWeek.indexOf(selectedDay)].lunch}
          onChangeText={(text) => handleMealChange("lunch", text)}
        />
        <MealInput
          lan={lan}
          label={localizedData.dinner}
          value={meals[daysOfWeek.indexOf(selectedDay)].dinner}
          onChangeText={(text) => handleMealChange("dinner", text)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <SecondaryButton
          title={localizedData.saveMealPlanButton}
          onPress={() => saveMeals(meals)}
          style={{ height: height * 0.05 }}
        />
      </View>
    </View>
  );
};

export default MealPlanningScreen;
