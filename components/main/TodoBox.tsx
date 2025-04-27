import { TodoList } from "@/types/todoList";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, View } from "react-native";
import CompleteStamp from "../../assets/images/common/completeStamp.png";
import Stamp from "../../assets/images/common/stamp.png";

interface TodoBoxProps {
  todoData: TodoList;
}

const TodoBox = ({ todoData }: TodoBoxProps) => {
  return (
    <View key={todoData.id} className="relative mb-2">
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
        {todoData.isDone ? (
          <Image
            source={CompleteStamp}
            style={{
              width: 70,
              height: 70,
              position: "absolute",
              right: 5,
              top: "50%",
              transform: [{ translateY: -22 }],
              zIndex: 10,
            }}
            testID="complete-stamp-image"
          />
        ) : (
          <Image
            source={Stamp}
            style={{ width: 40, height: 40, marginRight: 10 }}
            testID="stamp-image"
          />
        )}
      </LinearGradient>

      {todoData.isDone && (
        <View
          className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 rounded-[10px]"
          style={{ zIndex: 1 }}
          testID="overlay"
        />
      )}
    </View>
  );
};
export default TodoBox;
