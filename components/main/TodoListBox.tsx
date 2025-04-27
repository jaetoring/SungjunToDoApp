import { TodoList } from "@/types/todoList";
import React from "react";
import { Text, View } from "react-native";
import BoxBg from "../common/BoxBg";
import TodoBox from "./TodoBox";
interface TodoListBoxProps {
  todoData: TodoList[];
}

const TodoListBox = ({ todoData }: TodoListBoxProps) => {
  return (
    <BoxBg>
      <View className="w-full flex-col px-5 py-4">
        <Text className="text-3xl font-bold mb-4">TodoList</Text>
        <View className="w-full">
          {todoData.map((todo) => (
            <TodoBox key={todo.id} todoData={todo} />
          ))}
        </View>
      </View>
      <View className="absolute right-0 bottom-0 w-full h-full bg-[#FF91B0] opacity-30 rounded-[20px]" />
    </BoxBg>
  );
};
export default TodoListBox;
