import IconGuide from "@/assets/images/common/iconGuide.png";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GuideModal from "../common/GuideModal";

const Header = () => {
  const [modalOn, setModalOn] = useState(false);

  const openModal = () => {
    setModalOn(true);
  };

  const closeModal = () => {
    setModalOn(false);
  };
  return (
    <SafeAreaView edges={["top"]} className="justify-center relative w-full">
      <View className="items-center py-4">
        <Text
          className="text-4xl font-bold"
          style={{ color: "#FF91B0", fontFamily: "BMJUA" }}
        >
          TODOO
        </Text>
      </View>

      {/* 레벨 메달아이콘 */}
      <TouchableOpacity onPress={openModal} className="absolute top-11 right-5">
        <Image
          source={IconGuide}
          style={{ width: 30, height: 30 }}
          testID="icon-guide"
        ></Image>
      </TouchableOpacity>
      <GuideModal visible={modalOn} onClose={closeModal} />
    </SafeAreaView>
  );
};
export default Header;
