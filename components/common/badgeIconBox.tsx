import { Image, ImageSourcePropType, Text, View } from "react-native";

interface BadgeIconBoxProps {
  badgeName: string;
  imageSource: ImageSourcePropType;
  description: string;
}

const BadgeIconBox = ({
  badgeName,
  imageSource,
  description,
}: BadgeIconBoxProps) => {
  return (
    <View className="items-center">
      <Image
        source={imageSource}
        style={{ width: 60, height: 60, marginBottom: 4 }}
      />
      <Text className="text-base font-semibold">{badgeName}</Text>
      <Text className="text-sm text-gray-500">{description}</Text>
    </View>
  );
};
export default BadgeIconBox;
