import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LinearGradient } from "expo-linear-gradient";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "dark"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          paddingTop: 10,
          paddingBottom: 50,
          ...Platform.select({
            ios: {
              position: "absolute",
            },
            default: {},
          }),
        },
      }}
    >
      <Tabs.Screen
        name="setting"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={35}
              name="setting.fill"
              color={color}
              style={{
                opacity: focused ? 1 : 0.9,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <LinearGradient
              colors={["#FFC4C4", "#FFD5B7"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                borderRadius: 100,
                width: 140,
                height: 170,
                opacity: focused ? 1 : 0.9,
                alignItems: "center",
                paddingTop: 23,
                transform: [{ translateY: 40 }],
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
              }}
            >
              <IconSymbol size={45} name="house.fill" color={color} />
            </LinearGradient>
          ),
        }}
      />
      <Tabs.Screen
        name="mypage"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={35}
              name="mypage.fill"
              color={color}
              style={{
                opacity: focused ? 1 : 0.9,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
