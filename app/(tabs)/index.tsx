import Header from "@/components/layout/header";
import ProfileBox from "@/components/main/ProfileBox";
import React from "react";
import { ImageSourcePropType, View } from "react-native";

interface ProfileDataProps {
  level: number;
  name: string;
  profileImage: ImageSourcePropType;
  medalImage: ImageSourcePropType;
}

const HomeScreen = () => {
  // const handleLogout = () => {
  //   useAuth.getState().logout();
  // };

  const profileData: ProfileDataProps = {
    level: 21,
    name: "문미새",
    profileImage: require("@/assets/images/testImg/blackSpirit.jpg"),
    medalImage: require("@/assets/images/testImg/testMedal.png"),
  };
  const dummyDate = "4월 21일 (일)";

  return (
    <>
      <Header />
      <View className="h-full w-full flex p-6">
        {/* 프로필 박스 */}
        <ProfileBox profileData={profileData} date={dummyDate} />
      </View>
    </>
  );
};
export default HomeScreen;
