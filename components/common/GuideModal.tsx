import Daily7 from "@/assets/images/badge/daily1.png";
import Daily14 from "@/assets/images/badge/daily2.png";
import Daily21 from "@/assets/images/badge/daily3.png";
import Effort10 from "@/assets/images/badge/effort1.png";
import Effort20 from "@/assets/images/badge/effort2.png";
import Effort30 from "@/assets/images/badge/effort3.png";
import Level21_25 from "@/assets/images/medal/1grade.png";
import Level16_20 from "@/assets/images/medal/2grade.png";
import Level11_15 from "@/assets/images/medal/3grade.png";
import Level6_10 from "@/assets/images/medal/4grade.png";
import Level1_5 from "@/assets/images/medal/5grade.png";
import Level46_50 from "@/assets/images/medal/blueGrade.png";
import Level41_45 from "@/assets/images/medal/greenGrade.png";
import Level31_35 from "@/assets/images/medal/orangeGrade.png";
import Level26_30 from "@/assets/images/medal/redGrade.png";
import Level36_40 from "@/assets/images/medal/yellowGrade.png";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import LevelIconBox from "./LevelIconBox";
import BadgeIconBox from "./badgeIconBox";

interface GuideModalProps {
  visible: boolean;
  onClose: () => void;
}

const GuideModal = ({ visible, onClose }: GuideModalProps) => {
  const [page, setPage] = React.useState<number>(1);
  const { width: screenWidth } = Dimensions.get("window");

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={onClose} testID="close-modal">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="flex-1 justify-center items-center">
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <LinearGradient
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                colors={["#FFFFFF", "#FFF4EB", "#FFF8E9"]}
                style={{
                  width: Math.min(screenWidth * 0.9, 400),
                  padding: 20,
                  borderColor: "#F5CBA7",
                  borderWidth: 2,
                  borderRadius: 12,
                  alignItems: "center",
                  maxHeight: "90%",
                }}
              >
                {page === 1 ? (
                  // 1페이지
                  <View className="flex-col items-center">
                    <Text className="text-2xl font-bold text-center mb-4">
                      Todoo 가이드
                    </Text>
                    <View>
                      <Text className="text-base mb-2">
                        1. “+” 버튼을 눌러 새 할 일을 추가할 수 있어요.
                      </Text>
                      <Text className="text-base mb-2">
                        2. 할 일을 선택하여 수정하거나 삭제할 수 있어요.
                      </Text>
                      <Text className="text-base mb-2">
                        3. 스탬프를 눌러 할 일을 달성해봐요.
                      </Text>
                      <Text className="text-base mb-4">
                        4. 뱃지는 조건에 따라 자동으로 획득됩니다.
                      </Text>
                    </View>
                  </View>
                ) : (
                  // 2페이지
                  <ScrollView
                    contentContainerStyle={{ alignItems: "center" }}
                    className="w-full"
                  >
                    <View className="w-full mb-6">
                      <Text className="text-2xl font-semibold mb-2 text-center">
                        레벨 별 아이콘
                      </Text>
                      <Text className="text-base text-gray-600 mb-4 text-center">
                        레벨 구간에 따라 아이콘이 표시됩니다.
                      </Text>
                      <View className="w-full flex-row justify-around gap-3">
                        <LevelIconBox
                          levelRange="LV. 1~5"
                          imageSource={Level1_5}
                        />
                        <LevelIconBox
                          levelRange="LV. 6~10"
                          imageSource={Level6_10}
                        />
                        <LevelIconBox
                          levelRange="LV. 11~15"
                          imageSource={Level11_15}
                        />
                        <LevelIconBox
                          levelRange="LV. 16~20"
                          imageSource={Level16_20}
                        />
                        <LevelIconBox
                          levelRange="LV. 21~25"
                          imageSource={Level21_25}
                        />
                      </View>
                      <View className="w-full flex-row justify-around gap-3 mt-4">
                        <LevelIconBox
                          levelRange="LV. 26~30"
                          imageSource={Level26_30}
                        />
                        <LevelIconBox
                          levelRange="LV. 31~35"
                          imageSource={Level31_35}
                        />
                        <LevelIconBox
                          levelRange="LV. 36~40"
                          imageSource={Level36_40}
                        />
                        <LevelIconBox
                          levelRange="LV. 41~45"
                          imageSource={Level41_45}
                        />
                        <LevelIconBox
                          levelRange="LV. 46~"
                          imageSource={Level46_50}
                        />
                      </View>
                    </View>

                    {/* 뱃지 */}
                    <View className="w-full mb-4">
                      <Text className="text-2xl font-semibold mb-2 text-center">
                        뱃지
                      </Text>
                      <Text className="text-base text-gray-600 mb-4 text-center">
                        조건에 따라 아래 뱃지를 얻을 수 있어요.
                      </Text>
                      <View className="flex-row justify-around gap-4 mb-6">
                        <BadgeIconBox
                          badgeName="출석 I"
                          imageSource={Daily7}
                          description="7일 연속 출석"
                        />
                        <BadgeIconBox
                          badgeName="출석 II"
                          imageSource={Daily14}
                          description="14일 연속 출석"
                        />
                        <BadgeIconBox
                          badgeName="출석 III"
                          imageSource={Daily21}
                          description="21일 연속 출석"
                        />
                      </View>
                      <View className="flex-row justify-around gap-4 mb-6">
                        <BadgeIconBox
                          badgeName="노련함 I"
                          imageSource={Effort10}
                          description="todo 완료 10회"
                        />
                        <BadgeIconBox
                          badgeName="노련함 II"
                          imageSource={Effort20}
                          description="todo 완료 20회"
                        />
                        <BadgeIconBox
                          badgeName="노련함 III"
                          imageSource={Effort30}
                          description="todo 완료 30회"
                        />
                      </View>
                    </View>
                  </ScrollView>
                )}

                <View className="flex-row justify-between w-full px-4">
                  {page > 1 ? (
                    <TouchableOpacity
                      onPress={() => setPage(page - 1)}
                      activeOpacity={0.7}
                      className="py-2 px-4"
                    >
                      <Text className="text-xl">◀ 이전</Text>
                    </TouchableOpacity>
                  ) : (
                    <View className="w-20" />
                  )}

                  {page < 2 ? (
                    <TouchableOpacity
                      onPress={() => setPage(page + 1)}
                      activeOpacity={0.7}
                      className="py-2 px-4"
                    >
                      <Text className="text-xl">다음 ▶</Text>
                    </TouchableOpacity>
                  ) : (
                    <View className="w-20" />
                  )}
                </View>
              </LinearGradient>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default GuideModal;
