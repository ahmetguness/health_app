import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavbarContainer from "../../components/navbar/NavbarContainer";
import { daysOfWeek } from "../../data/data";
import { Picker } from "@react-native-picker/picker";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import { styles } from "./styles";

const MealInput = ({ label, value, onChangeText, onSubmitEditing }) => (
  <>
    <Text style={styles.mealLabel}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder={`Enter ${label.toLowerCase()}`}
      multiline
      numberOfLines={4}
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
    />
  </>
);

const MealPlanningScreen = () => {
  const { height } = Dimensions.get("window");

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
      // Kaydetme başarılı olduğunda alert göster
      Alert.alert("Success", "Meals saved successfully!");
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
    loadMeals();
  }, []);

  return (
    <View style={styles.root}>
      <NavbarContainer
        title="Meal Planning"
        style={{ height: height * 0.06 }}
        showAddIcon={false}
      />

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select a day:</Text>
        <Picker
          selectedValue={selectedDay}
          style={styles.picker}
          onValueChange={setSelectedDay}
        >
          {daysOfWeek.map((day) => (
            <Picker.Item key={day} label={day} value={day} />
          ))}
        </Picker>
      </View>

      <View style={styles.mealContainer}>
        <MealInput
          label="Breakfast"
          value={meals[daysOfWeek.indexOf(selectedDay)].breakfast}
          onChangeText={(text) => handleMealChange("breakfast", text)}
        />
        <MealInput
          label="Lunch"
          value={meals[daysOfWeek.indexOf(selectedDay)].lunch}
          onChangeText={(text) => handleMealChange("lunch", text)}
        />
        <MealInput
          label="Dinner"
          value={meals[daysOfWeek.indexOf(selectedDay)].dinner}
          onChangeText={(text) => handleMealChange("dinner", text)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <SecondaryButton
          title="Save Meal Plan"
          onPress={() => saveMeals(meals)}
          style={{ height: height * 0.05 }}
        />
      </View>
    </View>
  );
};

export default MealPlanningScreen;
