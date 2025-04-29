import { shadow } from "@/styles/shadow";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput } from "react-native";

interface ModalTitleProps {
  title: string;
  onChange: (newTitle: string) => void;
}

const ModalTitle = ({ title, onChange }: ModalTitleProps) => {
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
      <TextInput
        className="text-2xl font-bold p-2"
        placeholder="할 일을 작성해보세요."
        value={title}
        onChangeText={onChange}
      />
    </LinearGradient>
  );
};
export default ModalTitle;
