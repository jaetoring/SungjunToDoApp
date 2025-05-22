import LayoutBg from "@/components/common/LayoutBg";
import Header from "@/components/layout/header";
import MyProfileBox from "@/components/mypage/MyProfileBox";
import StateMsgBox from "@/components/mypage/StateMsgBox";
import { supabase } from "@/supabaseClient";
import { UserInfoTableType, UserTableType } from "@/types/DBType";
import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";

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

  const fetchData = async () => {
    const userId = await getUserId();
    const [{ data: user }, { data: userInfo }] = await Promise.all([
      supabase.from("user").select("*").eq("id", userId).single(),
      supabase.from("user_info").select("*").eq("user_id", userId).single(),
    ]);

    setUserData({ user, userInfo });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <LayoutBg>
      <ScrollView className="flex-1 w-full px-4">
        <Header />
        <MyProfileBox />
        <StateMsgBox />
        <Text selectable className="text-xs text-black">
          {JSON.stringify(userData, null, 2)}
        </Text>
      </ScrollView>
    </LayoutBg>
  );
};
export default MypageScreen;
