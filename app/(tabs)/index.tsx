import DefaultProfileImg from "@/assets/images/common/defaultProfile.png";
import LayoutBg from "@/components/common/LayoutBg";
import Header from "@/components/layout/header";
import BadgeModal from "@/components/main/BadgeModal";
import ExpBox from "@/components/main/ExpBox";
import ProfileBox from "@/components/main/ProfileBox";
import TodoListBox from "@/components/main/TodoListBox";
import { supabase } from "@/supabaseClient";
import {
  TodoTableType,
  UserBadgeTableType,
  UserInfoTableType,
  UserTableType,
} from "@/types/DBType";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";

interface UserData {
  user: UserTableType | null;
  userInfo: UserInfoTableType | null;
  todo: TodoTableType[] | null;
  userBadge: UserBadgeTableType[] | null;
}

const HomeScreen = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const prevBadgeList = useRef<UserBadgeTableType[] | null>(null);
  const [newBadgeList, setNewBadgeList] = useState<UserBadgeTableType[]>([]);

  const getUserId = async () => {
    const { data } = await supabase.auth.getUser();
    return data.user?.id;
  };

  const fetchData = useCallback(async () => {
    const userId = await getUserId();
    if (!userId) return;

    const today = new Date().toISOString().slice(0, 10);

    const [
      { data: user },
      { data: userInfo },
      { data: todo },
      { data: userBadge },
    ] = await Promise.all([
      supabase.from("user").select("*").eq("user_id", userId).single(),
      supabase.from("user_info").select("*").eq("user_id", userId).single(),
      supabase
        .from("todo")
        .select("*")
        .eq("user_id", userId)
        .filter("created_at::date", "eq", today),
      supabase.from("user_badge").select("*").eq("user_id", userId),
    ]);

    // 뱃지 획득
    const prevBadges = prevBadgeList.current;
    const newBadges = userBadge ?? [];

    if (prevBadges !== null) {
      const prevIds = new Set(prevBadges.map((b) => b.badge_id));
      const newObtainBadge = newBadges.filter((b) => !prevIds.has(b.badge_id));

      if (newObtainBadge.length > 0) {
        setNewBadgeList((prevQueue) => [...prevQueue, ...newObtainBadge]);
      }
    }

    prevBadgeList.current = newBadges;
    setUserData({ user, userInfo, todo, userBadge });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const currentBadge = newBadgeList.length > 0 ? newBadgeList[0] : null;

  const modalClose = () => {
    setNewBadgeList((prevQueue) => {
      const [, ...rest] = prevQueue;
      return rest;
    });
  };

  return (
    <>
      <LayoutBg>
        <Header />
        <ScrollView className="flex-1 w-full">
          <View className="h-full w-full flex px-6">
            {/* 프로필 박스 */}
            <ProfileBox
              name={userData?.user?.name ?? "OOO"}
              level={userData?.userInfo?.level ?? 999}
              profile_img={
                userData?.user?.profile_img
                  ? { uri: userData.user.profile_img }
                  : DefaultProfileImg
              }
            />
            {/* 경험치 박스 */}
            <ExpBox
              currentExp={userData?.userInfo?.current_exp ?? 0}
              level={userData?.userInfo?.level ?? 999}
            />
            {/* 투두리스트 박스 */}
            <TodoListBox
              todoData={userData?.todo ?? null}
              reloadData={fetchData}
            />
          </View>
        </ScrollView>
      </LayoutBg>
      <BadgeModal
        visible={currentBadge !== null}
        badge={currentBadge}
        onClose={modalClose}
      />
    </>
  );
};
export default HomeScreen;
