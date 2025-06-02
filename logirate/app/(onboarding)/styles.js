import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const onboarding = StyleSheet.create({
  container: {
    paddingHorizontal: "20%",
    backgroundColor: Colors.white,
    flex: 1,
    gap: 120
  },
  logo: {
    width: 91,
    alignSelf: "center",
    height: 99,
    aspectRatio: 91,
    marginTop: '10%',
    resizeMode: 'contain'
  },
  imageBox: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24
  },
  title: {
    color: Colors.text,
    fontFamily: 'PoppinsBold',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28
  },
  title2: {
    color: Colors.text,
    fontFamily: 'PoppinsBold',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 28
  },
  image: {
    resizeMode: 'contain',
    width: 282,
    height: 282,
    alignSelf: 'center'
  },
  text: {
    color: Colors.text,
    textAlign: 'center',
    fontFamily: 'PoppinsRegular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    width: 245,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  text2: {
    color: Colors.text,
    textAlign: 'center',
    fontFamily: 'PoppinsRegular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    width: 335,
  },
  textBoxText: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  textBox: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    justifyContent: 'center',
    paddingTop: '30%',
    paddingBottom: '10%'
  }
});

export default onboarding;
