import StateMsgBox from "@/components/mypage/StateMsgBox";
import { supabase } from "@/supabaseClient";
import { fireEvent, render } from "@testing-library/react-native";

jest.mock("@/supabaseClient", () => ({
  supabase: {
    auth: {
      getUser: jest.fn().mockResolvedValue({
        data: { user: { id: "user-id" } },
      }),
    },
    from: jest.fn(() => ({
      update: jest.fn(() => ({
        eq: jest.fn(() => ({
          select: jest.fn().mockResolvedValue({
            data: [{ state_msg: "테스팅상태메세지" }],
            error: { message: "상태메세지 update 실패" },
          }),
        })),
      })),
    })),
  },
}));

describe("StateMsgBox", () => {
  const testStateMsg = "테스팅상태메세지";

  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // 상태 메세지 렌더링
  it("상태 메세지가 정상적으로 렌더링된다", () => {
    const { getByText } = render(<StateMsgBox state_msg={testStateMsg} />);
    expect(getByText("테스팅상태메세지")).toBeTruthy();
  });

  // 입력 버튼 클릭 시 입력창 전환
  it("입력 버튼 클릭 시 텍스트에서 입력창으로 전환된다", () => {
    const { getByTestId, getByDisplayValue } = render(
      <StateMsgBox state_msg={testStateMsg} />
    );
    fireEvent.press(getByTestId("edit-btn"));
    expect(getByDisplayValue("테스팅상태메세지")).toBeTruthy();
  });

  // blur시 업데이트 요청
  it("입력창에서 벗어나면 상태메세지 업데이트를 요청한다", async () => {
    const { getByTestId, getByDisplayValue } = render(
      <StateMsgBox state_msg={testStateMsg} />
    );
    fireEvent.press(getByTestId("edit-btn"));
    const input = getByDisplayValue("테스팅상태메세지");
    fireEvent.changeText(input, "변경된메세지");
    fireEvent(input, "blur");
    await new Promise((resolve) => setTimeout(resolve, 400));
    expect(supabase.from).toHaveBeenCalledWith("user_info");
  });

  // 업데이트 실패 시
  it("업데이트 실패 시 console.error가 출력된다", async () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    const { getByTestId, getByDisplayValue } = render(
      <StateMsgBox state_msg="에러메세지" />
    );

    fireEvent.press(getByTestId("edit-btn"));
    const input = getByDisplayValue("에러메세지");
    fireEvent(input, "blur");

    await new Promise((resolve) => setTimeout(resolve, 400));

    expect(spy).toHaveBeenCalledWith("업데이트 실패", "상태메세지 update 실패");

    spy.mockRestore();
  });

  // 업데이트 성공 시 콘솔 출력
  it("업데이트 성공 시 console.log 및 onUpdated 콜백이 호출된다", async () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const mockUpdated = jest.fn();

    const mockSelect = jest.fn().mockResolvedValue({
      data: [{ state_msg: "성공메세지" }],
      error: null,
    });

    const mockEq = jest.fn(() => ({ select: mockSelect }));

    const mockUpdate = jest.fn(() => ({ eq: mockEq }));

    const mockFrom = {
      update: mockUpdate,
    };

    (supabase.from as jest.Mock).mockReturnValue(mockFrom);

    const { getByTestId, getByDisplayValue } = render(
      <StateMsgBox state_msg="초기값" onUpdated={mockUpdated} />
    );

    fireEvent.press(getByTestId("edit-btn"));
    const input = getByDisplayValue("초기값");
    fireEvent.changeText(input, "성공메세지");
    fireEvent(input, "blur");

    await new Promise((resolve) => setTimeout(resolve, 400));

    expect(logSpy).toHaveBeenCalledWith("업데이트 성공!");
    expect(mockUpdated).toHaveBeenCalled();

    logSpy.mockRestore();
  });

  // 상태메세지가 비어있을 시
  it("상태메세지가 비어있을 경우 기본 텍스트가 렌더링된다", () => {
    const { getByText } = render(<StateMsgBox state_msg="" />);
    expect(getByText("데이터 안들어옴")).toBeTruthy();
  });
});
