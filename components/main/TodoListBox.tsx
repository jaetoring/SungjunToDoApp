import { TodoList } from "@/types/todoList";
import React, { useState } from "react";
import { Text, View } from "react-native";
import BoxBg from "../common/BoxBg";
import TodoBox from "./TodoBox";
import TodoModal from "./todoModal";
interface TodoListBoxProps {
  todoData: TodoList[];
}

const TodoListBox = ({ todoData }: TodoListBoxProps) => {
  const [modalOn, setModalOn] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<TodoList | null>(null);

  const handleTodoModal = (todo: TodoList) => {
    console.log("들어오나");
    setModalOn(true);
    setSelectedTodo(todo);
  };

  const closeModal = () => {
    setModalOn(false);
    setSelectedTodo(null);
  };

  return (
    <>
      <BoxBg>
        <View className="w-full flex-col px-5 py-4">
          <Text className="text-3xl font-bold mb-4">TodoList</Text>
          <View className="w-full">
            {todoData.map((todo) => (
              <TodoBox
                key={todo.id}
                todoData={todo}
                onPress={() => handleTodoModal(todo)}
              />
            ))}
          </View>
        </View>
        <View className="absolute right-0 bottom-0 w-full h-full bg-[#FF91B0] opacity-30 rounded-[20px]" />
      </BoxBg>

      <TodoModal
        mode="create"
        visible={modalOn}
        todo={selectedTodo}
        onClose={closeModal}
      />
    </>
  );
};
export default TodoListBox;
