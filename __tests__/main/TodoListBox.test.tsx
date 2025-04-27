import { render } from "@testing-library/react-native";
import React from "react";

import TodoListBox from "@/components/main/TodoListBox";
import { jest } from "@jest/globals";

jest.mock("react-native/Libraries/Image/Image", () => "Image");

describe("TodoListBox", () => {
  const todoListData = [
    {
      id: 1,
      title: "test1",
      description: "test1 설명",
      isDone: false,
    },
    {
      id: 2,
      title: "test2",
      description: "test2 설명",
      isDone: true,
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
});
