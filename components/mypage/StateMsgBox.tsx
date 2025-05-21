import StateEditIcon from "@/assets/images/common/stateEdit.png";
import { Image, Text, View } from "react-native";
import BoxBg from "../common/BoxBg";

const StateMsgBox = () => {
  return (
    <>
      <BoxBg>
        {/* 상태 메세지 헤더 */}
        <View className="flex-row justify-between py-2 px-4">
          <Text className="text-xl font-bold">상태 메세지</Text>
          <Image source={StateEditIcon} style={{ width: 20, height: 20 }} />
        </View>
        {/* 상태 메세지 컨텐츠 */}
        <View className="px-4 pb-4">
          <Text className="text-lg">나는 할 수 있다.</Text>
        </View>
      </BoxBg>
    </>
  );
};
export default StateMsgBox;
