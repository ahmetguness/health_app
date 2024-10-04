import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { formatDateTime } from "../../utils/DateUtil";
import { styles } from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import NoteCard from "../../components/cards/NoteCard";

export default function NotesScreen() {
  const navigation = useNavigation();
  const { height } = Dimensions.get("window");
  const [modalVisible, setModalVisible] = useState(false);
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");

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
          <View style={[styles.modalContent, { width: "90%" }]}>
            <TextInput
              style={styles.titleInput}
              placeholder="Başlık girin"
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Notunuzu buraya yazın"
              value={note}
              onChangeText={(text) => setNote(text)}
              multiline={true}
              numberOfLines={6}
              textAlignVertical="top"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => {
                  console.log("Kaydedilen Başlık:", title);
                  console.log("Kaydedilen Not:", note);
                  setModalVisible(false);
                  setTitle("");
                  setNote("");
                }}
              >
                <Text style={styles.buttonText}>Kaydet</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Kapat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
