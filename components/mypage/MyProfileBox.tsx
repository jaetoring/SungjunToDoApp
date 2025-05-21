import DefaultProfileImg from "@/assets/images/common/defaultProfile.png";
import DummyMedal from "@/assets/images/testImg/testMedal.png";
import { Image, Text, View } from "react-native";

const MyProfileBox = () => {
  return (
    <>
      <View className="w-full flex-col items-center mt-10 mb-2">
        {/* 프로필 */}
        <View className="mb-2">
          <Image source={DefaultProfileImg} style={{ width: 90, height: 90 }} />
        </View>
        {/* 닉네임 */}
        <View className="flex-row items-center mb-1">
          <Image
            source={DummyMedal}
            style={{ width: 30, height: 30, marginRight: 8 }}
          />
          <Text className="text-xl">닉네임</Text>
        </View>
        {/* 레벨 */}
        <Text className="text-lg text-gray-500">LV.레벨</Text>
      </View>
    </>
  );
};
export default MyProfileBox;
