import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";

import TodoListBox from "@/components/main/TodoListBox";
import { TodoTableType } from "@/types/DBType";

jest.mock("@/utils/todoFunc", () => ({
  todoAdd: jest.fn((_title, _desc, onSuccess) => onSuccess()),
  todoUpdate: jest.fn((_todo, _title, _desc, onSuccess) => onSuccess()),
  todoDelete: jest.fn((_todo, onSuccess) => onSuccess()),
  todoComplete: jest.fn((_todo, onSuccess) => onSuccess()),
}));

jest.mock("@/supabaseClient", () => ({
  supabase: {
    auth: {
      getUser: jest.fn(async () => ({
        data: { user: { id: "dummy" } },
        error: null,
      })),
    },
    from: jest.fn(() => ({
      select: jest.fn().mockResolvedValue({ data: [], error: null }),
      update: jest.fn().mockResolvedValue({ data: null, error: null }),
      delete: jest.fn().mockResolvedValue({ data: null, error: null }),
      insert: jest.fn().mockResolvedValue({ data: null, error: null }),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({
        data: { current_exp: 0, level: 1 },
        error: null,
      }),
      upsert: jest.fn().mockResolvedValue({ data: null, error: null }),
    })),
  },
}));

jest.mock("react-native/Libraries/Image/Image", () => "Image");

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve(null)),
  clear: jest.fn(() => Promise.resolve(null)),
}));

describe("TodoListBox", () => {
  const todoListData: TodoTableType[] = [
    {
      todo_id: 1,
      title: "test1",
      description: "test1 설명",
      is_done: false,
      created_at: new Date(),
    },
    {
      todo_id: 2,
      title: "test2",
      description: "test2 설명",
      is_done: true,
      created_at: new Date(),
    },
  ];

  // todoList 타이틀 렌더링
  it("todoList 타이틀을 올바르게 렌더링한다.", () => {
    const { getByText } = render(
      <TodoListBox todoData={todoListData} reloadData={() => {}} />
    );

    expect(getByText("TodoList")).toBeTruthy();
  });

  // todo 데이터 렌더링
  it("todo 데이터를 올바르게 렌더링한다.", () => {
    const { getByText } = render(
      <TodoListBox todoData={todoListData} reloadData={() => {}} />
    );
    expect(getByText("test1")).toBeTruthy();
    expect(getByText("test2")).toBeTruthy();
  });

  // 모달창 오픈
  it("TodoBox 클릭 시 모달이 열리는지 확인한다", async () => {
    const { getByText, findByText } = render(
      <TodoListBox todoData={todoListData} reloadData={() => {}} />
    );
    fireEvent.press(getByText("test1"));
    const modalTitle = await findByText("Todo");
    expect(modalTitle).toBeTruthy();
  });

  // 모달 클로즈
  it("모달을 닫을 시 닫히는지 확인한다", async () => {
    const { getByText, getByTestId, findByText, queryByText } = render(
      <TodoListBox todoData={todoListData} reloadData={() => {}} />
    );

    fireEvent.press(getByText("test1"));
    const modalTitle = await findByText("Todo");
    expect(modalTitle).toBeTruthy();

    fireEvent.press(getByTestId("close-modal"));
    expect(queryByText("Todo")).toBeNull();
  });

  // Todo 추가 버튼 클릭
  it("Todo 추가 버튼 클릭 시 추가 모달이 열리는지 확인한다", async () => {
    const { getByText, findByText } = render(
      <TodoListBox todoData={todoListData} reloadData={() => {}} />
    );
    fireEvent.press(getByText("+"));
    const modalTitle = await findByText("Todo");
    expect(modalTitle).toBeTruthy();
  });

  it("등록 버튼을 누르면 reloadData가 호출된다", async () => {
    const reloadData = jest.fn();
    const { getByText, findByText } = render(
      <TodoListBox todoData={todoListData} reloadData={reloadData} />
    );

    fireEvent.press(getByText("+"));
    await findByText("Todo");
    fireEvent.press(getByText("등록"));

    await waitFor(() => {
      expect(reloadData).toHaveBeenCalled();
    });
  });

  it("todoData가 빈 배열이면 '등록된 할 일이 없습니다'를 렌더링한다", () => {
    const { getByText } = render(
      <TodoListBox todoData={[]} reloadData={() => {}} />
    );
    expect(getByText("등록된 할 일이 없습니다")).toBeTruthy();
  });

  it("todoData가 null이면 '등록된 할 일이 없습니다'를 렌더링한다", () => {
    const { getByText } = render(
      <TodoListBox todoData={null} reloadData={() => {}} />
    );
    expect(getByText("등록된 할 일이 없습니다")).toBeTruthy();
  });
});
