import Header from "@/components/layout/header";
import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const HomeScreen = () => {
  const handleLogout = () => {
    useAuth.getState().logout();
  };

  return (
    <>
      <Header />
      <View className="display flex-1 justify-center items-center">
        <Text className="text-4xl">중앙 텍스트</Text>
        {/* <Image
          style={{ width: 200, height: 200 }}
          source={require("@/assets/images/throwDice.png")}
        /> */}
      </View>
    </>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({});
