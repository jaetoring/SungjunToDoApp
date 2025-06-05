import daily1 from "@/assets/images/badge/daily1.png";
import daily2 from "@/assets/images/badge/daily2.png";
import daily3 from "@/assets/images/badge/daily3.png";
import effort1 from "@/assets/images/badge/effort1.png";
import effort2 from "@/assets/images/badge/effort2.png";
import effort3 from "@/assets/images/badge/effort3.png";
import { ImageSourcePropType } from "react-native";

export const badgeImageMap: Record<string, ImageSourcePropType> = {
  "daily1.png": daily1,
  "daily2.png": daily2,
  "daily3.png": daily3,
  "effort1.png": effort1,
  "effort2.png": effort2,
  "effort3.png": effort3,
};

export const convertBadgeIcon = (
  filename: string
): ImageSourcePropType | undefined => {
  return badgeImageMap[filename];
};
