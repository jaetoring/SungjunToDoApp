import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Modal, Text, TouchableWithoutFeedback, View } from "react-native";
import ModalBtn from "../common/modalBtn";
import ModalDesc from "../common/modalDesc";
import ModalTitle from "../common/modalTitle";

interface TodoModalProps {
  visible: boolean;
  todo: { title: string; description: string } | null;
  onClose: () => void;
  mode: "create" | "read" | "update";
  onCreate?: (title: string, description: string) => void;
  onUpdate?: (title: string, description: string) => void;
  onDelete?: () => void;
}

const TodoModal = ({ visible, todo, onClose }: TodoModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = React.useState("");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [todo, visible]);

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
              {todo && (
                <>
                  <Text className="text-3xl font-bold text-center p-2">
                    Todo
                  </Text>
                  <ModalTitle title={todo.title} />
                  <ModalDesc description={todo.description} />
                  <ModalBtn label="등록" onPress={onClose} />
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
