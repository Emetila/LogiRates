import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VehicleDetailScreen(props) {
  const vehicle = props?.route?.params?.vehicle;
  return (
    <SafeAreaView>
        <Text>This is detail page</Text>
    </SafeAreaView>
  )
}