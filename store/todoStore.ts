import { TodoTableType } from "@/types/DBType";
import { create } from "zustand";

interface TodoState {
  todo: TodoTableType | null;
  mode: "create" | "read" | "isDone";
  setTodo: (todo: TodoTableType | null) => void;
  setMode: (mode: "create" | "read" | "isDone") => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todo: null,
  mode: "read",
  setTodo: (todo) => set({ todo }),
  setMode: (mode) => set({ mode }),
}));
