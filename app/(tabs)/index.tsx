import Header from "@/components/layout/header";
import ProfileBox from "@/components/main/ProfileBox";
import React from "react";
import { ImageSourcePropType, View } from "react-native";
import { mainDummyData } from "@/data/mainDummyData";

interface ProfileDataProps {
  level: number;
  name: string;
  profileImage: ImageSourcePropType;
  medalImage: ImageSourcePropType;
}

const HomeScreen = () => {
  const dummyData = mainDummyData;

  return (
    <>
      <Header />
      <View className="h-full w-full flex p-6">
        {/* 프로필 박스 */}
        <ProfileBox profileData={dummyData.profileData} date={dummyData.dummyDate} />
      </View>
    </>
  );
};
export default HomeScreen;
