import React from "react";
import {
  Image,
  ImageSourcePropType,
  OpaqueColorValue,
  StyleProp,
  ViewStyle,
} from "react-native";

const ICON_IMAGE_MAP: Record<string, ImageSourcePropType> = {
  "house.fill": require("../../assets/images/tabBarIcons/home.png"),
  "setting.fill": require("../../assets/images/tabBarIcons/setting.png"),
  "mypage.fill": require("../../assets/images/tabBarIcons/mypage.png"),
};

export type IconSymbolName = keyof typeof ICON_IMAGE_MAP;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Image
      source={ICON_IMAGE_MAP[name]}
      style={[{ width: size, height: size }, style]}
      resizeMode="contain"
    />
  );
}
