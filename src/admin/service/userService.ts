import { keyApi } from "@/api/keyApi";
import { Pagination } from "@/common/interfaces";
import { CreateUser, GetUsers, UpdateUser, User } from "../interfaces";

export const userServiceApi = {
  gets: async (pagination: Pagination): Promise<GetUsers> => {
    try {
      const { data } = await keyApi.get<GetUsers>(
        `/users?limit=${pagination.limit}&offset=${pagination.offset}`
      );

      return data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },

  create: async (createUser: CreateUser): Promise<User> => {
    try {
      const { data } = await keyApi.post<User>("/users", createUser);
      return data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },

  update: async (id: string, updateUser: UpdateUser): Promise<User> => {
    try {
      const { data } = await keyApi.patch<User>(`/users/${id}`, updateUser);
      return data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },

  delete: async (id: string) => {
    try {
      const { data } = await keyApi.delete(`/users/${id}`);
      return data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },
};
