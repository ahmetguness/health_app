import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { formatDateTime } from "../../utils/DateUtil";
import { styles } from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import NoteCard from "../../components/cards/NoteCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NotesScreen() {
  const navigation = useNavigation();
  const { height } = Dimensions.get("window");
  const [modalVisible, setModalVisible] = useState(false);
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState([]);

  const today = new Date();
  const formattedDay = formatDateTime(today);

  useEffect(() => {
    const fetchNotes = async () => {
      const storedNotes = await AsyncStorage.getItem("notes");
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    };

    fetchNotes();
  }, []);

  const saveNote = async () => {
    const newNote = {
      title,
      note,
      date: formattedDay,
    };

    const updatedNotes = [...notes, newNote];

    await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
    setNotes(updatedNotes);

    setModalVisible(false);
    setTitle("");
    setNote("");
  };

  const deleteNote = async (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  const editNote = async (index, editedTitle, editedNote) => {
    const updatedNotes = [...notes];
    updatedNotes[index].title = editedTitle;
    updatedNotes[index].note = editedNote;

    await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

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

      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <NoteCard
            title={item.title}
            note={item.note}
            date={item.date}
            onDelete={() => deleteNote(index)}
            onEdit={(editedTitle, editedNote) =>
              editNote(index, editedTitle, editedNote)
            }
          />
        )}
      />

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
              placeholder="Enter Title"
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Write your note here"
              value={note}
              onChangeText={(text) => setNote(text)}
              multiline={true}
              numberOfLines={6}
              textAlignVertical="top"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={saveNote}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
