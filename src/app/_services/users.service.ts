import { axiosWrapper } from "./axiosWrapper";

const api = axiosWrapper({
  baseURL: "/users",
});

const findAll = async () => {
  const { data } = await api.get<{ message: string }>("");
  return data;
};

export const UsersService = {
  findAll,
};
