import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles";

export default function VehicleDetailScreen({ route }) {
  const vehicle = route?.params?.vehicle

  if (!vehicle) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>No vehicle data available.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.header}>{vehicle.name}</Text>
        <Text>Type: {vehicle.type}</Text>
        <Text>Seats: {vehicle.seats}</Text>
        <Text>Features:</Text>
        {vehicle.features.map((feature, index) => (
          <Text key={index}>- {feature}</Text>
        ))}
      </View>
    </SafeAreaView>
  );
}
