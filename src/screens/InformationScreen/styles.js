import { StyleSheet } from "react-native";
import { COLORS } from "../../theme/colors";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  titleContainer: {
    width: "90%",
    marginHorizontal: "5%",
    marginTop: "20%",
  },
  title1: {
    color: COLORS.carouselBottom,
    fontWeight: "bold",
    fontSize: 40,
  },
  title2: {
    color: COLORS.carouselBottom,
    fontSize: 22,
    marginLeft: 50,
  },
  inputContainer: {
    width: "90%",
    marginHorizontal: "5%",
    marginTop: "30%",
    justifyContent: "space-evenly",
    flex: 1,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.carouselBottom,
    // paddingHorizontal: "5%"
  },
  title3: {
    color: COLORS.carouselBottom,
  },
  picker: {
    height: 50,
    borderColor: COLORS.carouselBottom,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
  },
});
