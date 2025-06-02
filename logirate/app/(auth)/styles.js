import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const authStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingHorizontal: "10%",
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
    justifyContent: 'center'
  },
  formText: {
    fontFamily: "PoppinsMedium",
    fontSize: 16,
    color: Colors.text,
  },
  input: {
    height: 55,
    color: Colors.text,
    paddingLeft: 15,
    fontFamily: "PoppinsSemiBold",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.text,
    borderStyle: "solid",
    width: 320,
    alignSelf: 'center'
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
