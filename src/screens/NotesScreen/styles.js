import { StyleSheet } from "react-native";
import { COLORS } from "../../theme/colors";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "96%",
    marginHorizontal: "2%",
  },
  navbar: {
    marginTop: "2%",
    width: "100%",
    borderRadius: 15,
    backgroundColor: COLORS.carouselBottom,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
  },
  navbarText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 20,
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
    alignItems: "center",
  },
  titleInput: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold", 
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    height: 120,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
    flex: 1,
  },
  closeButton: {
    backgroundColor: COLORS.error,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "bold",
    textAlign: "center",
  },
});
