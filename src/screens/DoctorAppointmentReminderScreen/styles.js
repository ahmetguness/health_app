import { StyleSheet } from "react-native";
import { COLORS } from "../../theme/colors";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "96%",
    marginHorizontal: "2%",
    backgroundColor: COLORS.background,
  },
  modalContent: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    backgroundColor: "#f9f9f9",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: COLORS.darkGreen,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: COLORS.carouselBottom,
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#007BFF",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  dayContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  dayText: {
    fontSize: 16,
    color: "#555",
  },
  timeText: {
    marginTop: 5,
    fontStyle: "italic",
    color: COLORS.info,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    margin: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  icon: {
    marginLeft: 15,
  },
});
