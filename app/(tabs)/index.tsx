import LayoutBg from "@/components/common/LayoutBg";
import Header from "@/components/layout/header";
import ExpBox from "@/components/main/ExpBox";
import ProfileBox from "@/components/main/ProfileBox";
import TodoListBox from "@/components/main/TodoListBox";
import { DummyExpData } from "@/data/mainExpData";
import { mainProfileData } from "@/data/mainProfileData";
import { TodoListData } from "@/data/mainTodoData";
import React from "react";
import { ScrollView, View } from "react-native";

const HomeScreen = () => {
  return (
    <LayoutBg>
      <ScrollView className="flex-1 w-full">
        <Header />
        <View className="h-full w-full flex px-6">
          {/* 프로필 박스 */}
          <ProfileBox profileData={mainProfileData} />
          {/* 경험치 박스 */}
          <ExpBox expData={DummyExpData} />
          {/* 투두리스트 박스 */}
          <TodoListBox todoData={TodoListData} />
        </View>
      </ScrollView>
    </LayoutBg>
  );
};
export default HomeScreen;
