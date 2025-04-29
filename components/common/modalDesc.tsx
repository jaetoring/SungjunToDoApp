import { shadow } from "@/styles/shadow";
import { Text, View } from "react-native";

interface ModalDescProps {
  description: string;
}

const ModalDesc = ({ description }: ModalDescProps) => {
  return (
    <View
      style={[shadow.base]}
      className="bg-gray-200 min-h-[150px] rounded-xl p-3 mb-2"
    >
      <Text className="text-xl font-semibold">{description}</Text>
    </View>
  );
};
export default ModalDesc;
