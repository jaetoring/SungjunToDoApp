import DefaultProfile from "@/assets/images/common/defaultProfile.png";
import LayoutBg from "@/components/common/LayoutBg";
import ModalBtn from "@/components/common/ModalBtn";
import TitleLogo from "@/components/common/TitleLogo";
import { shadow } from "@/styles/shadow";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

const Edit = () => {
  const [nickname, setNickname] = useState("");
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("갤러리 접근 권한이 필요합니다.");
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    console.log("첫 로그인 시 프로필 설정 완료");
  };

  return (
    <LayoutBg>
      <TitleLogo />
      <View className="items-center pt-10 pb-40">
        <View className="relative mb-6">
          <LinearGradient
            colors={["#FF91B0", "#FFBE84"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              shadow.base,
              {
                borderRadius: 100,
                width: 130,
                height: 130,
                overflow: "hidden",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Image
              source={image ? { uri: image } : DefaultProfile}
              className="w-full h-full"
              resizeMode="cover"
            />
          </LinearGradient>
          <TouchableOpacity
            onPress={pickImage}
            className="w-10 h-10 absolute bottom-0 right-0 rounded-3xl bg-white border border-gray-300 items-center justify-center"
          >
            <Text className="text-gray-400 text-2xl">+</Text>
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={["#F9D3C5", "#FBDAAC", "#F4FFC5"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            shadow.base,
            {
              width: 300,
              borderRadius: 10,
              paddingHorizontal: 10,
              marginBottom: 20,
            },
          ]}
        >
          <TextInput
            className="text-xl text-gray-800"
            placeholder="닉네임을 입력하세요. (12자 이하)"
            maxLength={12}
            value={nickname}
            onChangeText={setNickname}
            placeholderTextColor="#888"
            style={{ width: "100%" }}
          />
        </LinearGradient>

        <ModalBtn label="등록" onPress={() => handleSubmit()} />
      </View>

      <Text className="absolute bottom-3 text-xs text-gray-400">MoonMiSae</Text>
    </LayoutBg>
  );
};

export default Edit;
