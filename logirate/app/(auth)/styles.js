import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const authStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingHorizontal: "25%",
    marginBottom: '20%'
  },

  textBox: {
    flexDirection: 'column', 
    alignItems: 'flex-start',
    gap: 10,
    marginVertical: '10%'
  },
  authText: {
    fontFamily: "PoppinsSemiBold",
    color: Colors.white,
    fontSize: 22,
  },
  formContainer: {
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formText: {
    fontFamily: "PoppinsMedium",
    fontSize: 16,
    color: Colors.text,
    alignSelf: 'stretch',
  },
  input: {
    height: 55,
    color: Colors.text,
    paddingLeft: 15,
    fontFamily: "PoppinsRegular",
    borderWidth: 1,
    borderRadius: 8,
    width: 310,
    borderColor: Colors.text,
    borderStyle: "solid",
    alignSelf: 'stretch'
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
    marginVertical: 20
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: Colors.primary,
  },
  checkmark: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
  },
  signupButtons: {
    height: 50,
    paddingVertical: 8,
    paddingHorizontal: 66,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row', 
    borderRadius: 8,
    borderColor: Colors.primary,
    borderWidth: 2,
    borderStyle: 'solid',
    backgroundColor: Colors.white,
    fontFamily: 'PoppinsRegular',
    fontSize: 14,
    fontWeight: '500',
    gap: 5
  }
});

export default authStyles;
