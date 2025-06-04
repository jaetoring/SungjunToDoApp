import { Image, ImageSourcePropType, Text, View } from "react-native";

interface LevelIconBoxProps {
  levelRange: string;
  imageSource: ImageSourcePropType;
}

const LevelIconBox = ({ levelRange, imageSource }: LevelIconBoxProps) => {
  return (
    <View className="items-center">
      <Image
        source={imageSource}
        style={{ width: 50, height: 50, marginBottom: 4 }}
      />
      <Text className="text-sm">{levelRange}</Text>
    </View>
  );
};
export default LevelIconBox;
