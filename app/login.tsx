import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import FormInput from "@/components/common/FormInput";
import LayoutBg from "@/components/common/LayoutBg";
import TitleLogo from "@/components/common/TitleLogo";
import { supabase } from "@/supabaseClient";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("로그인 시도:", email, password);

    const { data: loginData, error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (loginError) {
      Alert.alert("로그인 실패", "아이디와 비밀번호를 확인해주세요.");
      return;
    }

    console.log("로그인 성공", loginData);

    const { data: sessionData, error: getUserError } =
      await supabase.auth.getUser();

    if (getUserError || !sessionData?.user) {
      console.error("유저 정보 조회 실패", getUserError?.message);
      return;
    }

    const user = sessionData.user;

    // user 테이블에 이미 존재하는지 확인
    const { data: existingUsers, error: selectError } = await supabase
      .from("user")
      .select("user_id")
      .eq("user_id", user.id);

    if (selectError) {
      console.error("user 테이블 조회 실패", selectError.message);
      return;
    }

    if (existingUsers.length === 0) {
      const createdAt = user.created_at;
      const insertUser = supabase.from("user").insert({
        user_id: user.id,
        email: user.email,
        created_at: createdAt,
        updated_at: createdAt,
      });
      const insertUserInfo = supabase.from("user_info").insert({
        current_exp: 0,
        level: 1,
        state_msg: "상태 메세지를 입력해보세요!",
      });

      try {
        const [userRes, userInfoRes] = await Promise.all([
          insertUser,
          insertUserInfo,
        ]);

        const hasError = userRes.error || userInfoRes.error;

        if (hasError) {
          console.error("테이블 insert error", {
            user: userRes.error,
            user_info: userInfoRes.error,
          });

          await supabase.from("user").delete().eq("user_id", user.id);
          await supabase.from("user_info").delete().eq("user_id", user.id);

          Alert.alert("데이터 저장 실패", "다시 시도해주세요.");
          return;
        }

        console.log("user / user_info insert 성공");
      } catch (err) {
        console.error("Promise.all 예외", err);
        Alert.alert("회원 데이터 저장 중 오류 발생", "다시 시도해주세요.");
        return;
      }
    } else {
      console.log("이미 user 테이블에 유저 정보가 있음");
    }

    const { data: findName, error: findMeErr } = await supabase
      .from("user")
      .select("name")
      .eq("user_id", user.id)
      .single();
    if (findMeErr) {
      console.error("내 정보 조회 실패", findMeErr.message);
      return;
    }

    if (!findName.name) {
      router.replace("/edit");
    } else {
      router.replace("/(tabs)");
    }
  };

  const handleMoveSingup = () => {
    router.push("/signup");
    console.log("회원가입 페이지로 이동");
  };

  return (
    <LayoutBg>
      <TitleLogo />
      <View className="w-full px-20">
        {/* 이메일 */}
        <FormInput
          value={email}
          onChangeText={setEmail}
          placeholder="이메일"
          keyboardType="email-address"
        />

        {/* 비밀번호 */}
        <FormInput
          value={password}
          onChangeText={setPassword}
          placeholder="비밀번호"
          secureTextEntry
        />

        <TouchableOpacity
          onPress={handleLogin}
          className="w-full bg-pink-400 rounded-xl py-4 mb-4"
        >
          <Text className="text-white text-center font-semibold">로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleMoveSingup()}>
          <Text className="text-gray-600">
            계정이 없으신가요?{" "}
            <Text className="text-pink-500 font-bold">회원가입</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <View className="absolute bottom-6">
        <Text className="text-xs text-gray-400">MoonMiSae</Text>
      </View>
    </LayoutBg>
  );
}
