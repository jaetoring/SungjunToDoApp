import { useTodoStore } from "@/store/todoStore";
import { supabase } from "@/supabaseClient";
import {
  todoAdd,
  todoComplete,
  todoDelete,
  todoUpdate,
} from "@/utils/todoFunc";
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
    if (!todo) {
      Alert.alert("오류", "수정할 TODO가 없습니다.");
      return;
    }
    try {
      await todoUpdate(todo.todo_id, title, description);
      onSuccess();
    } catch (err: unknown) {
      console.error("수정 중 에러:", err);
      const message = err instanceof Error ? err.message : String(err);
      Alert.alert("수정 실패", message);
    }
  };

  // todo 삭제
  const handleDelete = async () => {
    if (!todo) {
      return Alert.alert("오류", "삭제할 TODO가 없습니다.");
    }
    try {
      await todoDelete(todo.todo_id);
      onSuccess();
    } catch (err: unknown) {
      console.error("삭제 중 에러:", err);
      const message = err instanceof Error ? err.message : String(err);
      Alert.alert("삭제 실패", message);
    }
  };

  // todo 추가
  const handleAdd = async () => {
    try {
      const userId = await getUserId();
      if (!userId) throw new Error("로그인 필요");
      await todoAdd(userId, title, description);
      onSuccess();
    } catch (err: unknown) {
      console.error("추가 중 에러:", err);
      const message = err instanceof Error ? err.message : String(err);
      Alert.alert("추가 실패", message);
    }
  };

  // todo 완료
  const handleComplete = async () => {
    if (!todo) {
      return Alert.alert("오류", "완료할 TODO 정보가 없습니다.");
    }

    try {
      const userId = await getUserId();
      if (!userId) throw new Error("로그인 필요");

      await todoComplete(todo.todo_id, userId);
      onSuccess();
    } catch (err: unknown) {
      console.error("완료 처리 중 에러:", err);
      const message = err instanceof Error ? err.message : String(err);
      Alert.alert("완료 실패", message);
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
