import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../theme/colors";
import en from "../../locales/en.json";
import tr from "../../locales/tr.json";
import { useSelector } from "react-redux";

export default function NoteCard({ title, note, date, onDelete, onEdit }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedNote, setEditedNote] = useState(note);

  const handleSaveEdit = () => {
    onEdit(editedTitle, editedNote);
    setIsEditing(false);
    setModalVisible(false);
  };
  const lan = useSelector((state) => state.lan.lan);

  const localizedData = lan === "en" ? en : tr;
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDate}>{date}</Text>
        </View>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {isEditing ? (
              <>
                <TextInput
                  style={styles.titleInput}
                  value={editedTitle}
                  onChangeText={(text) => setEditedTitle(text)}
                />
                <TextInput
                  style={styles.noteInput}
                  value={editedNote}
                  onChangeText={(text) => setEditedNote(text)}
                  multiline={true}
                  numberOfLines={6}
                  textAlignVertical="top"
                />
              </>
            ) : (
              <>
                <Text style={styles.noteTitle}>{title}</Text>
                <Text style={styles.noteText}>{note}</Text>
              </>
            )}

            <View style={styles.buttonContainer}>
              {isEditing ? (
                <>
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSaveEdit}
                  >
                    <Text style={styles.saveButtonText}>
                      {localizedData.save}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>
                      {localizedData.close}
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => setIsEditing(true)}
                >
                  <Text style={styles.editButtonText}>
                    {localizedData.edit}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                onDelete();
                setModalVisible(false);
              }}
            >
              <Text style={styles.deleteButtonText}>
                {localizedData.delete}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 10,
    marginTop: "5%",
  },
  card: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardDate: {
    fontSize: 14,
    color: "gray",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  noteText: {
    fontSize: 16,
    marginBottom: 20,
  },
  titleInput: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  noteInput: {
    width: "100%",
    height: 120,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: COLORS.carouselBottom,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#ff6347",
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "#ff4500",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    marginTop: 10,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
