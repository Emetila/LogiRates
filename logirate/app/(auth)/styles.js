import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const authStyles = StyleSheet.create({
  authText: {
    fontFamily: "PoppinsSemiBold",
    color: Colors.white,
    fontSize: 22,
  },
  formContainer: {
    gap: 10,
  },
  formText: {
    fontFamily: "PoppinsMedium",
    fontSize: 16,
    color: Colors.text,
  },
  input: {
    height: 50,
    backgroundColor: Colors.inputBgTwo,
    color: Colors.white,
    paddingLeft: 15,
    fontFamily: "PoppinsSemiBold",
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: "solid",
  },
  secContainer: {
    marginTop: 40,
    gap: 22,
  },
  //   inputbtn: {
  //     marginVertical: 15
  //   },
  footer: {
    textAlign: "center",
    color: Colors.text,
    fontFamily: "PoppinsRegular",
    fontSize: 14,
  },
});

export default authStyles;
