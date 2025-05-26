import TodoModal from "@/components/main/TodoModal";
import { useTodoStore } from "@/store/todoStore";
import { TodoTableType } from "@/types/DBType";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import CompleteStamp from "../../assets/images/common/completeStamp.png";
import Stamp from "../../assets/images/common/stamp.png";

interface TodoBoxProps {
  todoData: TodoTableType;
  onPress?: () => void;
}

const TodoBox = ({ todoData, onPress }: TodoBoxProps) => {
  const [modalOn, setModalOn] = useState(false);
  const setMode = useTodoStore((state) => state.setMode);

  const handleStampPress = () => {
    setModalOn(true);
    setMode("isDone");
  };

  const closeModal = () => {
    setModalOn(false);
  };

  return (
    <>
      <TouchableOpacity
        key={todoData.todo_id}
        onPress={onPress}
        style={{
          marginBottom: 10,
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          zIndex: 3,
          borderRadius: 10,
        }}
      >
        <LinearGradient
          colors={["#FF91B0", "#FFBE84"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#E5E7EB",
            padding: 12,
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text className="text-[18px] mb-5 font-bold">{todoData.title}</Text>
            <Text className="text-[16px]">+5 XP</Text>
          </View>
          {todoData.is_done ? (
            <Image
              source={CompleteStamp}
              style={{
                width: 70,
                height: 70,
                position: "absolute",
                right: 5,
                top: "50%",
                transform: [{ translateY: -22 }],
                zIndex: 2,
              }}
              testID="complete-stamp-image"
            />
          ) : (
            <TouchableOpacity onPress={handleStampPress} testID="stamp-press">
              <Image
                source={Stamp}
                style={{ width: 40, height: 40, marginRight: 10 }}
                testID="stamp-image"
              />
            </TouchableOpacity>
          )}
        </LinearGradient>

        {todoData.is_done && (
          <View
            className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 rounded-[10px]"
            style={{ zIndex: 1 }}
            testID="overlay"
          />
        )}
      </TouchableOpacity>

      <TodoModal visible={modalOn} onClose={closeModal} />
    </>
  );
};
export default TodoBox;
