import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  pickerContainer: {
    marginVertical: 20,
    marginTop: "10%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  mealContainer: {
    marginVertical: 20,
  },
  mealLabel: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  input: {
    height: 80,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#f9f9f9",
    marginBottom: 16,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
