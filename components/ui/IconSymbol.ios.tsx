import React from "react";
import {
  Image,
  ImageSourcePropType,
  OpaqueColorValue,
  StyleProp,
  ViewStyle,
} from "react-native";
import home from "../../assets/images/tabBarIcons/home.png";
import mypage from "../../assets/images/tabBarIcons/mypage.png";
import setting from "../../assets/images/tabBarIcons/setting.png";

const ICON_IMAGE_MAP: Record<string, ImageSourcePropType> = {
  "house.fill": home,
  "setting.fill": setting,
  "mypage.fill": mypage,
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
      style={[{ width: size, height: size, tintColor: color }, style]}
      resizeMode="contain"
    />
  );
}
