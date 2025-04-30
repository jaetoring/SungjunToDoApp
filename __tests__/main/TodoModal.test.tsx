import TodoModal from "@/components/main/TodoModal";
import { useTodoStore } from "@/store/todoStore";
import { jest } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react-native";

jest.mock("@/store/todoStore");

describe("TodoModal", () => {
  const mockTodo = {
    id: 1,
    title: "test1",
    description: "test1 설명",
    isDone: false,
  };

  beforeEach(() => {
    (useTodoStore as unknown as jest.Mock).mockReturnValue({
      todo: mockTodo,
      setMode: jest.fn(),
    });

    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  // 완료 모달 생성
  it("mode가 isDone일 때 완료 문구와 삭제 버튼이 보인다.", () => {
    (useTodoStore as unknown as jest.Mock).mockReturnValue({
      todo: mockTodo,
      mode: "isDone",
      setMode: jest.fn(),
    });

    const { getByText } = render(
      <TodoModal visible={true} onClose={jest.fn()} />
    );

    expect(getByText("Todo를 완료할래요?")).toBeTruthy();
    expect(getByText("삭제")).toBeTruthy();
  });

  // 읽기 모달창 생성
  it("mode가 read일 때 'Todo' 제목과 수정/삭제 버튼이 보인다.", () => {
    (useTodoStore as unknown as jest.Mock).mockReturnValue({
      todo: mockTodo,
      mode: "read",
      setMode: jest.fn(),
    });

    const { getByText } = render(
      <TodoModal visible={true} onClose={jest.fn()} />
    );

    expect(getByText("Todo")).toBeTruthy();
    expect(getByText("수정")).toBeTruthy();
    expect(getByText("삭제")).toBeTruthy();
  });

  // 등록 모달창 생성
  it("mode가 create일 때 등록 버튼이 보인다.", () => {
    (useTodoStore as unknown as jest.Mock).mockReturnValue({
      todo: mockTodo,
      mode: "create",
      setMode: jest.fn(),
    });

    const { getByText } = render(
      <TodoModal visible={true} onClose={jest.fn()} />
    );

    expect(getByText("등록")).toBeTruthy();
  });

  // 수정 버튼 이벤트
  it("수정 버튼 클릭 시 handleUpdate가 호출된다.", () => {
    (useTodoStore as unknown as jest.Mock).mockReturnValue({
      todo: mockTodo,
      mode: "read",
      setMode: jest.fn(),
    });

    const { getByText } = render(
      <TodoModal visible={true} onClose={jest.fn()} />
    );

    const updateButton = getByText("수정");
    fireEvent.press(updateButton);
    expect(console.log).toHaveBeenCalledWith(
      `이 후 해당 값으로 수정되야 해! title=test1 description=test1 설명`
    );
  });

  // 삭제 버튼 이벤트
  it("삭제 버튼 클릭 시 handleDelete가 호출된다.", () => {
    (useTodoStore as unknown as jest.Mock).mockReturnValue({
      todo: mockTodo,
      mode: "read",
      setMode: jest.fn(),
    });

    const { getByText } = render(
      <TodoModal visible={true} onClose={jest.fn()} />
    );

    const deleteButton = getByText("삭제");
    fireEvent.press(deleteButton);
    expect(console.log).toHaveBeenCalledWith("해당 todo.id에 맞게 삭제");
  });

  // 오버레이 클릭 시 모달 닫기
  it("모달창 외부 오버레이 클릭 시 모달이 닫힌다.", () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <TodoModal visible={true} onClose={onClose} />
    );

    const closeModalArea = getByTestId("close-modal");
    fireEvent.press(closeModalArea);

    expect(onClose).toHaveBeenCalled();
  });

  // 모달 내부를 눌렀을 때 모달이 닫히지 않아야 함
  it("모달 내부 클릭 시 onClose가 호출되지 않는다.", () => {
    const onClose = jest.fn();

    (useTodoStore as unknown as jest.Mock).mockReturnValue({
      todo: mockTodo,
      mode: "read",
      setMode: jest.fn(),
    });

    const { getByTestId } = render(
      <TodoModal visible={true} onClose={onClose} />
    );

    const modalContent = getByTestId("modal-content");

    fireEvent.press(modalContent);

    expect(onClose).not.toHaveBeenCalled();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
