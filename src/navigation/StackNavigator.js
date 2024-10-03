import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import IntroScreen from "../screens/IntroScreen/IntroScreen";
import InformationScreen from "../screens/InformationScreen/InformationScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import MedicationReminderScreen from "../screens/MedicationReminderScreen/MedicationReminderScreen";
import MealPlanningScreen from "../screens/MealPlanningScreen/MealPlanningScreen";
import DoctorAppointmentReminderScreen from "../screens/DoctorAppointmentReminderScreen/DoctorAppointmentReminderScreen";
import NotesScreen from "../screens/NotesScreen/NotesScreen";

export default function StackNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="IntroScreen" component={IntroScreen} />
      <Stack.Screen name="InformationScreen" component={InformationScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="MedicationReminderScreen"
        component={MedicationReminderScreen}
      />
      <Stack.Screen name="MealPlanningScreen" component={MealPlanningScreen} />
      <Stack.Screen
        name="DoctorAppointmentReminderScreen"
        component={DoctorAppointmentReminderScreen}
      />
      <Stack.Screen name="NotesScreen" component={NotesScreen} />
    </Stack.Navigator>
  );
}
