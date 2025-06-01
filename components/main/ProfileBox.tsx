import { getMedalByLevel } from "@/utils/findMedal";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import BoxBg from "../common/BoxBg";

interface ProfileBoxProps {
  name: string | null;
  level: number | null;
  profile_img?: ImageSourcePropType;
}

const ProfileBox = ({ name, level, profile_img }: ProfileBoxProps) => {
  const getFormattedDate = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      weekday: "long",
    };
    const formattedDate = new Intl.DateTimeFormat("ko-KR", options).format(
      today
    );
    return formattedDate;
  };

  return (
    <BoxBg>
      <View className="w-full flex-row justify-between items-center px-5 py-4">
        {/* 날짜와 닉네임 */}
        <View>
          <Text className="text-3xl font-semibold">
            📆 {getFormattedDate()}
          </Text>
          <View className="flex-row items-center mt-2">
            <Image
              source={getMedalByLevel(level)}
              style={{ width: 30, height: 30, marginRight: 10 }}
              testID="medal-image"
            />
            <Text className="text-2xl text-gray-500 font-medium">
              LV.{level} {name}
            </Text>
          </View>
        </View>

        {/* 프로필 아이콘 */}
        <Image
          source={profile_img}
          style={{ width: 70, height: 70, borderRadius: 50 }}
          testID="profile-image"
        />
      </View>
    </BoxBg>
  );
};
export default ProfileBox;
