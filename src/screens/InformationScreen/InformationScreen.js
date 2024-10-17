import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Alert, TextInput, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./styles";
import { ageItems, weightItems, heightItems } from "../../data/data";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import { useSelector } from "react-redux";
import en from "../../locales/en.json";
import tr from "../../locales/tr.json";

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
  const [height, setHeight] = useState("");
  const lan = useSelector((state) => state.lan.lan);

  const localizedData = lan === "en" ? en : tr;

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfoString = await AsyncStorage.getItem("@user_info");
        if (userInfoString) {
          const userInfo = JSON.parse(userInfoString);
          setName(userInfo.name || "");
          setAge(userInfo.age || "");
          setWeight(userInfo.weight || "");
          setHeight(userInfo.height || "");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const titleText =
    name === ""
      ? [
          localizedData.please,
          localizedData.enterTheRequiredInformation,
          localizedData.submitInformationButton,
        ]
      : [
          localizedData.updateText1,
          localizedData.updateText2,
          localizedData.saveChangesButton,
        ];

  const handleAgeChange = useCallback((itemValue) => setAge(itemValue), []);
  const handleWeightChange = useCallback(
    (itemValue) => setWeight(itemValue),
    []
  );
  const handleHeightChange = useCallback(
    (itemValue) => setHeight(itemValue),
    []
  );
  const saveDataToStorage = async () => {
    try {
      const userInfo = JSON.stringify({
        name,
        age,
        weight,
        height,
      });
      await AsyncStorage.setItem("@user_info", userInfo);
      console.log("Data saved successfully.");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleNext = async () => {
    if (!name || !age || !weight || !height) {
      Alert.alert("Error", "Please fill out all fields.");
    } else {
      console.log({ name, age, weight, height });
      await saveDataToStorage();
      navigation.navigate("HomeScreen");
    }
  };

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title1}>{titleText[0]}</Text>
          <Text style={styles.title2}>{titleText[1]}</Text>
        </View>
        <View style={styles.inputContainer}>
          <InputField
            label={localizedData.name}
            value={name}
            onChange={setName}
            placeholder="Enter your name"
          />
          <PickerField
            label={localizedData.age}
            selectedValue={age}
            onValueChange={handleAgeChange}
            items={ageItems}
          />
          <PickerField
            label={localizedData.weight}
            selectedValue={weight}
            onValueChange={handleWeightChange}
            items={weightItems}
          />
          <PickerField
            label={localizedData.height}
            selectedValue={height}
            onValueChange={handleHeightChange}
            items={heightItems}
          />
        </View>
        <View
          style={{
            marginBottom: "10%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SecondaryButton
            title={titleText[2]}
            onPress={handleNext}
            style={{ height: 50 }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
