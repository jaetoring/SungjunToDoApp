import { supabase } from "@/supabaseClient";
import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // 초기 상태 및 액션 정의
  const initialState: AuthState = {
    isLoggedIn: false,
    setLoggedIn: (loggedIn: boolean) => set({ isLoggedIn: loggedIn }),
    logout: () => {
      supabase.auth
        .signOut()
        .then(() => set({ isLoggedIn: false }))
        .catch((err) => console.warn("Sign out error:", err));
    },
  };

  // 초기 세션 복원
  supabase.auth
    .getSession()
    .then(({ data: { session } }) => {
      set({ isLoggedIn: !!session });
    })
    .catch((err) => {
      console.warn("Supabase session restore failed:", err.message);
    });

  // 로그인/로그아웃 이벤트 구독
  supabase.auth.onAuthStateChange((_event, session) => {
    set({ isLoggedIn: !!session });
  });

  return initialState;
});
