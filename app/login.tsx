import { useAuth } from "@/hooks/useAuth";
import * as Google from "expo-auth-session/providers/google";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Bangers: require("@/assets/fonts/Bangers-Regular.ttf"),
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
  });

  useEffect(() => {
    console.log("Google Login Response:", response);

    if (!fontsLoaded) return;
    if (response?.type === "success") {
      login();
      router.replace("/");
    }
  }, [response]);

  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-white">Loading Fonts..</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#4F46E5", "#9333EA", "#EC4899"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1 items-center justify-center px-6"
    >
      <Text className="w-full text-center font-bangers text-6xl text-white mb-6 tracking-wide">
        Yacht Dice
      </Text>
      <Image
        className="w-52 h-52 mb-10 opacity-90"
        source={require("@/assets/images/throwDice.png")}
      />
      <TouchableOpacity
        className="bg-white px-8 py-4 rounded-full flex-row items-center shadow-lg shadow-gray-800/50"
        activeOpacity={0.85}
        onPress={() => promptAsync()}
      >
        <Image
          source={require("@/assets/images/googleIcon.png")}
          className="w-7 h-7 mr-4"
        />
        <Text className="text-xl font-bold text-gray-800">
          Sign in with Google
        </Text>
      </TouchableOpacity>

      <View className="absolute bottom-8">
        <Text className="text-white text-sm opacity-70">© 2025 Yacht Dice</Text>
      </View>
    </LinearGradient>
  );
}
