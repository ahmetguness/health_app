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
import { Picker } from "@react-native-picker/picker"; // Import Picker
import SecondaryButton from "../../components/buttons/SecondaryButton";
import NavbarContainer from "../../components/navbar/NavbarContainer";
import { styles } from "./styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";

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
  const [daysBeforeNotification, setDaysBeforeNotification] = useState(1); // New state

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
    setDaysBeforeNotification(1); // Reset the picker
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
      daysBeforeNotification, // Include the selected notification days
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
    setDaysBeforeNotification(appointment.daysBeforeNotification || 1); // Set the picker value
    setIsModalVisible(true);
    setEditingIndex(index);
  };

  return (
    <View style={styles.root}>
      <NavbarContainer
        title={"Doctor Appointment Reminder"}
        style={{ height: height * 0.06 }}
        onPressToAdd={handleAddPress}
      />
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.title}>Doctor Appointment Reminder</Text>

          <Text style={styles.label}>Department:</Text>
          <TextInput
            style={styles.input}
            value={department}
            onChangeText={setDepartment}
            placeholder="Enter department"
            placeholderTextColor="#888"
          />

          <Text style={styles.label}>Hospital:</Text>
          <TextInput
            style={styles.input}
            value={hospital}
            onChangeText={setHospital}
            placeholder="Enter hospital"
            placeholderTextColor="#888"
          />

          <Text style={styles.label}>Doctor Name:</Text>
          <TextInput
            style={styles.input}
            value={doctorName}
            onChangeText={setDoctorName}
            placeholder="Enter doctor's name"
            placeholderTextColor="#888"
          />

          <Text style={styles.label}>Note (Optional):</Text>
          <TextInput
            style={styles.input}
            value={note}
            onChangeText={setNote}
            placeholder="Enter note"
            placeholderTextColor="#888"
          />

          {/* Date Picker */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <SecondaryButton
              title="Select Date"
              onPress={() => setShowDatePicker(true)}
              style={{ height: height * 0.05, width: "100%" }}
            />
            <Text style={styles.timeText}>
              Selected Date: {selectedDate.toLocaleDateString()}
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

          {/* Time Picker */}
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
            <Text style={styles.timeText}>
              Selected Time: {selectedTime.toLocaleTimeString()}
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

          {/* Days Before Notification Picker */}
          <Text style={styles.label}>Notify Me Before (Days):</Text>
          <Picker
            selectedValue={daysBeforeNotification}
            onValueChange={(itemValue) => setDaysBeforeNotification(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="1 day" value={1} />
            <Picker.Item label="2 days" value={2} />
            <Picker.Item label="3 days" value={3} />
            <Picker.Item label="5 days" value={5} />
            <Picker.Item label="7 days" value={7} />
          </Picker>

          <View style={styles.buttonContainer}>
            <SecondaryButton
              title="Save"
              onPress={handleSaveAppointment}
              style={{ height: height * 0.05 }}
            />
            <SecondaryButton title="Close" onPress={handleCloseModal} />
          </View>
        </View>
      </Modal>

      <ScrollView>
        {appointments.map((appointment, index) => (
          <View key={index} style={styles.card}>
            <View>
              <Text style={styles.cardText}>
                Department: {appointment.department}
              </Text>
              <Text style={styles.cardText}>
                Hospital: {appointment.hospital}
              </Text>
              <Text style={styles.cardText}>
                Doctor: {appointment.doctorName}
              </Text>
              <Text style={styles.cardText}>
                Note: {appointment.note || "No note"}
              </Text>
              <Text style={styles.cardText}>
                Date: {appointment.date.toLocaleDateString()}
              </Text>
              <Text style={styles.cardText}>
                Time: {appointment.time.toLocaleTimeString()}
              </Text>
              <Text style={styles.cardText}>
                Notify: {appointment.daysBeforeNotification} days before
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
