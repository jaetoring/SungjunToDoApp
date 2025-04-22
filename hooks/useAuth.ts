import { useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthProps {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuth = create<AuthProps>((set) => ({
  isAuthenticated: false,
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
}));
