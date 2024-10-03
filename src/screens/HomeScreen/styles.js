import { StyleSheet } from "react-native";
import { COLORS } from "../../theme/colors";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "96%",
    marginHorizontal: "2%",
    backgroundColor: COLORS.background,
  },
  navbar: {
    width: "100%",
    borderRadius: 15,
    backgroundColor: COLORS.carouselBottom,
    marginTop: "2%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "6%",
    marginBottom: "5%",
  },
  navbarText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 20,
  },
  calendarContainer: {
    marginBottom: "5%",
  },
  calendar: {
    overflow: "hidden",
    borderRadius: 15,
  },
  managementContainer: {},
  title: {
    color: COLORS.carouselBottom,
    fontSize: 18,
  },
  menuContainer: {
    flexDirection: "row",
    marginTop: "3%",
    marginBottom: "5%",
  },
  informationContainer: {
    width: "100%",
  },
  innerInformationContainer: {
    marginTop: "3%",
    borderRadius: 15,
    width: "100%",
    height: 180,
    backgroundColor: COLORS.carouselBottom,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    color: COLORS.white,
    marginLeft: "3%",
  },
});
