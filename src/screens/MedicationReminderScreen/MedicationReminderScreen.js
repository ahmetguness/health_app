import * as Notifications from "expo-notifications";
import React, { useState, useEffect } from "react";
import {
  View,
  Dimensions,
  Text,
  Modal,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import NavbarContainer from "../../components/navbar/NavbarContainer";
import MedicineCard from "../../components/cards/MedicineCard";
import { Picker } from "@react-native-picker/picker";
import { daysOfWeek } from "../../data/data";
import { styles } from "./styles";
import { useSelector } from "react-redux";
import en from "../../locales/en.json";
import tr from "../../locales/tr.json";

const scheduleMedicationNotification = async (medication, time, day) => {
  const formattedTime = time.toLocaleTimeString();
  const formattedDay = daysOfWeek[day];

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Medication Reminder",
      body: `It's time to take your medication: ${medication.name} on ${formattedDay} at ${formattedTime}.`,
    },
    trigger: {
      hour: time.getHours(),
      minute: time.getMinutes(),
      repeats: true,
      weekday: day + 1,
    },
  });
};

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
  const [editingIndex, setEditingIndex] = useState(null);

  const lan = useSelector((state) => state.lan.lan);
  const localizedData = lan === "en" ? en : tr;

  useEffect(() => {
    const loadMedications = async () => {
      try {
        const storedMedications = await AsyncStorage.getItem("medications");
        if (storedMedications) {
          const parsedMedications = JSON.parse(storedMedications).map((med) => {
            return {
              ...med,
              doseTimes: med.doseTimes.map((time) => new Date(time)),
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

    let updatedMedications;
    if (editingIndex !== null) {
      updatedMedications = [...medications];
      updatedMedications[editingIndex] = newMedication;
    } else {
      updatedMedications = [...medications, newMedication];
    }

    setMedications(updatedMedications);
    await AsyncStorage.setItem(
      "medications",
      JSON.stringify(updatedMedications)
    );

    selectedDays.forEach((isSelected, dayIndex) => {
      if (isSelected) {
        doseTimes.forEach((time) => {
          scheduleMedicationNotification(newMedication, time, dayIndex);
        });
      }
    });

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setMedicationName("");
    setMedicationDescription("");
    setDosesPerDay(1);
    setDoseTimes([]);
    setSelectedDays(new Array(7).fill(false));
    setEditingIndex(null);
  };

  const handleEditMedication = (index) => {
    const medication = medications[index];
    setMedicationName(medication.name);
    setMedicationDescription(medication.description);
    setDosesPerDay(medication.dosesPerDay);
    setDoseTimes(medication.doseTimes);
    setSelectedDays(medication.selectedDays);
    setIsModalVisible(true);
    setEditingIndex(index);
  };

  const handleDeleteMedication = async (index) => {
    const updatedMedications = medications.filter((_, i) => i !== index);
    setMedications(updatedMedications);
    await AsyncStorage.setItem(
      "medications",
      JSON.stringify(updatedMedications)
    );
  };

  const handleTimePick = (event, selectedDate) => {
    const currentDate = selectedDate || selectedTime;
    setShowTimePicker(false);

    if (doseTimes.length < dosesPerDay) {
      setSelectedTime(currentDate);
      setDoseTimes([...doseTimes, currentDate]);
    } else {
      alert(`You can only select ${dosesPerDay} time(s) for this medication.`);
    }
  };

  const toggleDaySelection = (index) => {
    const updatedDays = [...selectedDays];
    updatedDays[index] = !updatedDays[index];
    setSelectedDays(updatedDays);
  };

  return (
    <View style={styles.root}>
      <NavbarContainer
        title={localizedData.medicationReminder}
        style={{ height: height * 0.06 }}
        onPressToAdd={() => setIsModalVisible(true)}
      />

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.title}>{localizedData.medicationReminder}</Text>

            <Text style={styles.label}>{localizedData.medicationName}:</Text>
            <TextInput
              style={styles.input}
              value={medicationName}
              onChangeText={setMedicationName}
              placeholder={localizedData.enterMedicationName}
              placeholderTextColor="#888"
            />

            <Text style={styles.label}>{localizedData.descOptional}:</Text>
            <TextInput
              style={styles.input}
              value={medicationDescription}
              onChangeText={setMedicationDescription}
              placeholder={localizedData.enterDesc}
              placeholderTextColor="#888"
            />

            <Text style={styles.label}>{localizedData.howMnyTmsPerDay}:</Text>
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
              <Text style={styles.label}>
                {localizedData.dysToTakeMedication}:
              </Text>
              {daysOfWeek.map((day, index) => (
                <View key={index} style={styles.dayContainer}>
                  <Text style={styles.dayText}>{localizedData[day]}</Text>
                  <Button
                    title={
                      selectedDays[index]
                        ? localizedData.selected
                        : localizedData.select
                    }
                    onPress={() => toggleDaySelection(index)}
                    color={selectedDays[index] ? "#28A745" : "#007BFF"}
                  />
                </View>
              ))}
            </ScrollView>

            {doseTimes.map((time, index) => (
              <View key={index} style={styles.timeContainer}>
                <SecondaryButton
                  title="Edit Time"
                  onPress={() => {
                    setShowTimePicker(true);
                  }}
                />
                <Text style={styles.timeText}>
                  Selected Time: {time.toLocaleTimeString()}
                </Text>
              </View>
            ))}

            <SecondaryButton
              title={localizedData.selectTime}
              onPress={() => setShowTimePicker(true)}
            />
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
                title={localizedData.save}
                onPress={handleSaveMedication}
              />
              <SecondaryButton
                title={localizedData.close}
                onPress={handleCloseModal}
              />
            </View>
          </ScrollView>
        </View>
      </Modal>

      <ScrollView>
        {medications.map((medication, index) => (
          <View key={index}>
            <MedicineCard
              name={medication.name}
              description={medication.description}
              dosesPerDay={medication.dosesPerDay}
              doseTimes={medication.doseTimes}
              selectedDays={medication.selectedDays}
              onEdit={() => handleEditMedication(index)}
              onDelete={() => handleDeleteMedication(index)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
