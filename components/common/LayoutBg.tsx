import { LinearGradient } from "expo-linear-gradient";

const LayoutBg = ({ children }: { children: React.ReactNode }) => {
  return (
    <LinearGradient
      colors={["#FFFFFF", "#FFF4EB", "#FFF8E9"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
      className="w-full rounded-xl"
    >
      {children}
    </LinearGradient>
  );
};
export default LayoutBg;
