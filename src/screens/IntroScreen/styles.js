import { StyleSheet } from "react-native";
import { COLORS } from "../../theme/colors";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "1%",
    backgroundColor: COLORS.background,
  },
  titleContainer: {
    backgroundColor: COLORS.carouselTop,
    width: "92%",
    height: 60,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "6%",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  carousel: {
    overflow: "hidden",
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  indicatorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "lightgray",
    marginHorizontal: 5,
  },
  activeIndicatorDot: {
    backgroundColor: "black",
  },
});
