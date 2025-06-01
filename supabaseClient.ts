import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";

let storage: any = undefined;
if (Platform.OS !== "web") {
  // 네이티브(iOS/Android)에서만 AsyncStorage 사용
  storage = require("@react-native-async-storage/async-storage").default;
}

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage, // Expo AsyncStorage를 세션 저장소로 지정
    persistSession: true, // 앱 재시작 시 AsyncStorage에서 세션 복원
    autoRefreshToken: true, // 엑세스 토큰 만료 시 리프레시 토큰으로 자동 갱신
    detectSessionInUrl: false, // 모바일 URL 세션 감지 비활성화
  },
});
