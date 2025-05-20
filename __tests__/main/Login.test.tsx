import LoginScreen from "@/app/login";
import { supabase } from "@/supabaseClient";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { Alert } from "react-native";

const mockPush = jest.fn();
jest.mock("expo-router", () => ({ useRouter: () => ({ push: mockPush }) }));
jest.mock("@/supabaseClient", () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
      getUser: jest.fn(),
    },
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      insert: jest.fn(),
    })),
  },
}));

describe("Login", () => {
  beforeEach(() => jest.clearAllMocks());

  // 로그인 성공 시
  it("로그인에 성공하면 메인페이지로 이동된다.", async () => {
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      data: {},
      error: null,
    });

    (supabase.auth.getUser as jest.Mock).mockResolvedValue({
      data: {
        user: {
          id: "1",
          email: "test@test.com",
          created_at: "2025-05-20",
          updated_at: "2025-05-20",
        },
      },
      error: null,
    });

    (supabase.from as any).mockReturnValue({
      select: () => ({
        eq: () => Promise.resolve({ data: [], error: null }),
      }),
      insert: () => Promise.resolve({ error: null }),
    });

    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    fireEvent.changeText(getByPlaceholderText("이메일"), "test@test.com");
    fireEvent.changeText(getByPlaceholderText("비밀번호"), "test123@");
    fireEvent.press(getByText("로그인"));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/(tabs)");
    });
  });

  // 로그인 실패 시
  it("로그인을 실패하면 아이디와 비밀번호를 확인하라는 alert창이 띄워진다.", async () => {
    // ✅ Alert.alert 감시 시작
    const alertSpy = jest.spyOn(Alert, "alert");

    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      data: null,
      error: { message: "로그인 실패" },
    });

    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    fireEvent.changeText(getByPlaceholderText("이메일"), "test@test.com");
    fireEvent.changeText(getByPlaceholderText("비밀번호"), "test123@");
    fireEvent.press(getByText("로그인"));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        "로그인 실패",
        "아이디와 비밀번호를 확인해주세요."
      );
    });

    alertSpy.mockRestore();
  });
});
