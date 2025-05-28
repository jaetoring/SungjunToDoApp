import DefaultProfileImg from "@/assets/images/common/defaultProfile.png";
import LayoutBg from "@/components/common/LayoutBg";
import Header from "@/components/layout/header";
import MyProfileBox from "@/components/mypage/MyProfileBox";
import StateMsgBox from "@/components/mypage/StateMsgBox";
import TodoChart from "@/components/mypage/TodoChart";
import { supabase } from "@/supabaseClient";
import {
  TodoTableType,
  UserInfoTableType,
  UserTableType,
} from "@/types/DBType";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";

interface UserData {
  user: UserTableType | null;
  userInfo: UserInfoTableType | null;
  todo: TodoTableType[] | null;
}

const MypageScreen = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const getUserId = async () => {
    const { data } = await supabase.auth.getUser();
    return data.user?.id;
  };

  const fetchData = useCallback(async () => {
    const userId = await getUserId();
    const [{ data: user }, { data: userInfo }, { data: todo }] =
      await Promise.all([
        supabase.from("user").select("*").eq("user_id", userId).single(),
        supabase.from("user_info").select("*").eq("user_id", userId).single(),
        supabase.from("todo").select("*").eq("user_id", userId),
      ]);

    setUserData({ user, userInfo, todo });
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
          level={userData?.userInfo?.level ?? 999}
        />
        <StateMsgBox
          state_msg={
            userData?.userInfo?.state_msg ? userData?.userInfo?.state_msg : ""
          }
          onUpdated={fetchData}
        />
        <TodoChart todoList={userData?.todo ?? null} />
        {/* 데이터 테스트 */}
        <Text selectable className="text-xs text-black">
          {JSON.stringify(userData, null, 2)}
        </Text>
      </ScrollView>
    </LayoutBg>
  );
};
export default MypageScreen;
