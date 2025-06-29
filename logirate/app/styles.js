import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white2,
    flex: 1,
    // paddingHorizontal: "10%",
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
    fontWeight: "500",
    letterSpacing: -0.24,
    paddingLeft: "15%",
    alignSelf: "stretch",
  },

  text: {
    fontFamily: "PoppinsBold",
    color: Colors.text,
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: -0.28,
  },

  price: {
    color: "#3B3C3D99",
    fontFamily: "PoppinsSemiBold",
    fontSize: 13,
    fontWeight: "600",
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

  container2: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  header: {
    backgroundColor: Colors.primary,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyListContent: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logo: {
    width: 150,
    height: 80,
    marginBottom: 12,
    alignSelf: 'center',
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  locationsContainer: {
    marginBottom: 12,
  },
  locationsTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  locationText: {
    color: Colors.text,
    marginLeft: 8,
  },
  moreLocationsText: {
    color: Colors.primary,
    fontStyle: 'italic',
    marginTop: 4,
  },
  noLogo: {
    width: 150,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: Colors.lightGray,
    marginBottom: 12,
    borderRadius: 4,
    alignSelf: 'center',
  },
  noLogoText: {
    color: Colors.text,
  },
  detailsButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: Colors.white,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.inputBg,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.text2,
    marginTop: 4,
    textAlign: 'center',
  },
  errorText: {
    color: Colors.warning,
    padding: 20,
    textAlign: 'center',
  },
});

export default styles;
