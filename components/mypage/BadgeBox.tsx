import { Image, ImageSourcePropType, Text, View } from "react-native";
import BoxBg from "../common/BoxBg";

interface BadgeListProps {
  badge: {
    name: string;
    badge_id: number;
    obtain_guide: string;
    icon_url: ImageSourcePropType;
  };
  obtained_at: Date;
}

interface BadgeBoxProps {
  badgeList: BadgeListProps[];
}

const BadgeBox = ({ badgeList }: BadgeBoxProps) => {
  return (
    <BoxBg>
      <View className="flex-col justify-between py-2 px-4">
        <Text className="text-xl font-bold mr-2">뱃지</Text>
        <View className="flex-row items-center my-2">
          {badgeList?.map((item) => (
            <View
              key={item.badge.badge_id}
              className="flex-col items-center mr-4"
            >
              <Image
                source={item.badge.icon_url}
                style={{ width: 60, height: 60 }}
              />
              <Text className="text-sm">{item.badge.name}</Text>
              <Text className="text-xs text-gray-500">
                {new Date(item.obtained_at).toLocaleDateString()}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </BoxBg>
  );
};
export default BadgeBox;
