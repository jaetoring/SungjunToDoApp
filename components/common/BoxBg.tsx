import { LinearGradient } from "expo-linear-gradient";

const BoxBg = ({ children }: { children: React.ReactNode }) => {
  return (
    <LinearGradient
      colors={["#F9D3C5", "#FBDAAC", "#F4FFC5"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        borderRadius: 16,
        elevation: 8,
        shadowColor: "#000", // iOS
        shadowOffset: { width: 0, height: 4 }, // iOS
        shadowOpacity: 0.2, // iOS
        shadowRadius: 6,
      }}
      className="flex-row w-full rounded-xl"
    >
      {children}
    </LinearGradient>
  );
};
export default BoxBg;
