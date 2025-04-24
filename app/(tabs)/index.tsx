import Header from "@/components/layout/header";
import ExpBox from "@/components/main/ExpBox";
import ProfileBox from "@/components/main/ProfileBox";
import { DummyExpData } from "@/data/mainExpData";
import { mainProfileData } from "@/data/mainProfileData";
import React from "react";
import { View } from "react-native";

const HomeScreen = () => {
  const profileData = mainProfileData;
  const MaxExp = DummyExpData.maxExp;
  const currentExp = DummyExpData.currentExp;

  return (
    <>
      <Header />
      <View className="h-full w-full flex p-6">
        {/* 프로필 박스 */}
        <ProfileBox
          profileData={profileData.profileData}
          date={profileData.dummyDate}
        />
        {/* 경험치 박스 */}
        <ExpBox
          level={profileData.profileData.level}
          maxExp={MaxExp}
          currentExp={currentExp}
        />
      </View>
    </>
  );
};
export default HomeScreen;
