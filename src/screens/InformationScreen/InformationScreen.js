import React, { useState, useCallback } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./styles";
import { ageItems, genderItems, weightItems } from "../../data/data";
import { useNavigation } from "@react-navigation/native";

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

  const handleAgeChange = useCallback((itemValue) => {
    setAge(itemValue);
  }, []);

  const handleWeightChange = useCallback((itemValue) => {
    setWeight(itemValue);
  }, []);

  const handleGenderChange = useCallback((itemValue) => {
    setGender(itemValue);
  }, []);

  const handleNext = () => {
    if (name === "" || gender === "" || name === "" || weight === "") {
      console.log("boşş");
    } else {
      console.log({ name, age, weight, gender });
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
