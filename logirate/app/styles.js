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
    zIndex: 1
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
});

export default styles;
