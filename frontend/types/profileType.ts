import { ImageSourcePropType } from "react-native";

export interface ProfileType {
  level: number;
  name: string;
  profileImage: ImageSourcePropType;
  medalImage: ImageSourcePropType;
}