import { useAuth } from "@/hooks/useAuth";
import * as Google from "expo-auth-session/providers/google";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import LayoutBg from "@/components/common/LayoutBg";
import TitleLogo from "@/components/common/TitleLogo";
import * as WebBrowser from "expo-web-browser";
import bangersFont from "../assets/fonts/Bangers-Regular.ttf";
import googleIcon from "../assets/images/googleIcon.png";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Bangers: bangersFont,
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID,
  });

  useEffect(() => {
    console.log(require("expo-linking").createURL());
    if (!fontsLoaded) return;
    if (response?.type === "success") {
      const { authentication } = response;
      console.log("Authentication successful:", authentication);
      // 여기서 authentication.idToken 또는 authentication.accessToken을 사용하여
      // 백엔드에서 사용자 인증을 처리하거나 사용자 정보를 가져올 수 있습니다.
      // 예를 들어, Firebase Auth에 연동하여 signInWithCredential을 사용할 수 있습니다.
      // idToken을 사용하여 구글 계정 정보를 가져오는 방법도 있습니다 [[4]](https://blog.pumpkin-raccoon.com/110).
      login();
      router.replace("/");
    } else if (response?.type === "error") {
      console.error("Authentication error:", response.error);
      // 오류 처리 로직
    } else if (response?.type === "dismiss") {
      console.log("Authentication dismissed");
      // 사용자가 로그인 창을 닫았을 때 처리
    }
  }, [response]);

  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading Fonts..</Text>
      </View>
    );
  }

  return (
    <LayoutBg>
      <TitleLogo />
      <TouchableOpacity
        className="bg-white px-3 py-2 flex-row justify-start items-center w-72 border border-gray-300"
        activeOpacity={0.85}
        onPress={() => promptAsync()}
      >
        <Image source={googleIcon} className="w-8 h-8 mr-3" />
        <Text className="text-lg font-bold">SIGN UP WITH GOOGLE</Text>
      </TouchableOpacity>

      <View className="absolute bottom-6">
        <Text className="text-xs text-gray-400">MoonMiSae</Text>
      </View>
    </LayoutBg>
  );
}
