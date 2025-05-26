import React from "react";
import { Modal, TouchableWithoutFeedback, View } from "react-native";

interface TodoModalProps {
  visible: boolean;
  onClose: () => void;
}

const GuideModal = ({ visible, onClose }: TodoModalProps) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose} testID="close-modal">
        <View className="flex-1 justify-center items-center bg-black/50"></View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default GuideModal;
