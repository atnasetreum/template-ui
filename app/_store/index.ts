import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { customSessionStorage } from "./storage";
import {
  createCurrentUserSlice,
  createUsersSlice,
  type CurrentUserSlice,
  type UsersSlice,
} from "./slices";

type Store = UsersSlice & CurrentUserSlice;

export const useBoundStore = create<Store>()(
  devtools(
    persist(
      (...a) => ({
        ...createUsersSlice(...a),
        ...createCurrentUserSlice(...a),
      }),
      {
        name: "store",
        storage: customSessionStorage,
      }
    )
  )
);
