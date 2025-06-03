// components/common/BadgeModal.tsx

import { supabase } from "@/supabaseClient";
import { BadgeTableType, UserBadgeTableType } from "@/types/DBType";
import { convertBadgeIcon } from "@/utils/badgeIconMap";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import {
  Image,
  Modal,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ModalBtn from "../common/ModalBtn";

interface BadgeModalProps {
  visible: boolean;
  badge: UserBadgeTableType | null;
  onClose: () => void;
}

const BadgeModal = ({ visible, badge, onClose }: BadgeModalProps) => {
  const [getBadge, setGetBadge] = React.useState<BadgeTableType | null>(null);

  useEffect(() => {
    if (!visible || !badge) {
      setGetBadge(null);
      return;
    }

    supabase
      .from("badge")
      .select("*")
      .eq("badge_id", badge.badge_id)
      .single()
      .then(({ data }) => {
        setGetBadge(data);
      });
  }, [visible, badge]);

  if (!visible || !badge || !getBadge) return null;

  const badgeIcon = convertBadgeIcon(getBadge.icon_url);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-center items-center">
        <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
          <LinearGradient
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            colors={["#FFFFFF", "#FFF4EB", "#FFF8E9"]}
            style={{
              width: 360,
              padding: 20,
              borderColor: "#F5CBA7",
              borderWidth: 2,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Text className="text-3xl font-bold text-center mb-4">
              뱃지 획득!
            </Text>
            <Image
              source={badgeIcon}
              style={{ width: 100, height: 100, marginBottom: 12 }}
              resizeMode="contain"
            />
            <Text className="text-xl font-semibold mb-2">{getBadge?.name}</Text>
            <Text className="text-base text-gray-600 mb-4">
              획득일:{" "}
              {badge.obtained_at instanceof Date
                ? badge.obtained_at.toLocaleString()
                : String(badge.obtained_at)}
            </Text>
            <ModalBtn label="확인" onPress={onClose} />
          </LinearGradient>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export default BadgeModal;
