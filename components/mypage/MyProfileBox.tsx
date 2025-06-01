import { getMedalByLevel } from "@/utils/findMedal";
import { Image, ImageSourcePropType, Text, View } from "react-native";

interface MyProfileProps {
  profile_img?: ImageSourcePropType;
  name: string | null;
  level: number | null;
}

const MyProfileBox = ({ profile_img, name, level }: MyProfileProps) => {
  return (
    <>
      <View className="w-full flex-col items-center mt-10 mb-2">
        {/* 프로필 */}
        <View className="mb-2">
          <Image
            source={profile_img}
            style={{ width: 90, height: 90, borderRadius: 50 }}
            testID="myprofile-image"
          />
        </View>
        {/* 닉네임 */}
        <View className="flex-row items-center mb-1">
          <Image
            source={getMedalByLevel(level)}
            style={{ width: 30, height: 30, marginRight: 8 }}
            testID="medal-image"
          />
          <Text className="text-xl">{name}</Text>
        </View>
        {/* 레벨 */}
        <Text className="text-lg text-gray-500">LV.{level}</Text>
      </View>
    </>
  );
};
export default MyProfileBox;
