import DefaultProfile from "@/assets/images/common/defaultProfile.png";
import LayoutBg from "@/components/common/LayoutBg";
import ModalBtn from "@/components/common/ModalBtn";
import TitleLogo from "@/components/common/TitleLogo";
import { shadow } from "@/styles/shadow";
import { supabase } from "@/supabaseClient";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface UserUpdateProfileProps {
  name: string;
  profile_img?: string;
}

interface RNFile {
  uri: string;
  name: string;
  type: string;
}

const Edit = () => {
  const [nickname, setNickname] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("갤러리 접근 권한이 필요합니다.");
      }

      const {
        data: { user },
        error: getUserErr,
      } = await supabase.auth.getUser();
      if (getUserErr || !user) return;

      const { data, error } = await supabase
        .from("user")
        .select("name, profile_img")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("유저 프로필 조회 실패", error);
        return;
      }

      setNickname(data.name ?? "");
      setImage(data.profile_img ?? null);
    })();
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (err) {
      console.error("이미지 선택 실패:", err);
      Alert.alert("실패", "이미지 선택 중 오류가 발생했습니다.");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const {
        data: { user },
        error: getUserErr,
      } = await supabase.auth.getUser();
      if (getUserErr || !user) {
        Alert.alert("오류", "유저 정보를 가져오지 못했습니다.");
        setLoading(false);
        return;
      }
      const userId = user.id;
      let imageUrl: string | undefined;

      if (image) {
        if (image.startsWith("http")) {
          imageUrl = image;
        } else {
          const response = await fetch(image);
          const blob = await response.blob();
          const mimeType = blob.type;
          const fileExt = mimeType.split("/")[1];
          const timestamp = Date.now();

          const fileName = `profile-${userId}-${timestamp}.${fileExt}`;
          const filePath = `profile-images/${fileName}`;

          const fileToUpload: RNFile = {
            uri: image,
            name: fileName,
            type: mimeType,
          };

          const { error: uploadError } = await supabase.storage
            .from("avatars")
            .upload(filePath, fileToUpload as unknown as File, {
              cacheControl: "0",
              upsert: true,
              contentType: mimeType,
            });

          if (uploadError) {
            console.error("이미지 업로드 실패:", uploadError);
            Alert.alert("오류", "이미지 업로드에 실패했습니다.");
            setLoading(false);
            return;
          }

          const { data } = supabase.storage
            .from("avatars")
            .getPublicUrl(filePath);

          if (!data || !data.publicUrl) {
            Alert.alert("오류", "이미지 URL을 가져오지 못했습니다.");
            setLoading(false);
            return;
          }

          // 수정된 storage 이미지 불러오기
          const pureUrl = data.publicUrl;
          const cacheBustedUrl = `${pureUrl}?t=${Date.now()}`;
          setImage(cacheBustedUrl);
          imageUrl = pureUrl;
        }
      }

      const updates: UserUpdateProfileProps = { name: nickname };
      if (imageUrl) {
        updates.profile_img = imageUrl;
      }

      const { error: updateError } = await supabase
        .from("user")
        .update(updates)
        .eq("user_id", userId);

      if (updateError) {
        console.error("유저 정보 업데이트 실패:", updateError);
        Alert.alert("오류", "프로필 정보를 업데이트하지 못했습니다.");
        setLoading(false);
        return;
      }

      Alert.alert(
        "완료",
        "프로필이 성공적으로 저장되었습니다.",
        [
          {
            text: "확인",
            onPress: () => {
              router.push("/(tabs)");
            },
          },
        ],
        { cancelable: false }
      );
    } catch (err) {
      console.error("handleSubmit 에러:", err);
      Alert.alert("오류", "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
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
