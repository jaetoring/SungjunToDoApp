import Signup from "@/app/signup";
import { supabase } from "@/supabaseClient";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { Alert } from "react-native";

const mockPush = jest.fn();

// ✅ 라우터 모킹
jest.mock("expo-router", () => ({ useRouter: () => ({ push: mockPush }) }));

// ✅ supabase 모킹 (auth + from 체이닝 포함)
jest.mock("@/supabaseClient", () => {
  const mockSelect = jest.fn().mockReturnThis();
  const mockEq = jest.fn().mockResolvedValue({ data: [], error: null });

  return {
    supabase: {
      auth: {
        signUp: jest.fn(),
      },
      from: jest.fn(() => ({
        select: mockSelect,
        eq: mockEq,
      })),
    },
  };
});

describe("Signup", () => {
  beforeEach(() => jest.clearAllMocks());

  // 정규식에 어긋나거나, 입력 창을 채우지 않을 시
  it("정규식에 어긋나거나, 입력창을 채우지 않으면 버튼이 비활성화되야 한다.", () => {
    const { getByTestId } = render(<Signup />);
    const signupBtn = getByTestId("signup-button");

    expect(signupBtn.props.accessibilityState?.disabled).toBe(true);
  });

  // 회원가입 성공 시
  it("회원가입에 성공하면 이메일 인증 alert이 떠야 한다", async () => {
    const alertSpy = jest.spyOn(Alert, "alert");

    (supabase.from as jest.Mock).mockReturnValue({
      select: () => ({
        eq: () => Promise.resolve({ data: [], error: null }),
      }),
    });

    (supabase.auth.signUp as jest.Mock).mockResolvedValue({
      data: { user: { id: "1" } },
      error: null,
    });

    const { getByPlaceholderText, getByText } = render(<Signup />);
    fireEvent.changeText(getByPlaceholderText("이메일"), "test@test.com");
    fireEvent.changeText(getByPlaceholderText("비밀번호"), "test123@");
    fireEvent.changeText(getByPlaceholderText("비밀번호 확인"), "test123@");
    fireEvent.press(getByText("회원가입"));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        "이메일 인증 필요",
        "로그인 하려면 이메일 인증이 필요합니다. 메일함을 확인해 주세요.",
        expect.any(Array)
      );
    });

    alertSpy.mockRestore();
  });

  // 가입한 이메일로 재가입 시
  it("user 테이블에 이미 이메일이 있으면 중복 alert이 떠야한다", async () => {
    const alertSpy = jest.spyOn(Alert, "alert");

    (supabase.from as jest.Mock).mockReturnValue({
      select: () => ({
        eq: () =>
          Promise.resolve({
            data: [{ user_id: "1" }],
            error: null,
          }),
      }),
    });

    const { getByPlaceholderText, getByText } = render(<Signup />);
    fireEvent.changeText(getByPlaceholderText("이메일"), "test@test.com");
    fireEvent.changeText(getByPlaceholderText("비밀번호"), "test123@");
    fireEvent.changeText(getByPlaceholderText("비밀번호 확인"), "test123@");
    fireEvent.press(getByText("회원가입"));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        "중복된 이메일",
        "이미 가입된 이메일입니다."
      );
    });

    alertSpy.mockRestore();
  });

  // 회원가입 실패 시
  it("회원가입 실패 시 실패 alert이 떠야한다.", async () => {
    const alertSpy = jest.spyOn(Alert, "alert");

    (supabase.from as jest.Mock).mockReturnValue({
      select: () => ({
        eq: () => Promise.resolve({ data: [], error: null }),
      }),
    });

    (supabase.auth.signUp as jest.Mock).mockResolvedValue({
      data: null,
      error: { message: "이미 존재하는 이메일입니다." },
    });

    const { getByPlaceholderText, getByText } = render(<Signup />);
    fireEvent.changeText(getByPlaceholderText("이메일"), "test@test.com");
    fireEvent.changeText(getByPlaceholderText("비밀번호"), "test123@");
    fireEvent.changeText(getByPlaceholderText("비밀번호 확인"), "test123@");
    fireEvent.press(getByText("회원가입"));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        "회원가입 실패",
        "이미 존재하는 이메일입니다."
      );
    });

    alertSpy.mockRestore();
  });
});
