import { useTodoStore } from "@/store/todoStore";
import { supabase } from "@/supabaseClient";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ModalBtn from "../common/ModalBtn";
import ModalDesc from "../common/ModalDesc";
import ModalTitle from "../common/ModalTitle";

interface TodoModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const TodoModal = ({ visible, onClose, onSuccess }: TodoModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { todo, mode } = useTodoStore();

  const getUserId = async () => {
    const { data } = await supabase.auth.getUser();
    return data.user?.id;
  };

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [todo, visible]);

  // todo 수정
  const handleUpdate = async () => {
    try {
      const userId = await getUserId();
      const { error } = await supabase
        .from("todo")
        .update({ title, description })
        .eq("todo_id", todo?.todo_id);
      if (error) throw error;
      onSuccess();
    } catch (err: any) {
      console.error("수정 중 에러:", err);
      Alert.alert("수정 실패", err.message);
    }
  };

  // todo 삭제
  const handleDelete = async () => {
    if (!todo) return;
    try {
      const { error } = await supabase
        .from("todo")
        .delete()
        .eq("todo_id", todo.todo_id);

      if (error) throw error;
      onSuccess();
    } catch (err: any) {
      console.error("삭제 중 에러:", err);
      Alert.alert("삭제 실패", err.message);
    }
  };

  // todo 추가
  const handleAdd = async () => {
    try {
      const userId = await getUserId();
      const { error } = await supabase
        .from("todo")
        .insert([{ title, description, user_id: userId }]);

      if (error) throw error;
      onSuccess();
    } catch (err: any) {
      console.error("추가 중 에러:", err);
      Alert.alert("추가 실패", err.message);
    }
  };

  // todo 완료
  const handleComplete = async () => {
    if (!todo) {
      return Alert.alert("오류", "완료할 TODO 정보가 없습니다.");
    }

    try {
      const {
        data: { user },
        error: authErr,
      } = await supabase.auth.getUser();
      if (authErr || !user) throw authErr ?? new Error("로그인 필요");
      const userId = user.id;

      const { data: allDone, error: allDoneErr } = await supabase
        .from("todo")
        .select("todo_id, created_at")
        .eq("user_id", userId)
        .eq("is_done", true);
      if (allDoneErr) throw allDoneErr;

      const today = new Date().toISOString().slice(0, 10);
      const doneToday = allDone.filter(
        (t) => t.created_at?.slice(0, 10) === today
      );
      const doneCount = doneToday.length;

      const { error: completeErr } = await supabase
        .from("todo")
        .update({
          is_done: true,
          created_at: new Date().toISOString(),
        })
        .eq("todo_id", todo.todo_id);
      if (completeErr) throw completeErr;

      if (doneCount < 4) {
        const { data: ui, error: uiErr } = await supabase
          .from("user_info")
          .select("current_exp, level")
          .eq("user_id", userId)
          .single();
        if (uiErr || !ui) throw uiErr ?? new Error("유저 정보 로드 실패");

        let { current_exp, level } = ui;
        current_exp += 5;
        if (current_exp >= 100) {
          level += 1;
          current_exp -= 100;
        }

        const { error: expErr } = await supabase
          .from("user_info")
          .update({ current_exp, level })
          .eq("user_id", userId);
        if (expErr) throw expErr;
      }

      onSuccess();
    } catch (err: any) {
      console.error("완료 처리 중 에러:", err);
      Alert.alert("완료 실패", err.message);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose} testID="close-modal">
        <View className="flex-1 justify-center items-center bg-black/50">
          <TouchableWithoutFeedback
            onPress={(e) => e?.stopPropagation?.()}
            testID="modal-content"
          >
            <LinearGradient
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              colors={["#FFFFFF", "#FFF4EB", "#FFF8E9"]}
              style={{
                width: 400,
                padding: 10,
                borderRadius: 10,
              }}
            >
              {mode === "isDone" ? (
                <View>
                  <Text className="text-3xl font-bold text-center p-2">
                    Todo를 완료할래요?
                  </Text>
                  <ModalBtn label="완료" onPress={handleComplete} />
                </View>
              ) : (
                <>
                  <Text className="text-3xl font-bold text-center p-2">
                    Todo
                  </Text>
                  <ModalTitle title={title} onChange={setTitle} />
                  <ModalDesc
                    description={description}
                    onChange={setDescription}
                  />
                  {mode === "read" && todo?.is_done === false && (
                    <View className="flex-row justify-between">
                      <ModalBtn label="수정" onPress={handleUpdate} />
                      <ModalBtn label="삭제" onPress={handleDelete} />
                    </View>
                  )}
                  {mode === "create" && (
                    <ModalBtn label="등록" onPress={handleAdd} />
                  )}
                </>
              )}
            </LinearGradient>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default TodoModal;
