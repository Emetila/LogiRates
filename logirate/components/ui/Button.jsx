import Colors from "@/constants/Colors";
import { Text, TouchableOpacity } from "react-native";


const Button = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}
      style={{
        height: 55,
        backgroundColor: Colors.primary,
        borderRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 0,
        justifyContent: 'center',
        alignItems: 'center', 
      }}
    >
      <Text
        style={{
          textAlign: "center",
          color: Colors.white,
          fontWeight: '700',
          fontFamily: "InterBold",
          fontSize: 16,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
