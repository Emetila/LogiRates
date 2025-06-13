import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingHorizontal: "10%",
  },

  container2: {
    backgroundColor: Colors.white2,
    flex: 1,
  },

  input: {
    color: Colors.text,
    borderStyle: "solid",
    alignSelf: "center",
    width: 280,
    // alignSelf: "stretch",
    height: 60,
    backgroundColor: Colors.inputBg,
    paddingLeft: 40,
    fontFamily: "PoppinsSemiBold",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.inputBg,
  },

  icon: {
    position: "absolute",
    top: 15,
    left: 8,
    zIndex: 1,
  },

  inputfield: {
    position: "absolute",
    color: "#26323880",
    fontFamily: "PoppinsRegular",
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: -0.24,
    paddingLeft: "15%",
    alignSelf: "stretch",
  },

  text: {
    fontFamily: "PoppinsBold",
    color: Colors.text,
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: -0.28,
  },

  price: {
    color: "#3B3C3D99",
    fontFamily: "PoppinsSemiBold",
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: -0.26,
  },

  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 40,
    backgroundColor: Colors.white,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    width: "100%",
  },
});

export default styles;
