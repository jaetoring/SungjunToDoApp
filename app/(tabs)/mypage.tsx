import Header from "@/components/layout/header";
import MyProfileBox from "@/components/mypage/MyProfileBox";
import StateMsgBox from "@/components/mypage/StateMsgBox";
import { ScrollView } from "react-native";

const MypageScreen = () => {
  return (
    <ScrollView className="flex-1 w-full px-4">
      <Header />
      <MyProfileBox />
      <StateMsgBox />
    </ScrollView>
  );
};
export default MypageScreen;
