import DefaultProfileImg from "@/assets/images/common/defaultProfile.png";
import LayoutBg from "@/components/common/LayoutBg";
import Header from "@/components/layout/header";
import ExpBox from "@/components/main/ExpBox";
import ProfileBox from "@/components/main/ProfileBox";
import TodoListBox from "@/components/main/TodoListBox";
import { supabase } from "@/supabaseClient";
import {
  TodoTableType,
  UserInfoTableType,
  UserTableType,
} from "@/types/DBType";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

interface UserData {
  user: UserTableType | null;
  userInfo: UserInfoTableType | null;
  todo: TodoTableType[] | null;
}

const HomeScreen = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const getUserId = async () => {
    const { data } = await supabase.auth.getUser();
    return data.user?.id;
  };

  const fetchData = useCallback(async () => {
    const userId = await getUserId();
    if (!userId) return;

    const today = new Date().toISOString().slice(0, 10);

    const [{ data: user }, { data: userInfo }, { data: todo }] =
      await Promise.all([
        supabase.from("user").select("*").eq("user_id", userId).single(),
        supabase.from("user_info").select("*").eq("user_id", userId).single(),
        supabase
          .from("todo")
          .select("*")
          .eq("user_id", userId)
          .eq("created_at", today),
      ]);

    setUserData({ user, userInfo, todo });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <LayoutBg>
        <ScrollView className="flex-1 w-full">
          <Header />
          <View className="h-full w-full flex px-6">
            {/* 프로필 박스 */}
            <ProfileBox
              name={userData?.user?.name ?? "OOO"}
              level={userData?.userInfo?.level ?? 999}
              profile_img={userData?.user?.profile_img ?? DefaultProfileImg}
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
    </>
  );
};
export default HomeScreen;
