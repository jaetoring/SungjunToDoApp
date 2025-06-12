import LayoutBg from "@/components/common/LayoutBg";
import { useAuthStore } from "@/store/useAuthStore";
import { supabase } from "@/supabaseClient";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

export default function IndexPage() {
  const router = useRouter();
  const setLoggedIn = useAuthStore((s) => s.setLoggedIn);
  const letters = ["T", "O", "D", "O", "O"];
  const animationValues = useRef(
    letters.map(() => new Animated.Value(-50))
  ).current;

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setLoggedIn(!!session);
      })
      .catch((err) => {
        console.warn("세션 조회 실패:", err.message);
        setLoggedIn(false);
      })
      .finally(() => {
        Animated.stagger(
          200,
          animationValues.map((e) =>
            Animated.timing(e, {
              toValue: 0,
              duration: 800,
              useNativeDriver: true,
            })
          )
        ).start(() => {
          Animated.stagger(
            100,
            animationValues.map((e) =>
              Animated.sequence([
                Animated.timing(e, {
                  toValue: -10,
                  duration: 100,
                  useNativeDriver: true,
                }),
                Animated.timing(e, {
                  toValue: 0,
                  duration: 100,
                  useNativeDriver: true,
                }),
              ])
            )
          ).start(() => {
            setTimeout(() => {
              const logged = useAuthStore.getState().isLoggedIn;
              router.replace(logged ? "/(tabs)" : "/login");
            }, 500);
          });
        });
      });
  }, []);

  return (
    <LayoutBg>
      <View className="flex-1 items-center justify-center flex-row">
        {letters.map((char, i) => (
          <Animated.Text
            key={i}
            className="text-[60px] font-bold mx-0.5 text-[#FF91B0] text-center"
            style={{
              transform: [{ translateY: animationValues[i] }],
              opacity: animationValues[i].interpolate({
                inputRange: [-50, 0],
                outputRange: [0, 1],
              }),
            }}
          >
            {char}
          </Animated.Text>
        ))}
      </View>
    </LayoutBg>
  );
}
