import Signup from "@/app/signup";
import { supabase } from "@/supabaseClient";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { Alert } from "react-native";

jest.setTimeout(10000);
const mockPush = jest.fn();
jest.mock("expo-router", () => ({
  useRouter: () => ({ push: mockPush }),
}));
jest.mock("@/supabaseClient", () => {
  const mockSelect = jest.fn().mockReturnThis();
  const mockEq = jest.fn().mockResolvedValue({ data: [], error: null });
  return {
    supabase: {
      auth: { signUp: jest.fn() },
      from: jest.fn(() => ({ select: mockSelect, eq: mockEq })),
    },
  };
});

interface MockUserRow {
  user_id: string;
}
interface SupabaseError {
  message: string;
}

describe("Signup", () => {
  const userData = {
    email: "test@test.com",
    password: "test123@",
    id: "1",
  };

  //버튼 이벤트 하나로 묶어둠
  const inputAndSubmit = (renderResult: ReturnType<typeof render>) => {
    const { getByPlaceholderText, getByText } = renderResult;
    fireEvent.changeText(getByPlaceholderText("이메일"), userData.email);
    fireEvent.changeText(getByPlaceholderText("비밀번호"), userData.password);
    fireEvent.changeText(
      getByPlaceholderText("비밀번호 확인"),
      userData.password
    );
    fireEvent.press(getByText("회원가입"));
  };

  // 수파베이스 쿼리 로직 더미
  const mockSupabaseSelect = (
    data: MockUserRow[] | null,
    error: SupabaseError | null = null
  ) => {
    (supabase.from as jest.Mock).mockReturnValue({
      select: () => ({
        eq: () => Promise.resolve({ data, error }),
      }),
    });
  };

  beforeEach(() => jest.clearAllMocks());

  // 이메일이 DB에 존재할 시
  it("이미 존재하는 이메일일 경우 중복 alert이 떠야 한다", async () => {
    const alertSpy = jest.spyOn(Alert, "alert");
    mockSupabaseSelect([{ user_id: userData.id }]);

    const renderResult = render(<Signup />);
    inputAndSubmit(renderResult);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        "중복된 이메일",
        "이미 가입된 이메일입니다."
      );
    });

    alertSpy.mockRestore();
  });

  // 회원가입 실패 시
  it("회원가입 실패 시 실패 alert이 떠야 한다", async () => {
    const alertSpy = jest.spyOn(Alert, "alert");
    mockSupabaseSelect([]);
    (supabase.auth.signUp as jest.Mock).mockResolvedValue({
      data: null,
      error: { message: "이미 존재하는 이메일입니다." },
    });

    const renderResult = render(<Signup />);
    inputAndSubmit(renderResult);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        "회원가입 실패",
        "이미 존재하는 이메일입니다."
      );
    });

    alertSpy.mockRestore();
  });

  // 수파베이스 auth DB에 데이터가 없을 시
  it("user 테이블 조회 실패 시 실패 alert이 떠야 한다", async () => {
    const alertSpy = jest.spyOn(Alert, "alert");
    mockSupabaseSelect(null, { message: "쿼리 실패" });

    const renderResult = render(<Signup />);
    inputAndSubmit(renderResult);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        "회원가입 실패",
        "사용자 정보를 불러오지 못했습니다."
      );
    });

    alertSpy.mockRestore();
  });

  // 이메일 인증을 안했을 시
  it("user가 undefined일 경우 alert이 호출되지 않아야 한다", async () => {
    const alertSpy = jest.spyOn(Alert, "alert");
    mockSupabaseSelect([]);
    (supabase.auth.signUp as jest.Mock).mockResolvedValue({
      data: { user: undefined },
      error: null,
    });

    const renderResult = render(<Signup />);
    inputAndSubmit(renderResult);

    await waitFor(() => {
      expect(alertSpy).not.toHaveBeenCalledWith(
        "이메일 인증 필요",
        expect.anything(),
        expect.anything()
      );
    });

    alertSpy.mockRestore();
  });

  // 회원가입 완료 후 alert의 확인 버튼 클릭 시
  it("alert 확인 버튼을 누르면 로그인 페이지로 이동한다", async () => {
    const alertSpy = jest.spyOn(Alert, "alert");
    mockSupabaseSelect([]);
    (supabase.auth.signUp as jest.Mock).mockResolvedValue({
      data: { user: { id: "123", email: userData.email } },
      error: null,
    });

    const renderResult = render(<Signup />);
    inputAndSubmit(renderResult);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalled();
    });

    const alertArgs = alertSpy.mock.calls[0];
    const buttons = alertArgs[2] as { text: string; onPress?: () => void }[];

    buttons?.[0]?.onPress?.();
    expect(mockPush).toHaveBeenCalledWith("/login");

    alertSpy.mockRestore();
  });
});
