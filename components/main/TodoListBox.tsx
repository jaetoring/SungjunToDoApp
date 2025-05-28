import TodoModal from "@/components/main/TodoModal";
import { useTodoStore } from "@/store/todoStore";
import { TodoTableType } from "@/types/DBType";
import React, { useState } from "react";
import { Text, View } from "react-native";
import BoxBg from "../common/BoxBg";
import TodoAddBtn from "../common/TodoAddBtn";
import TodoBox from "./TodoBox";
interface TodoListBoxProps {
  todoData: TodoTableType[] | null;
}

const TodoListBox = ({ todoData }: TodoListBoxProps) => {
  const [modalOn, setModalOn] = useState(false);
  const setTodo = useTodoStore((state) => state.setTodo);
  const setMode = useTodoStore((state) => state.setMode);

  const handleTodoModal = (todo: TodoTableType) => {
    setModalOn(true);
    setTodo(todo);
    setMode("read");
  };

  const closeModal = () => {
    setModalOn(false);
    setTodo(null);
    setMode("read");
  };

  const hadleAddTodo = () => {
    setModalOn(true);
    setTodo(null);
    setMode("create");
  };

  return (
    <>
      <BoxBg>
        <View className="w-full flex-col px-5 pt-4">
          <Text className="text-3xl font-bold mb-4">TodoList</Text>
          <View className="w-full">
            {todoData?.map((todo) => (
              <TodoBox
                key={todo.todo_id}
                todoData={todo}
                onPress={() => handleTodoModal(todo)}
              />
            ))}
          </View>
        </View>

        <View className="items-center justify-center mb-4">
          <TodoAddBtn onPress={() => hadleAddTodo()} />
        </View>
      </BoxBg>
      <TodoModal visible={modalOn} onClose={closeModal} />
    </>
  );
};
export default TodoListBox;
