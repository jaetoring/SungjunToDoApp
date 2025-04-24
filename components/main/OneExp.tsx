import { View } from "react-native";

interface OneExpProps {
  fillBox: number;
}

const OneExp = ({ fillBox = 0 }: OneExpProps) => {
  const isFilled = fillBox > 0;

  return (
    <View className="w-full h-5 bg-gray-300 border border-gray-400 rounded-sm overflow-hidden">
      <View
        className="h-full"
        style={{ width: `${fillBox * 100}%`, backgroundColor: "#FFEF79" }}
        testID={isFilled ? "filled-block" : "empty-block"}
      />
    </View>
  );
};
export default OneExp;
