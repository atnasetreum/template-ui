import { type StateCreator } from "zustand";

import { User } from "@interfaces";

export interface UsersSlice {
  users: User[];
  computed: {
    totalUsers: number;
  };

  setUsers: (users: User[]) => void;
}

export const createUsersSlice: StateCreator<
  UsersSlice,
  [["zustand/devtools", never]]
> = (set, get) => ({
  users: [],
  computed: {
    get totalUsers() {
      return get().users.length;
    },
  },

  setUsers: (users: User[]) => set({ users }, false, "setUsers"),
});
