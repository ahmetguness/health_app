import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function ManagementCard({ btnName }) {
  return (
    <TouchableOpacity>
      {/* {icon here} */}
      <Text>{btnName}</Text>
    </TouchableOpacity>
  );
}
