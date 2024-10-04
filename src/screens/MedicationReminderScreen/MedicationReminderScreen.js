import { View, Dimensions, Text, Modal, Button } from "react-native";
import NavbarContainer from "../../components/navbar/NavbarContainer";
import { styles } from "./styles";
import React, { useState } from "react";

export default function MedicationReminderScreen() {
  const { height } = Dimensions.get("window");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddPress = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
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
          <Text>Modal Açık</Text>
          <Button title="Close" onPress={handleCloseModal} />
        </View>
      </Modal>
    </View>
  );
}
