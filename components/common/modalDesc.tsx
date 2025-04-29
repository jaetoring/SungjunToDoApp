import { shadow } from "@/styles/shadow";
import { TextInput, View } from "react-native";

interface ModalDescProps {
  description: string;
  onChange: (newDescription: string) => void;
}

const ModalDesc = ({ description, onChange }: ModalDescProps) => {
  return (
    <View
      style={[shadow.base]}
      className="bg-gray-200 min-h-[150px] rounded-xl p-2 mb-2"
    >
      <TextInput
        className="text-xl font-semibold"
        placeholder="세부 내용을 작성해보세요."
        value={description}
        onChangeText={onChange}
        multiline
      />
    </View>
  );
};
export default ModalDesc;
