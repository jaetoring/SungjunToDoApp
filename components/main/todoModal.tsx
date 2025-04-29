import { useTodoStore } from "@/store/todoStore";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Modal, Text, TouchableWithoutFeedback, View } from "react-native";
import ModalBtn from "../common/modalBtn";
import ModalDesc from "../common/modalDesc";
import ModalTitle from "../common/modalTitle";

interface TodoModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate?: (title: string, description: string) => void;
  onUpdate?: (title: string, description: string) => void;
  onDelete?: () => void;
}

const TodoModal = ({
  visible,
  onClose,
  onCreate,
  onUpdate,
  onDelete,
}: TodoModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { todo, mode, setMode } = useTodoStore();

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [todo, visible]);

  const handleUpdate = () => {
    console.log(
      `이 후 해당 값으로 수정되야 해! title=${title} description=${description}`
    );
  };

  const handleDelete = () => {
    console.log("해당 todo.id에 맞게 삭제");
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
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
                  <ModalBtn label="삭제" onPress={handleDelete} />
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
                    <ModalBtn label="등록" onPress={onClose} />
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
