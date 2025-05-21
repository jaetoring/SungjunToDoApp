import Header from "@/components/layout/header";
import MyProfileBox from "@/components/mypage/MyProfileBox";
import { ScrollView } from "react-native";

const MypageScreen = () => {
  return (
    <ScrollView className="flex-1 w-full">
      <Header />
      <MyProfileBox />
      
    </ScrollView>
  );
};
export default MypageScreen;
