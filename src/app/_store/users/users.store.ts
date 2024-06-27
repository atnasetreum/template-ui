import { create } from "zustand";

import { User } from "@interfaces";

interface UsersStore {
  users: User[];
  setUsers: (users: User[]) => void;
}

export const useUsersStore = create<UsersStore>()((set) => ({
  users: [],
  setUsers: (users: User[]) => set({ users }),
}));
