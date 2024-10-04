import { View, Text, Modal } from "react-native";
import React from "react";

export default function NoteCard({ title, note, date }) {
  return (
    <View>
      <Text>{title}</Text>
      <Text>{date}</Text>
      <Modal>
        <Text>{note}</Text>
      </Modal>
    </View>
  );
}
