import { shadow } from "@/styles/shadow";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";

interface ModalTitleProps {
  title: string;
}

const ModalTitle = ({ title }: ModalTitleProps) => {
  return (
    <LinearGradient
      colors={["#F9D3C5", "#FBDAAC", "#F4FFC5"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[
        shadow.base,
        {
          borderRadius: 10,
          padding: 5,
          marginBottom: 10,
        },
      ]}
    >
      <Text className="text-2xl font-bold p-2">{title}</Text>
    </LinearGradient>
  );
};
export default ModalTitle;
