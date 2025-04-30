import { shadow } from "@/styles/shadow";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";

interface ModalBtnProps {
  label: string;
  onPress: () => void;
}

const ModalBtn = ({ label, onPress }: ModalBtnProps) => {
  return (
    <View className="items-center">
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <LinearGradient
          colors={["#FFC4C4", "#FFD5B7"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            shadow.base,
            {
              width: 150,
              paddingVertical: 8,
              borderRadius: 10,
            },
          ]}
        >
          <Text className="text-2xl font-bold text-center">{label}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
export default ModalBtn;
