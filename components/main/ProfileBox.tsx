import { Image, ImageSourcePropType, Text, View } from "react-native";
import BoxBg from "../common/BoxBg";

interface ProfileDataProps {
  level: number;
  name: string;
  profileImage: ImageSourcePropType;
  medalImage: ImageSourcePropType;
}

interface ProfileBoxProps {
  date: string;
  profileData: ProfileDataProps;
}

const ProfileBox = ({ profileData }: ProfileBoxProps) => {
  const getFormattedDate = () => {
    const today = new Date();
    console.log(today);
    const options = { month: "long", day: "numeric", weekday: "long" };
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
              source={profileData.medalImage}
              style={{ width: 30, height: 30, marginRight: 10 }}
              testID="medal-image"
            />
            <Text className="text-2xl text-gray-500 font-medium">
              LV.{profileData.level} {profileData.name}
            </Text>
          </View>
        </View>

        {/* 프로필 아이콘 */}
        <Image
          source={profileData.profileImage}
          style={{ width: 70, height: 70, borderRadius: 40 }}
          testID="profile-image"
        />
      </View>
    </BoxBg>
  );
};
export default ProfileBox;
