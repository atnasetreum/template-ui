import { create } from "zustand";

import { User } from "@interfaces";

interface CurrentUserStore {
  currentUser: User;
  setCurrentUser: (currentUser: User) => void;
}

export const useCurrentUserStore = create<CurrentUserStore>()((set) => ({
  currentUser: {} as User,
  setCurrentUser: (currentUser: User) => set({ currentUser }),
}));
