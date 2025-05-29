import DefaultProfileImg from "@/assets/images/common/defaultProfile.png";
import LayoutBg from "@/components/common/LayoutBg";
import Header from "@/components/layout/header";
import BadgeBox from "@/components/mypage/BadgeBox";
import MyProfileBox from "@/components/mypage/MyProfileBox";
import StateMsgBox from "@/components/mypage/StateMsgBox";
import TodoChart from "@/components/mypage/TodoChart";
import { supabase } from "@/supabaseClient";
import {
  TodoTableType,
  UserBadgeListType,
  UserInfoTableType,
  UserTableType,
} from "@/types/DBType";
import { convertBadgeIcon } from "@/utils/badgeIconMap";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, Text } from "react-native";

interface UserData {
  user: UserTableType | null;
  userInfo: UserInfoTableType | null;
  todo: TodoTableType[] | null;
  userBadgeList: UserBadgeListType[] | null;
}

const MypageScreen = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const getUserId = async () => {
    const { data } = await supabase.auth.getUser();
    return data.user?.id;
  };

  const fetchData = useCallback(async () => {
    const userId = await getUserId();
    const [
      { data: user },
      { data: userInfo },
      { data: todo },
      { data: userBadgeRaw },
    ] = await Promise.all([
      supabase.from("user").select("*").eq("user_id", userId).single(),
      supabase.from("user_info").select("*").eq("user_id", userId).single(),
      supabase.from("todo").select("*").eq("user_id", userId),
      supabase
        .from("user_badge")
        .select(
          "badge:badge_id(badge_id, name, obtain_guide, icon_url), obtained_at"
        )
        .eq("user_id", userId),
    ]);

    const userBadgeList: UserBadgeListType[] = (userBadgeRaw ?? [])
      .filter((item) => item.badge)
      .map((item) => {
        const badgeObj = Array.isArray(item.badge) ? item.badge[0] : item.badge;
        return {
          badge: {
            badge_id: badgeObj.badge_id,
            name: badgeObj.name,
            obtain_guide: badgeObj.obtain_guide,
            icon_url: convertBadgeIcon(badgeObj.icon_url)!,
          },
          obtained_at: new Date(item.obtained_at),
        };
      });

    setUserData({ user, userInfo, todo, userBadgeList });
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

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
        <BadgeBox badgeList={userData?.userBadgeList ?? []} />
        {/* 데이터 테스트 */}
        <Text selectable className="text-xs text-black">
          {JSON.stringify(userData, null, 2)}
        </Text>
      </ScrollView>
    </LayoutBg>
  );
};
export default MypageScreen;
