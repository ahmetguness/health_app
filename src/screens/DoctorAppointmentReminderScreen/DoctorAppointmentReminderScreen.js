import { View, Text, Dimensions } from "react-native";
import React from "react";
import NavbarContainer from "../../components/navbar/NavbarContainer";
import { styles } from "./styles";

export default function DoctorAppointmentReminderScreen() {
  const { height } = Dimensions.get("window");

  return (
    <View style={styles.root}>
      <NavbarContainer
        title={"Doctor Appointmen Reminder"}
        style={{ height: height * 0.06 }}
        onPressToAdd={() => console.log("asdasd")}
      />
    </View>
  );
}
