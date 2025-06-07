import TodoModal from "@/components/main/TodoModal";
import { useTodoStore } from "@/store/todoStore";
import {
  todoAdd,
  todoComplete,
  todoDelete,
  todoUpdate,
} from "@/utils/todoFunc";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

jest.mock("@/store/todoStore", () => ({
  useTodoStore: jest.fn(),
}));
jest.mock("@/utils/todoFunc", () => ({
  todoAdd: jest.fn(),
  todoComplete: jest.fn(),
  todoDelete: jest.fn(),
  todoUpdate: jest.fn(),
}));

describe("TodoModal 컴포넌트 테스트", () => {
  const mockOnClose = jest.fn();
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("visible가 false면 아무것도 렌더링되지 않아야 한다", () => {
    (useTodoStore as unknown as jest.Mock).mockReturnValue({
      todo: null,
      mode: "create",
    });
    const { queryByText } = render(
      <TodoModal
        visible={false}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );
    expect(queryByText("Todo")).toBeNull();
  });

  it("mode가 create일 때 등록버튼을 누르면 todoAdd가 호출된다", () => {
    (useTodoStore as unknown as jest.Mock).mockReturnValue({
      todo: null,
      mode: "create",
    });
    const { getByText } = render(
      <TodoModal
        visible={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );
    fireEvent.press(getByText("등록"));
    expect(todoAdd).toHaveBeenCalledWith("", "", mockOnSuccess);
  });

  it("mode가 read고 is_done이 false일 때 수정 버튼을 누르면 todoUpdate가 호출된다", () => {
    const testTodo = {
      todo_id: 1,
      title: "testTitle",
      description: "testDescription",
      is_done: false,
    };
    (useTodoStore as unknown as jest.Mock).mockReturnValue({
      todo: testTodo,
      mode: "read",
    });
    const { getByText } = render(
      <TodoModal
        visible={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );
    fireEvent.press(getByText("수정"));
    expect(todoUpdate).toHaveBeenCalledWith(
      testTodo,
      testTodo.title,
      testTodo.description,
      mockOnSuccess
    );
  });

  it("mode가 read고 is_done이 false일 때 삭제 버튼을 누르면 todoDelete가 호출된다", () => {
    const testTodo = {
      todo_id: 2,
      title: "testTitle",
      description: "testDescription",
      is_done: false,
    };
    (useTodoStore as unknown as jest.Mock).mockReturnValue({
      todo: testTodo,
      mode: "read",
    });
    const { getByText } = render(
      <TodoModal
        visible={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );
    fireEvent.press(getByText("삭제"));
    expect(todoDelete).toHaveBeenCalledWith(testTodo, mockOnSuccess);
  });

  it("mode가 isDone일 때 완료 버튼을 누르면 todoComplete가 호출된다", () => {
    const testTodo = {
      todo_id: 3,
      title: "testTitle",
      description: "testDescription",
      is_done: false,
    };
    (useTodoStore as unknown as jest.Mock).mockReturnValue({
      todo: testTodo,
      mode: "isDone",
    });
    const { getByText } = render(
      <TodoModal
        visible={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );
    fireEvent.press(getByText("완료"));
    expect(todoComplete).toHaveBeenCalledWith(testTodo, mockOnSuccess);
  });

  it("모달창 바깥을 누르면 onClose가 호출된다", () => {
    (useTodoStore as unknown as jest.Mock).mockReturnValue({
      todo: null,
      mode: "create",
    });
    const { getByTestId } = render(
      <TodoModal
        visible={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );
    fireEvent.press(getByTestId("close-modal"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("모달창 안쪽을 누르면 onClose가 호출되지 않는다", () => {
    (useTodoStore as unknown as jest.Mock).mockReturnValue({
      todo: null,
      mode: "create",
    });
    const { getByTestId } = render(
      <TodoModal
        visible={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );
    fireEvent.press(getByTestId("modal-content"));
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
