import { useTodoStore } from "@/store/todoStore";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Modal, Text, TouchableWithoutFeedback, View } from "react-native";
import ModalBtn from "../common/ModalBtn";
import ModalDesc from "../common/ModalDesc";
import ModalTitle from "../common/ModalTitle";

interface TodoModalProps {
  visible: boolean;
  onClose: () => void;
}

const TodoModal = ({ visible, onClose }: TodoModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { todo, mode } = useTodoStore();

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
    console.log(
      `이 후 해당 값으로 수정되야 해! title=${title} description=${description}`
    );
  };

  // todo 삭제
  const handleDelete = () => {
    console.log("해당 todo.id에 맞게 삭제");
  };

  // todo 추가
  const handleAdd = () => {
    console.log("새로운 Todo 추가");
  };

  // todo 완료
  const handleComplete = () => {
    console.log("해당 Todo 완료");
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
                  {mode === "read" && todo?.isDone === false && (
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
