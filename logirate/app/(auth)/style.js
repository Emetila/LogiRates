import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const authStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingHorizontal: "25%",
    paddingBottom: "20%",
  },

  textBox: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  authText: {
    fontFamily: "PoppinsSemiBold",
    color: Colors.white,
    fontSize: 22,
  },
  formContainer: {
    gap: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  formText: {
    fontFamily: "PoppinsMedium",
    fontSize: 16,
    color: Colors.text,
    alignSelf: "stretch",
  },
  input: {
    color: Colors.text,
    width: 340,
    borderStyle: "solid",
    alignSelf: "center",
    height: 50,
    backgroundColor: Colors.inputBg,
    paddingLeft: 40,
    fontFamily: "PoppinsSemiBold",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.inputBg,
  },
  input2: {
    paddingLeft: 40,
    color: Colors.text,
    width: 340,
    borderStyle: "solid",
    alignSelf: "stretch",
    height: 50,
    backgroundColor: Colors.inputBg,
    fontFamily: "PoppinsSemiBold",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.inputBg,
  },
  secContainer: {
    marginTop: 10,
    gap: 15,
  },
  //   inputbtn: {
  //     marginVertical: 15
  //   },
  footer: {
    textAlign: "center",
    color: Colors.text,
    fontFamily: "PoppinsRegular",
    fontSize: 14,
    marginVertical: 20,
  },
  error: {
    color: Colors.error,
    marginBottom: 10,
    fontSize: 13,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 4,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    backgroundColor: Colors.primary,
  },
  checkmark: {
    color: Colors.white,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
  },
  signupButtons: {
    height: 50,
    width: 50,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderColor: "#0000004D",
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: Colors.white,
  },
  icon: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  icon2: {
    position: "absolute",
    top: 10,
    right: 30,
  }
});

export default authStyle;
