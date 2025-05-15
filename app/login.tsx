import { useAuthStore } from "@/store/useAuthStore";
import { useAuthRequest } from "expo-auth-session";
// import * as Google from "expo-auth-session/providers/google";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import LayoutBg from "@/components/common/LayoutBg";
import TitleLogo from "@/components/common/TitleLogo";
import bangersFont from "../assets/fonts/Bangers-Regular.ttf";
import googleIcon from "../assets/images/googleIcon.png";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://oauth2.googleapis.com/token",
  revocationEndpoint: "https://oauth2.googleapis.com/revoke",
};

export default function LoginScreen() {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();
  const testId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB;
  const redirectUri = process.env.EXPO_PUBLIC_REDIRECT_URL;
  // const redirectUri = "https://auth.expo.io/@moonsungjun/todoo";

  const [fontsLoaded] = useFonts({
    Bangers: bangersFont,
  });

  // 범용성 소셜 로그인용
  const [, response, promptAsync] = useAuthRequest(
    {
      clientId: testId || "",
      redirectUri: redirectUri || "",
      scopes: ["openid", "profile", "email"],
      responseType: "code",
    },
    discovery
  );

  // 구글로그인용
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   androidClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID,
  //   webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB,
  //   scopes: ["profile", "email"],
  //   redirectUri: makeRedirectUri({
  //     native: "https://auth.expo.io/@moonsungjun/todoo",
  //   }),
  // });

  useEffect(() => {
    if (!fontsLoaded) return;
    if (response?.type === "success") {
      const { code } = response.params;
      console.log("Authentication successful:", code);
      // axios
      //   .post("/api/user/...", {
      //     code,
      //     redirectUri,
      //   })
      //   .then((response) => {
      //     console.log("로그인 정보 전송");
      //   });

      login();
      router.replace("/(tabs)");
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
