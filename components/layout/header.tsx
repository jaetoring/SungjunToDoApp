import { useFonts } from "expo-font";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BMJUA from "../../assets/fonts/BMJUA.ttf";

const Header = () => {
  const [fontsLoaded] = useFonts({
    BMJUA,
  });

  if (!fontsLoaded) {
    console.log("Fonts not loaded yet");
    return null;
  }

  return (
    <SafeAreaView edges={["top"]} className="justify-center">
      <View className="items-center py-4">
        <Text
          className="text-4xl font-bold"
          style={{ color: "#FF91B0", fontFamily: "BMJUA" }}
        >
          TODOO
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default Header;
