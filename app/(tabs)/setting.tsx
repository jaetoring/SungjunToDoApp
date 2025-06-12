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
    router.push("/edit");
  };

  return (
    <LayoutBg>
      <Header />
      <ScrollView className="flex-1 w-full px-4">
        <Text className="text-2xl font-bold text-gray-800 mb-5">설정</Text>
        <TouchableOpacity
          onPress={goToProfileEdit}
          activeOpacity={0.7}
          className="w-full bg-white rounded-xl shadow-md p-4 flex-row items-center mb-3"
        >
          <Text className="flex-1 text-lg font-medium text-gray-800">
            프로필 수정
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogout}
          activeOpacity={0.7}
          className="w-full bg-white rounded-xl shadow-md p-4 flex-row items-center mb-3"
        >
          <Text className="flex-1 text-lg font-medium text-red-600">
            로그아웃
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </LayoutBg>
  );
};
export default SettingScreen;
