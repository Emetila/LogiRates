import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const recoveryStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingHorizontal: "10%",
    paddingTop: 20,
  },

  title: {
    color: Colors.text,
    fontFamily: "PoppinsMedium",
    fontSize: 32,
    fontWeight: "600",
    letterSpacing: -1.6,
    paddingVertical: 10,
    width: 150
  },
  text: {
    color: Colors.text,
    fontFamily: "PoppinsRegular",
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: -0.28,
    paddingVertical: 10,
  },
  methodContainer: {
    marginBottom: 30,
  },
  methodLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
  },
  methodOptions: {
    gap: 10,
  },
  methodOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  methodOptionSelected: {
    borderColor: "#007bff",
    backgroundColor: "#f0f8ff",
  },
  methodIconContainer: {
    marginRight: 12,
  },
  methodIcon: {
    fontSize: 24,
  },
  methodTextContainer: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  methodSubtitle: {
    fontSize: 14,
    color: "#666",
  },
   radioContainer: {
    marginLeft: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  radioButtonSelected: {
    borderColor: '#007bff',
    backgroundColor: '#007bff',
  },
  button: {
    marginTop: 50
  }
});

export default recoveryStyles;
