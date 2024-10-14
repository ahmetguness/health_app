import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import NavbarContainer from "../../components/navbar/NavbarContainer";
import { styles } from "./styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import en from "../../locales/en.json";
import tr from "../../locales/tr.json";
import { useSelector } from "react-redux";

export default function DoctorAppointmentReminderScreen() {
  const { height } = Dimensions.get("window");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [department, setDepartment] = useState("");
  const [hospital, setHospital] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [note, setNote] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [daysBeforeNotification, setDaysBeforeNotification] = useState(1);
  const lan = useSelector((state) => state.lan.lan);

  const localizedData = lan === "en" ? en : tr;

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const storedAppointments = await AsyncStorage.getItem("appointments");
        if (storedAppointments) {
          const parsedAppointments = JSON.parse(storedAppointments).map(
            (appointment) => ({
              ...appointment,
              date: new Date(appointment.date),
              time: new Date(appointment.time),
            })
          );
          setAppointments(parsedAppointments);
        }
      } catch (error) {
        console.error("Failed to load appointments from AsyncStorage:", error);
      }
    };
    loadAppointments();
  }, []);

  const handleAddPress = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setDepartment("");
    setHospital("");
    setDoctorName("");
    setNote("");
    setSelectedDate(new Date());
    setSelectedTime(new Date());
    setDaysBeforeNotification(1);
    setEditingIndex(null);
  };

  const handleDatePick = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  const handleTimePick = (event, selectedTime) => {
    const currentTime = selectedTime || new Date();
    setShowTimePicker(false);
    setSelectedTime(currentTime);
  };

  const handleSaveAppointment = async () => {
    if (
      department.trim() === "" ||
      hospital.trim() === "" ||
      doctorName.trim() === ""
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const newAppointment = {
      department,
      hospital,
      doctorName,
      note,
      date: selectedDate,
      time: selectedTime,
      daysBeforeNotification,
    };

    let updatedAppointments;
    if (editingIndex !== null) {
      updatedAppointments = [...appointments];
      updatedAppointments[editingIndex] = newAppointment;
    } else {
      updatedAppointments = [...appointments, newAppointment];
    }

    setAppointments(updatedAppointments);
    await AsyncStorage.setItem(
      "appointments",
      JSON.stringify(updatedAppointments)
    );
    handleCloseModal();
  };

  const handleDeleteAppointment = async (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
    await AsyncStorage.setItem(
      "appointments",
      JSON.stringify(updatedAppointments)
    );
  };

  const handleEditAppointment = (index) => {
    const appointment = appointments[index];
    setDepartment(appointment.department);
    setHospital(appointment.hospital);
    setDoctorName(appointment.doctorName);
    setNote(appointment.note);
    setSelectedDate(appointment.date);
    setSelectedTime(appointment.time);
    setDaysBeforeNotification(appointment.daysBeforeNotification || 1);
    setIsModalVisible(true);
    setEditingIndex(index);
  };

  return (
    <View style={styles.root}>
      <NavbarContainer
        title={localizedData.doctorAppointmentReminder}
        style={{ height: height * 0.06 }}
        onPressToAdd={handleAddPress}
      />
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.title}>
              {localizedData.doctorAppointmentReminder}
            </Text>

            <Text style={styles.label}>{localizedData.department}:</Text>
            <TextInput
              style={styles.input}
              value={department}
              onChangeText={setDepartment}
              placeholder={localizedData.enterDep}
              placeholderTextColor="#888"
            />

            <Text style={styles.label}>{localizedData.hospital}:</Text>
            <TextInput
              style={styles.input}
              value={hospital}
              onChangeText={setHospital}
              placeholder={localizedData.enterHosp}
              placeholderTextColor="#888"
            />

            <Text style={styles.label}>{localizedData.doctorName}:</Text>
            <TextInput
              style={styles.input}
              value={doctorName}
              onChangeText={setDoctorName}
              placeholder={localizedData.enterDocName}
              placeholderTextColor="#888"
            />

            <Text style={styles.label}>{localizedData.noteOptional}:</Text>
            <TextInput
              style={styles.input}
              value={note}
              onChangeText={setNote}
              placeholder={localizedData.enterNote}
              placeholderTextColor="#888"
            />

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <SecondaryButton
                title={localizedData.selectDate}
                onPress={() => setShowDatePicker(true)}
                style={{ height: height * 0.05, width: "100%" }}
              />
              <Text style={styles.timeText}>
                {localizedData.selectedDate}:{" "}
                {selectedDate.toLocaleDateString()}
              </Text>
            </View>
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={handleDatePick}
              />
            )}

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <SecondaryButton
                title={localizedData.selectTime}
                onPress={() => setShowTimePicker(true)}
                style={{ height: height * 0.05, width: "100%" }}
              />
              <Text style={styles.timeText}>
                {localizedData.selectedTime}:{" "}
                {selectedTime.toLocaleTimeString()}
              </Text>
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

            <Text style={styles.label}>{localizedData.notifyMeBeforedys}:</Text>
            <Picker
              selectedValue={daysBeforeNotification}
              onValueChange={(itemValue) =>
                setDaysBeforeNotification(itemValue)
              }
              style={styles.picker}
            >
              <Picker.Item label={`1 ${localizedData.day}`} value={1} />
              <Picker.Item label={`2 ${localizedData.day}`} value={2} />
              <Picker.Item label={`3 ${localizedData.day}`} value={3} />
              <Picker.Item label={`4 ${localizedData.day}`} value={4} />
              <Picker.Item label={`5 ${localizedData.day}`} value={5} />
              <Picker.Item label={`6 ${localizedData.day}`} value={6} />
              <Picker.Item label={`7 ${localizedData.day}`} value={7} />
            </Picker>

            <View style={styles.buttonContainer}>
              <SecondaryButton
                title={localizedData.save}
                onPress={handleSaveAppointment}
                style={{ height: height * 0.05 }}
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
        {appointments.map((appointment, index) => (
          <View key={index} style={styles.card}>
            <View>
              <Text style={styles.cardText}>
                {localizedData.department}: {appointment.department}
              </Text>
              <Text style={styles.cardText}>
                {localizedData.hospital}: {appointment.hospital}
              </Text>
              <Text style={styles.cardText}>
                {localizedData.doctorName}: {appointment.doctorName}
              </Text>
              <Text style={styles.cardText}>
                {localizedData.note}: {appointment.note || "No note"}
              </Text>
              <Text style={styles.cardText}>
                {localizedData.date}: {appointment.date.toLocaleDateString()}
              </Text>
              <Text style={styles.cardText}>
                {localizedData.time}: {appointment.time.toLocaleTimeString()}
              </Text>
              <Text style={styles.cardText}>
                {localizedData.notify}: {appointment.daysBeforeNotification}{" "}
                {localizedData.daysBefore}
              </Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => handleEditAppointment(index)}>
                <MaterialIcons
                  name="edit"
                  size={24}
                  color="blue"
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteAppointment(index)}>
                <MaterialIcons
                  name="delete"
                  size={24}
                  color="red"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
