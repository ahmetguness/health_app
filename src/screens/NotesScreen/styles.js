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
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Yarı saydam arka plan
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
});
