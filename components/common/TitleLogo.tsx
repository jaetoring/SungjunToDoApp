import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text } from "react-native";

const TitleLogo = () => {
  return (
    <>
      <MaskedView
        maskElement={<Text style={styles.gradientTextMask}>TODOO</Text>}
      >
        <LinearGradient
          colors={["#FF91B0", "#FFBE84"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.gradientTextHidden}>TODOO</Text>
        </LinearGradient>
      </MaskedView>

      <Text className="text-2xl text-[#F88888] font-semibold mb-16">
        목표 달성의 한걸음
      </Text>
    </>
  );
};
export default TitleLogo;

const styles = StyleSheet.create({
  gradientTextMask: {
    fontSize: 65,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "transparent",
  },
  gradientTextHidden: {
    fontSize: 65,
    fontWeight: "bold",
    textAlign: "center",
    opacity: 0,
  },
});
