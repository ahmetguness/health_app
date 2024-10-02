import React, { useState, useCallback } from "react";
import { View, Text, Button, Alert, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./styles";
import {
  ageItems,
  genderItems,
  weightItems,
  heightItems,
} from "../../data/data";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const InputField = ({ label, value, onChange, placeholder }) => (
  <View style={styles.inputField}>
    <Text style={styles.title3}>{label}</Text>
    <TextInput
      style={styles.textInput}
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
    />
  </View>
);

const PickerField = React.memo(
  ({ label, selectedValue, onValueChange, items }) => (
    <View style={styles.inputField}>
      <Text style={styles.title3}>{label}</Text>
      <Picker
        selectedValue={selectedValue}
        style={styles.picker}
        onValueChange={onValueChange}
      >
        {items.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  )
);

export default function InformationScreen() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");

  const handleAgeChange = useCallback((itemValue) => {
    setAge(itemValue);
  }, []);

  const handleWeightChange = useCallback((itemValue) => {
    setWeight(itemValue);
  }, []);

  const handleGenderChange = useCallback((itemValue) => {
    setGender(itemValue);
  }, []);

  const handleHeightChange = useCallback((itemValue) => {
    setHeight(itemValue);
  }, []);

  const saveDataToStorage = async () => {
    try {
      const userInfo = JSON.stringify({
        name: name,
        age: age,
        weight: weight,
        gender: gender,
        height: height,
      });
      await AsyncStorage.setItem("@user_info", userInfo);
      console.log("Veri başarıyla kaydedildi.");
    } catch (error) {
      console.error("Veri kaydedilirken hata oluştu:", error);
    }
  };

  const handleNext = async () => {
    if (
      name === "" ||
      gender === "" ||
      age === "" ||
      weight === "" ||
      height === ""
    ) {
      Alert.alert("Error", "Please fill out all fields.");
    } else {
      console.log({ name, age, weight, gender, height });
      await saveDataToStorage();
      navigation.navigate("HomeScreen");
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.titleContainer}>
        <Text style={styles.title1}>Please</Text>
        <Text style={styles.title2}>Enter the required information</Text>
      </View>
      <View style={styles.inputContainer}>
        <InputField
          label="Name"
          value={name}
          onChange={setName}
          placeholder="Enter your name"
        />
        <PickerField
          label="Age"
          selectedValue={age}
          onValueChange={handleAgeChange}
          items={ageItems}
        />
        <PickerField
          label="Weight"
          selectedValue={weight}
          onValueChange={handleWeightChange}
          items={weightItems}
        />
        <PickerField
          label="Height"
          selectedValue={height}
          onValueChange={handleHeightChange}
          items={heightItems}
        />
        <PickerField
          label="Gender"
          selectedValue={gender}
          onValueChange={handleGenderChange}
          items={genderItems}
        />
      </View>
      <View style={{ marginBottom: "10%" }}>
        <Button title="GO NEXT" onPress={handleNext} />
      </View>
    </View>
  );
}
