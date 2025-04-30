import { TodoList } from '@/types/todoList';
import { create } from 'zustand';

interface TodoState {
  todo: TodoList | null;
  mode: 'create' | 'read' | 'isDone';
  setTodo: (todo: TodoList | null) => void;
  setMode: (mode: 'create' | 'read' | 'isDone') => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todo: null,
  mode: 'read',
  setTodo: (todo) => set({ todo }),
  setMode: (mode) => set({ mode }),
}));
