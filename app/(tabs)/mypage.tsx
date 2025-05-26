import DefaultProfileImg from "@/assets/images/common/defaultProfile.png";
import LayoutBg from "@/components/common/LayoutBg";
import Header from "@/components/layout/header";
import MyProfileBox from "@/components/mypage/MyProfileBox";
import StateMsgBox from "@/components/mypage/StateMsgBox";
import { supabase } from "@/supabaseClient";
import { UserInfoTableType, UserTableType } from "@/types/DBType";
import { useCallback, useEffect, useState } from "react";
import { ScrollView } from "react-native";

interface UserData {
  user: UserTableType | null;
  userInfo: UserInfoTableType | null;
}

const MypageScreen = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const getUserId = async () => {
    const { data } = await supabase.auth.getUser();
    return data.user?.id;
  };

  const fetchData = useCallback(async () => {
    const userId = await getUserId();
    const [{ data: user }, { data: userInfo }] = await Promise.all([
      supabase.from("user").select("*").eq("user_id", userId).single(),
      supabase.from("user_info").select("*").eq("user_id", userId).single(),
    ]);

    setUserData({ user, userInfo });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <LayoutBg>
      <ScrollView className="flex-1 w-full px-4">
        <Header />
        <MyProfileBox
          profile_img={
            userData?.user?.profile_img
              ? { uri: userData.user.profile_img }
              : DefaultProfileImg
          }
          name={userData?.user?.name ?? "OOO"}
          level={userData?.userInfo?.level ?? 9999}
        />
        <StateMsgBox
          state_msg={
            userData?.userInfo?.state_msg ? userData?.userInfo?.state_msg : ""
          }
          onUpdated={fetchData}
        />
        {/* 데이터 테스트 */}
        {/* <Text selectable className="text-xs text-black">
          {JSON.stringify(userData, null, 2)}
        </Text> */}
      </ScrollView>
    </LayoutBg>
  );
};
export default MypageScreen;
