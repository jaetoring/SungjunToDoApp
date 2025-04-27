import { ExpType } from "@/types/expType";
import { Text, View } from "react-native";
import BoxBg from "../common/BoxBg";
import OneExp from "./OneExp";

interface ExpTypeProps {
  expData: ExpType;
}

const ExpBox = ({ expData }: ExpTypeProps) => {
  // 레벨업 시 경험치 분배
  const levelUpCount = Math.floor(expData.currentExp / expData.maxExp);
  const newLevel = expData.level + levelUpCount;
  const newRemainExp = expData.currentExp % expData.maxExp;

  // 경험치 나누기
  const oneBlockExp = expData.maxExp / 10;
  const fullBlocks = Math.floor(newRemainExp / oneBlockExp);
  const remainExp = newRemainExp % oneBlockExp;
  const remainFillExp = remainExp / oneBlockExp;

  return (
    <BoxBg>
      <View className="w-full flex-col px-5 py-4">
        <View className="w-full flex-row justify-between mb-4">
          <Text className="text-3xl font-bold">EXP Bar</Text>
          {/* 테스팅 코드 레벨업 시 레벨 표시*/}
          <Text
            testID="exp-level"
            className="text-3xl font-bold"
            style={{ opacity: 0 }}
          >
            LV.{newLevel}
          </Text>
          <Text className="text-xl font-light">
            ({newRemainExp} / {expData.maxExp}XP)
          </Text>
        </View>
        <View className="w-full flex-row flex-wrap" testID="exp-bar">
          {Array.from({ length: 10 }).map((_, index) => {
            let fillBox = 0;
            if (index < fullBlocks) fillBox = 1;
            else if (index === fullBlocks) fillBox = remainFillExp;

            return (
              <View key={index} className="flex-1">
                <OneExp fillBox={fillBox} />
              </View>
            );
          })}
        </View>
      </View>
    </BoxBg>
  );
};
export default ExpBox;
