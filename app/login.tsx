import { useAuth } from "@/hooks/useAuth";
import * as Google from "expo-auth-session/providers/google";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import LayoutBg from "@/components/common/LayoutBg";
import TitleLogo from "@/components/common/TitleLogo";
import bangersFont from "../assets/fonts/Bangers-Regular.ttf";
import googleIcon from "../assets/images/googleIcon.png";

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Bangers: bangersFont,
  });

  const [, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
  });

  useEffect(() => {
    if (!fontsLoaded) return;
    if (response?.type === "success") {
      login();
      router.replace("/");
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
      <View className="flex-1 justify-center items-center px-6">
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
      </View>
    </LayoutBg>
  );
}
