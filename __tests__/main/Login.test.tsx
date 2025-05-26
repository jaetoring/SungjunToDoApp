import LoginScreen from "@/app/login";
import { supabase } from "@/supabaseClient";
import {
  act,
  fireEvent,
  render,
  RenderAPI,
  waitFor,
} from "@testing-library/react-native";
import { Alert } from "react-native";

jest.setTimeout(10000);
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
  const userData = {
    id: "1",
    email: "test@test.com",
    password: "test123@",
  };

  const renderLogin = () => render(<LoginScreen />);
  // 버튼이벤트 하나로 묶어둠
  const inputAndSubmit = async (
    getBy: Pick<RenderAPI, "getByPlaceholderText" | "getByText">
  ) => {
    await act(async () => {
      fireEvent.changeText(
        getBy.getByPlaceholderText("이메일"),
        userData.email
      );
      fireEvent.changeText(
        getBy.getByPlaceholderText("비밀번호"),
        userData.password
      );
      fireEvent.press(getBy.getByText("로그인"));
    });
  };

  beforeEach(() => jest.clearAllMocks());

  // 로그인에 성공하면 메인페이지로 이동된다.
  it("로그인에 성공하면 메인페이지로 이동된다.", async () => {
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      data: {},
      error: null,
    });
    (supabase.auth.getUser as jest.Mock).mockResolvedValue({
      data: { user: { ...userData } },
      error: null,
    });
    (supabase.from as jest.Mock).mockReturnValue({
      select: () => ({
        eq: () => Promise.resolve({ data: [], error: null }),
      }),
      insert: () => Promise.resolve({ error: null }),
    });

    const utils = renderLogin();
    await inputAndSubmit(utils);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/(tabs)");
    });
  });

  // 로그인 실패 시 alert를 띄운다
  it("로그인 실패 시 alert를 띄운다", async () => {
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      data: null,
      error: { message: "로그인 실패" },
    });

    const alertSpy = jest.spyOn(Alert, "alert");
    const utils = renderLogin();
    await inputAndSubmit(utils);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        "로그인 실패",
        "아이디와 비밀번호를 확인해주세요."
      );
    });

    alertSpy.mockRestore();
  });

  // auth DB에 데이터가 없으면 console.log를 출력한다.
  it("auth DB에 데이터가 없으면 console.log를 출력한다.", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      data: {},
      error: null,
    });
    (supabase.auth.getUser as jest.Mock).mockResolvedValue({
      data: null,
      error: { message: "유저 조회 실패" },
    });

    const utils = renderLogin();
    await inputAndSubmit(utils);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        "유저 정보 조회 실패",
        "유저 조회 실패"
      );
    });
  });

  // user 테이블에 데이터가 없으면 console.log를 출력한다.
  it("user 테이블에 데이터가 없으면 console.log를 출력한다.", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      data: {},
      error: null,
    });
    (supabase.auth.getUser as jest.Mock).mockResolvedValue({
      data: { user: { ...userData } },
      error: null,
    });
    (supabase.from as jest.Mock).mockReturnValue({
      select: () => ({
        eq: () =>
          Promise.resolve({ data: null, error: { message: "쿼리 실패" } }),
      }),
    });

    const utils = renderLogin();
    await inputAndSubmit(utils);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        "user 테이블 조회 실패",
        "쿼리 실패"
      );
    });
  });

  // user insert 실패 시 console.log를 출력한다.
  it("user insert 실패 시 console.log를 출력한다.", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      data: {},
      error: null,
    });
    (supabase.auth.getUser as jest.Mock).mockResolvedValue({
      data: { user: { ...userData } },
      error: null,
    });
    (supabase.from as jest.Mock).mockReturnValue({
      select: () => ({
        eq: () => Promise.resolve({ data: [], error: null }),
      }),
      insert: () => Promise.resolve({ error: { message: "insert 실패" } }),
    });

    const utils = renderLogin();
    await inputAndSubmit(utils);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        "user 테이블 insert 실패",
        "insert 실패"
      );
    });
  });

  // 회원가입 버튼 클릭 시 회원가입 페이지로 이동한다.
  it("회원가입 버튼 클릭 시 회원가입 페이지로 이동한다.", async () => {
    const { getByText } = renderLogin();
    await act(async () => {
      fireEvent.press(getByText("회원가입"));
    });
    expect(mockPush).toHaveBeenCalledWith("/signup");
  });

  // user 테이블에 유저가 이미 존재하면 insert하지 않고 console.log를 출력한다.
  it("user 테이블에 유저가 이미 존재하면 insert하지 않고 console.log를 출력한다.", async () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const mockInsert = jest.fn();

    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      data: {},
      error: null,
    });
    (supabase.auth.getUser as jest.Mock).mockResolvedValue({
      data: { user: { ...userData } },
      error: null,
    });
    (supabase.from as jest.Mock).mockReturnValue({
      select: () => ({
        eq: () =>
          Promise.resolve({ data: [{ user_id: userData.id }], error: null }),
      }),
      insert: mockInsert,
    });

    const utils = renderLogin();
    await inputAndSubmit(utils);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "이미 user 테이블에 유저 정보가 있음"
      );
      expect(mockInsert).not.toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });
});
