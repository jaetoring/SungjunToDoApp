import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import TodoListBox from "@/components/main/TodoListBox";
import { TodoTableType } from "@/types/DBType";
import { jest } from "@jest/globals";

jest.mock("react-native/Libraries/Image/Image", () => "Image");

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
    const { getByText } = render(<TodoListBox todoData={todoListData} />);

    expect(getByText("TodoList")).toBeTruthy();
  });

  // todo 데이터 렌더링
  it("todo 데이터를 올바르게 렌더링한다.", () => {
    const { getByText } = render(<TodoListBox todoData={todoListData} />);
    expect(getByText("test1")).toBeTruthy();
    expect(getByText("test2")).toBeTruthy();
  });

  // 모달창 오픈
  it("TodoBox 클릭 시 모달이 열리는지 확인한다", async () => {
    const { getByText, findByText } = render(
      <TodoListBox todoData={todoListData} />
    );
    fireEvent.press(getByText("test1"));
    const modalTitle = await findByText("Todo");
    expect(modalTitle).toBeTruthy();
  });

  // 모달 클로즈
  it("모달을 닫을 시 닫히는지 확인한다", async () => {
    const { getByText, getByTestId, findByText, queryByText } = render(
      <TodoListBox todoData={todoListData} />
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
      <TodoListBox todoData={todoListData} />
    );
    fireEvent.press(getByText("+"));
    const modalTitle = await findByText("Todo");
    expect(modalTitle).toBeTruthy();
  });
});
