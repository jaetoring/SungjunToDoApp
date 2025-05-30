import { supabase } from "@/supabaseClient";
import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  set({ isLoggedIn: false });
  // 초기 세션 복원
  supabase.auth.getSession().then(({ data: { session } }) => {
    set({ isLoggedIn: !!session });
  });

  // 로그인/로그아웃 이벤트 구독
  supabase.auth.onAuthStateChange((_event, session) => {
    set({ isLoggedIn: !!session });
  });

  return {
    isLoggedIn: false,
    logout: () => {
      supabase.auth.signOut();
    },
  };
});
