import {
  View,
  Dimensions,
  Text,
  Modal,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import NavbarContainer from "../../components/navbar/NavbarContainer";
import { styles } from "./styles";
import React, { useState, useEffect } from "react";
import { daysOfWeek } from "../../data/data";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import MedicineCard from "../../components/cards/MedicineCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SecondaryButton from "../../components/buttons/SecondaryButton";

export default function MedicationReminderScreen() {
  const { height } = Dimensions.get("window");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [medicationName, setMedicationName] = useState("");
  const [medicationDescription, setMedicationDescription] = useState("");
  const [dosesPerDay, setDosesPerDay] = useState(1);
  const [doseTimes, setDoseTimes] = useState([]);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState(new Array(7).fill(false));

  const [medications, setMedications] = useState([]);

  useEffect(() => {
    const loadMedications = async () => {
      try {
        const storedMedications = await AsyncStorage.getItem("medications");
        if (storedMedications) {
          const parsedMedications = JSON.parse(storedMedications).map((med) => {
            return {
              ...med,
              doseTimes: med.doseTimes.map((time) => new Date(time)), // Convert time strings back to Date objects
            };
          });
          setMedications(parsedMedications);
        }
      } catch (error) {
        console.error("Failed to load medications from AsyncStorage:", error);
      }
    };
    loadMedications();
  }, []);

  const handleAddPress = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setMedicationName("");
    setMedicationDescription("");
    setDosesPerDay(1);
    setDoseTimes([]);
    setSelectedDays(new Array(7).fill(false));
  };

  const handleTimePick = (event, selectedDate) => {
    const currentDate = selectedDate || selectedTime;
    setShowTimePicker(false);

    if (doseTimes.length < dosesPerDay) {
      setSelectedTime(currentDate);
      setDoseTimes([...doseTimes, currentDate]); // Ensure valid Date objects are stored
    } else {
      alert(`You can only select ${dosesPerDay} time(s) for this medication.`);
    }
  };

  const toggleDaySelection = (index) => {
    const updatedDays = [...selectedDays];
    updatedDays[index] = !updatedDays[index];
    setSelectedDays(updatedDays);
  };

  const handleSaveMedication = async () => {
    if (medicationName.trim() === "") {
      alert("Please enter a medication name.");
      return;
    }

    const newMedication = {
      name: medicationName,
      description: medicationDescription,
      dosesPerDay,
      doseTimes,
      selectedDays,
    };

    const updatedMedications = [...medications, newMedication];
    setMedications(updatedMedications);
    await AsyncStorage.setItem(
      "medications",
      JSON.stringify(updatedMedications)
    ); // Save to AsyncStorage
    handleCloseModal();
  };

  const handleDeleteMedication = async (index) => {
    const updatedMedications = medications.filter((_, i) => i !== index);
    setMedications(updatedMedications);
    await AsyncStorage.setItem(
      "medications",
      JSON.stringify(updatedMedications)
    ); // Update AsyncStorage
  };

  return (
    <View style={styles.root}>
      <NavbarContainer
        title={"Medication Reminder"}
        style={{ height: height * 0.06 }}
        onPressToAdd={handleAddPress}
      />
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.title}>Medication Reminder</Text>

          <Text style={styles.label}>Medication Name:</Text>
          <TextInput
            style={styles.input}
            value={medicationName}
            onChangeText={setMedicationName}
            placeholder="Enter medication name"
            placeholderTextColor="#888"
          />

          <Text style={styles.label}>Description (Optional):</Text>
          <TextInput
            style={styles.input}
            value={medicationDescription}
            onChangeText={setMedicationDescription}
            placeholder="Enter description"
            placeholderTextColor="#888"
          />

          <Text style={styles.label}>How Many Times Per Day:</Text>
          <Picker
            selectedValue={dosesPerDay}
            style={styles.picker}
            onValueChange={(itemValue) => setDosesPerDay(itemValue)}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <Picker.Item key={num} label={`${num}`} value={num} />
            ))}
          </Picker>

          <ScrollView>
            <Text style={styles.label}>Days to Take Medication:</Text>
            {daysOfWeek.map((day, index) => (
              <View key={index} style={styles.dayContainer}>
                <Text style={styles.dayText}>{day}</Text>
                <Button
                  title={selectedDays[index] ? "Selected" : "Select"}
                  onPress={() => toggleDaySelection(index)}
                  color={selectedDays[index] ? "#28A745" : "#007BFF"}
                />
              </View>
            ))}
          </ScrollView>

          {doseTimes.map((time, index) => (
            <View
              key={index}
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "3%",
              }}
            >
              <Text style={styles.timeText}>
                Selected Time: {time.toLocaleTimeString()}
              </Text>
            </View>
          ))}

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <SecondaryButton
              title="Select Time"
              onPress={() => setShowTimePicker(true)}
              style={{ height: height * 0.05, width: "100%" }}
            />
          </View>
          {showTimePicker && (
            <DateTimePicker
              value={selectedTime}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleTimePick}
            />
          )}

          <View style={styles.buttonContainer}>
            <SecondaryButton
              title="Save"
              onPress={handleSaveMedication}
              style={{ height: height * 0.05 }}
            />
            <SecondaryButton title="Close" onPress={handleCloseModal} />
          </View>
        </View>
      </Modal>

      <ScrollView>
        {medications.map((medication, index) => (
          <MedicineCard
            key={index}
            name={medication.name}
            description={medication.description}
            dosesPerDay={medication.dosesPerDay}
            doseTimes={medication.doseTimes}
            selectedDays={medication.selectedDays}
            onDelete={() => handleDeleteMedication(index)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
