import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Calendar } from "react-native-calendars";
import { styles } from "./styles";

export default function HomeScreen() {
  const { width, height } = Dimensions.get("window");

  const [userData, setUserData] = useState({
    name: "",
    age: "",
    weight: "",
    gender: "",
    height: "",
  });

  const loadUserData = async () => {
    try {
      const data = await AsyncStorage.getItem("@user_info");
      if (data !== null) {
        console.log("Veri başarıyla yüklendi:", data);
        setUserData(JSON.parse(data));
      } else {
        console.log("Veri bulunamadı.");
      }
    } catch (error) {
      console.error("Veri yüklenirken hata oluştu:", error);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <View style={styles.root}>
      <View style={[styles.navbar, { height: height * 0.06 }]}>
        <Text style={styles.navbarText}>Hello {userData.name}!</Text>
      </View>
      <View style={styles.calendarContainer}>
        <Calendar style={styles.calendar} />
      </View>
      <View style={styles.managementContainer}>
        <Text style={styles.title}>Management</Text>
        <View style={styles.menuContainer}>{/* {here} */}</View>
      </View>
    </View>
  );
}
