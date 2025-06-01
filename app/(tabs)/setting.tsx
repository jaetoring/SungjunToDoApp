import LayoutBg from "@/components/common/LayoutBg";
import Header from "@/components/layout/header";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity } from "react-native";

const SettingScreen = () => {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <LayoutBg>
      <Header />
      <ScrollView className="flex-1 w-full px-4">
        <Text>setting page</Text>
        <TouchableOpacity
          onPress={handleLogout}
          style={{ padding: 10, backgroundColor: "red" }}
        >
          <Text style={{ color: "white" }}>로그아웃</Text>
        </TouchableOpacity>
      </ScrollView>
    </LayoutBg>
  );
};
export default SettingScreen;
