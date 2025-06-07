import TodoBox from "@/components/main/TodoBox";
import { TodoTableType } from "@/types/DBType";
import { todoComplete } from "@/utils/todoFunc";
import { fireEvent, render, waitFor } from "@testing-library/react-native";

jest.mock("@/supabaseClient", () => {
  return {
    supabase: {
      auth: {
        getUser: jest.fn(async () => ({
          data: { user: { id: "dummy" } },
          error: null,
        })),
      },
      from: jest.fn(() => ({
        update: jest.fn(() => ({ data: null, error: null })),
        eq: jest.fn(() => ({ data: null, error: null })),
      })),
    },
  };
});

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve(null)),
  clear: jest.fn(() => Promise.resolve(null)),
}));

jest.mock("expo-linear-gradient", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    LinearGradient: (props: any) => <View {...props} />,
  };
});

jest.mock("react-native/Libraries/Image/Image", () => "Image");

jest.mock("@/utils/todoFunc", () => ({
  todoAdd: jest.fn(),
  todoComplete: jest.fn(),
  todoDelete: jest.fn(),
  todoUpdate: jest.fn(),
}));

describe("TodoBox", () => {
  const todoData: TodoTableType[] = [
    {
      todo_id: 1,
      title: "미완료된 todo",
      description: "todo를 해야 해",
      is_done: false,
      created_at: new Date(),
    },
    {
      todo_id: 2,
      title: "완료된 todo",
      description: "todo를 완료했어",
      is_done: true,
      created_at: new Date(),
    },
  ];

  // todo 제목과 경험치 렌더링
  it("todo 제목과 경험치를 올바르게 렌더링한다.", () => {
    const { getByText } = render(
      <TodoBox key={1} todoData={todoData[0]} reloadData={() => {}} />
    );

    expect(getByText("미완료된 todo")).toBeTruthy();
    expect(getByText("+5 XP")).toBeTruthy();
  });

  // todo가 미완료일 때 스탬프 버튼 출력
  it("todo가 미완료 상태면 스탬프 버튼 이미지를 출력한다.", () => {
    const { getByTestId } = render(
      <TodoBox key={1} todoData={todoData[0]} reloadData={() => {}} />
    );

    expect(getByTestId("stamp-image")).toBeTruthy();
  });

  // todo가 완료일 때 완료 스탬프 출력
  it("todo가 완료 상태면 완료 스탬프 이미지를 출력한다.", () => {
    const { getByTestId } = render(
      <TodoBox key={2} todoData={todoData[1]} reloadData={() => {}} />
    );

    expect(getByTestId("complete-stamp-image")).toBeTruthy();
  });

  // 조건부로 오버레이 출력
  it("isDone의 boolean값으로 오버레이를 출력한다.", () => {
    const { getByTestId } = render(
      <TodoBox key={2} todoData={todoData[1]} reloadData={() => {}} />
    );

    expect(getByTestId("overlay")).toBeTruthy();

    const { queryByTestId: queryOverlay } = render(
      <TodoBox key={1} todoData={todoData[0]} reloadData={() => {}} />
    );

    expect(queryOverlay("overlay")).toBeNull();
  });

  // 스탬프 버튼 클릭 시 모달이 열리고 닫히기
  it("스탬프 버튼을 클릭 시 모달이 열리고, 모달을 닫으면 닫히는지 확인한다", async () => {
    const { getByTestId, findByText, queryByText } = render(
      <TodoBox key={1} todoData={todoData[0]} reloadData={() => {}} />
    );

    fireEvent.press(getByTestId("stamp-press"));

    const modalTitle = await findByText("Todo를 완료할래요?");
    expect(modalTitle).toBeTruthy();

    fireEvent.press(getByTestId("close-modal"));

    expect(queryByText("Todo를 완료할래요?")).toBeNull();
  });

  it("스탬프 버튼 클릭 후 완료 버튼을 누르면 reloadData가 호출된다", async () => {
    const reloadData = jest.fn();
    (todoComplete as unknown as jest.Mock).mockImplementation(
      (_, onSuccess) => {
        onSuccess();
      }
    );

    const { getByTestId, findByText, queryByText } = render(
      <TodoBox todoData={todoData[0]} reloadData={reloadData} />
    );

    fireEvent.press(getByTestId("stamp-press"));
    await findByText("Todo를 완료할래요?");

    const completeBtn = await findByText("완료");
    fireEvent.press(completeBtn);

    await waitFor(() => {
      expect(reloadData).toHaveBeenCalled();
    });

    expect(queryByText("Todo를 완료할래요?")).toBeNull();
  });
});
