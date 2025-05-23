import Medal5 from "@/assets/images/medal/1grade.png"
import Medal4 from "@/assets/images/medal/2grade.png"
import Medal3 from "@/assets/images/medal/3grade.png"
import Medal2 from "@/assets/images/medal/4grade.png"
import Medal1 from "@/assets/images/medal/5grade.png"
import Medal7 from "@/assets/images/medal/orangeGrade.png"
import Medal6 from "@/assets/images/medal/redGrade.png"
import { ImageSourcePropType } from "react-native"

export const getMedalByLevel = (level: number | null): ImageSourcePropType => { 
    if (level === null) return Medal1;
    if (level >= 1 && level <= 5) return Medal1; // 5grade
    if (level >= 6 && level <= 10) return Medal2; // 4grade
    if (level >= 11 && level <= 15) return Medal3; // 3grade
    if (level >= 16 && level <= 20) return Medal4; // 2grade
    if (level >= 21 && level <= 25) return Medal5; // 1grade
    if (level >= 26 && level <= 30) return Medal6; // red
    if (level >= 31 && level <= 35) return Medal7; // orange
    if (level >= 36 && level <= 40) return Medal7; // yellow
    if (level >= 41 && level <= 45) return Medal7; // green
    if (level >= 46) return Medal7; // blue
  
    return Medal1; // 혹시 모를 fallback
  };
  