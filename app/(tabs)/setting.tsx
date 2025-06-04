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

  const goToProfileEdit = () => {
    // 프로필 수정 페이지로 이동
    router.push("/edit");
  };

  return (
    <LayoutBg>
      <Header />
      <ScrollView className="flex-1 w-full px-4">
        <TouchableOpacity
          onPress={goToProfileEdit}
          className="w-full bg-blue-500 rounded-md py-3 mb-4"
        >
          <Text className="text-center font-medium">
            프로필 수정
          </Text>
        </TouchableOpacity>

        {/* 로그아웃 버튼 */}
        <TouchableOpacity
          onPress={handleLogout}
          className="w-full bg-red-500 rounded-md py-3"
        >
          <Text className="text-center font-medium">로그아웃</Text>
        </TouchableOpacity>
      </ScrollView>
    </LayoutBg>
  );
};
export default SettingScreen;
