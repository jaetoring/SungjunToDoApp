import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import TodoBox from "@/components/main/TodoBox";
import { jest } from "@jest/globals";

jest.mock("react-native/Libraries/Image/Image", () => "Image");

describe("TodoBox", () => {
  const todoData = [
    {
      id: 1,
      title: "미완료된 todo",
      description: "todo를 해야 해",
      isDone: false,
    },
    {
      id: 2,
      title: "완료된 todo",
      description: "todo를 완료했어",
      isDone: true,
    },
  ];

  // todo 제목과 경험치 렌더링
  it("todo 제목과 경험치를 올바르게 렌더링한다.", () => {
    const { getByText } = render(<TodoBox key={1} todoData={todoData[0]} />);

    expect(getByText("미완료된 todo")).toBeTruthy();
    expect(getByText("+5 XP")).toBeTruthy();
  });

  // todo가 미완료일 때 스탬프 버튼 출력
  it("todo가 미완료 상태면 스탬프 버튼 이미지를 출력한다.", () => {
    const { getByTestId } = render(<TodoBox todoData={todoData[0]} />);

    expect(getByTestId("stamp-image")).toBeTruthy();
  });

  // todo가 완료일 때 완료 스탬프 출력
  it("todo가 완료 상태면 완료 스탬프 이미지를 출력한다.", () => {
    const { getByTestId } = render(<TodoBox todoData={todoData[1]} />);

    expect(getByTestId("complete-stamp-image")).toBeTruthy();
  });

  // 조건부로 오버레이 출력
  it("isDone의 boolean값으로 오버레이를 출력한다.", () => {
    const { getByTestId } = render(<TodoBox todoData={todoData[1]} />);

    expect(getByTestId("overlay")).toBeTruthy();

    const { queryByTestId: queryOverlay } = render(
      <TodoBox todoData={todoData[0]} />
    );

    expect(queryOverlay("overlay")).toBeNull();
  });

  // 스탬프 버튼 클릭 시 모달이 열리고 닫히기
  it("스탬프 버튼을 클릭 시 모달이 열리고, 모달을 닫을 시 닫히는지 확인한다", async () => {
    const { getByTestId, findByText, queryByText } = render(
      <TodoBox todoData={todoData[0]} />
    );

    fireEvent.press(getByTestId("stamp-press"));
    const modalTitle = await findByText("Todo를 완료할래요?");
    expect(modalTitle).toBeTruthy();

    fireEvent.press(getByTestId("close-modal"));
    expect(queryByText("Todo")).toBeNull();
  });
});
