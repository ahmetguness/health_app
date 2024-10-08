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
  mealListContainer: {
    width: "100%",
    marginTop: "5%",
  },
  mealListInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: "5%",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.white, // Background color for the modal
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    justifyContent: "flex-start", // Align content at the top
    shadowColor: "#000", // Shadow properties for Android
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Elevation for iOS
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.carouselBottom,
    marginTop: 15,
    marginBottom: 5,
  },
  modalText: {
    fontSize: 16,
    color: COLORS.black,
    textAlign: "left",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: COLORS.carouselBottom,
    borderRadius: 10,
    padding: 10,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  mealCard: {
    backgroundColor: COLORS.carouselBottom,
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  appointmentCard: {
    backgroundColor: COLORS.lightGray, // Use a different color for appointments
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  medicationCard: {
    backgroundColor: COLORS.lightGreen, // Use another color for medications
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  modalContainer: {
  flex: 1,
  backgroundColor: COLORS.background, // Background color to match app theme
  padding: 20,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  alignItems: "center",
  justifyContent: "flex-start",
},
modalText: {
  fontSize: 16,
  color: COLORS.black,
  marginVertical: 5,
},
sectionTitle: {
  fontSize: 20,
  fontWeight: "bold",
  color: COLORS.carouselBottom,
  marginVertical: 10,
},
closeButton: {
  backgroundColor: COLORS.carouselBottom,
  borderRadius: 10,
  padding: 10,
  alignItems: "center",
  justifyContent: "center",
  width: '80%', // Adjust the width for better layout
  marginTop: 20,
},
closeButtonText: {
  color: COLORS.white,
  fontWeight: "bold",
  fontSize: 16,
},

});
