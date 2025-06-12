import { useTodoStore } from "@/store/todoStore";
import {
  todoAdd,
  todoComplete,
  todoDelete,
  todoUpdate,
} from "@/utils/todoFunc";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Dimensions,
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
  const { width: screenWidth } = Dimensions.get("window");

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
  const handleUpdate = () => {
    todoUpdate(todo, title, description, onSuccess);
  };

  // todo 삭제
  const handleDelete = () => {
    todoDelete(todo, onSuccess);
  };

  // todo 추가
  const handleAdd = async () => {
    todoAdd(title, description, onSuccess);
  };

  // todo 완료
  const handleComplete = async () => {
    todoComplete(todo, onSuccess);
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
                width: Math.min(screenWidth * 0.9, 400),
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
