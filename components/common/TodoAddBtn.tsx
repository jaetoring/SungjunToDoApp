import { shadow } from "@/styles/shadow";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity } from "react-native";

interface TodoAddBtnProps {
  onPress?: () => void;
}

const TodoAddBtn = ({ onPress }: TodoAddBtnProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={["#F9C5D1", "#FBD786"]}
        style={[
          shadow.base,
          {
            width: 50,
            height: 50,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Text className="text-white text-6xl mt-[4px]">+</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
export default TodoAddBtn;
