import { Text, View } from "react-native";
import BoxBg from "../common/BoxBg";
import OneExp from "./OneExp";

const ExpBox = () => {
  return (
    <BoxBg>
      <View className="w-full flex-col px-5 py-4">
        <View className="w-full flex-row justify-between mb-4">
          <Text className="text-3xl font-bold">EXP Bar</Text>
          <Text className="text-xl font-light">(20 / 100XP)</Text>
        </View>
        <View className="w-full flex-row">
          {Array.from({ length: 10 }).map((_, index: number) => (
            <OneExp key={index} />
          ))}
        </View>
      </View>
    </BoxBg>
  );
};
export default ExpBox;
