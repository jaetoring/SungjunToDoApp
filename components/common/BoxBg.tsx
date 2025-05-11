import { shadow } from "@/styles/shadow";
import { LinearGradient } from "expo-linear-gradient";

const BoxBg = ({ children }: { children: React.ReactNode }) => {
  return (
    <LinearGradient
      colors={["#F9D3C5", "#FBDAAC", "#F4FFC5"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        shadow.base,
        {
          borderRadius: 16,
          marginBottom: 15,
        },
      ]}
      className="flex-col w-full rounded-xl"
    >
      {children}
    </LinearGradient>
  );
};
export default BoxBg;
