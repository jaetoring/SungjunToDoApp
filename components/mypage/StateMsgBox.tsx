import StateEditIcon from "@/assets/images/common/stateEdit.png";
import { supabase } from "@/supabaseClient";
import { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import BoxBg from "../common/BoxBg";

interface StateMsgBoxProps {
  state_msg: string;
  onUpdated?: () => void;
}

const StateMsgBox = ({ state_msg, onUpdated }: StateMsgBoxProps) => {
  const [editing, setEditing] = useState(false);
  const [newMsg, setNewMsg] = useState(state_msg);

  const getUserId = async () => {
    const { data } = await supabase.auth.getUser();
    return data.user?.id;
  };

  const handleEditing = () => {
    setEditing(true);
  };

  const handleBlur = async () => {
    setEditing(false);

    setTimeout(async () => {
      console.log("저장 직전 newMsg 값:", newMsg);
      const userId = await getUserId();
      console.log("userId:", userId);

      const { data, error } = await supabase
        .from("user_info")
        .update({ state_msg: newMsg })
        .eq("user_id", userId)
        .select();

      console.log("업데이트 결과:", data);

      if (error) {
        console.error("업데이트 실패", error.message);
      } else {
        console.log("업데이트 성공!");
        if (onUpdated) onUpdated();
      }
    }, 300);
  };

  useEffect(() => {
    setNewMsg(state_msg);
  }, [state_msg]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <BoxBg>
        {/* 상태 메세지 헤더 */}
        <View className="flex-row justify-between py-2 px-4">
          <View className="flex-row items-center">
            <Text className="text-xl font-bold mr-2">상태 메세지</Text>
            <Text className="text-xs text-gray-500">({newMsg.length} / 50)</Text>
          </View>
          <TouchableOpacity onPress={handleEditing}>
            <Image source={StateEditIcon} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
        </View>
        {/* 상태 메세지 컨텐츠 */}
        <View className="px-4 pb-4">
          {editing ? (
            <TextInput
              value={newMsg}
              onChangeText={setNewMsg}
              onBlur={handleBlur}
              maxLength={50}
              autoFocus
              className="text-lg border border-gray-300 rounded-md px-2 py-1"
            />
          ) : (
            <Text className="text-lg">{newMsg || "데이터 안들어옴"}</Text>
          )}
        </View>
      </BoxBg>
    </TouchableWithoutFeedback>
  );
};
export default StateMsgBox;
