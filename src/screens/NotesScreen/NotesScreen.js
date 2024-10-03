import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import React, { useState } from "react";
import { formatDateTime } from "../../utils/DateUtil";
import { styles } from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function NotesScreen() {
  const navigation = useNavigation();
  const { height } = Dimensions.get("window");
  const [modalVisible, setModalVisible] = useState(false);

  const today = new Date();
  const formattedDay = formatDateTime(today);

  console.log(formattedDay);
  return (
    <View style={styles.root}>
      <View style={[styles.navbar, { height: height * 0.06 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.navbarText}>NOTES</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="add-sharp" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Button title="Kapat" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
