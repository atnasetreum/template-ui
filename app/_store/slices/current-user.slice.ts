import { type StateCreator } from "zustand";

import { User } from "@interfaces";

export interface CurrentUserSlice {
  currentUser: User | null;

  setCurrentUser: (currentUser: User) => void;
  clearCurrentUser: () => void;
}

export const createCurrentUserSlice: StateCreator<
  CurrentUserSlice,
  [["zustand/devtools", never]]
> = (set) => ({
  currentUser: null,

  setCurrentUser: (currentUser: User) =>
    set({ currentUser }, false, "setCurrentUser"),
  clearCurrentUser: () => set({ currentUser: null }, false, "clearCurrentUser"),
});
