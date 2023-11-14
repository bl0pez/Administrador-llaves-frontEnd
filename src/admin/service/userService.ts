import { keyApi } from "@/api/keyApi";
import { Pagination } from "@/common/interfaces";
import { GetUsers } from "../interfaces";

export const getUsers = async (pagination: Pagination): Promise<GetUsers> => {
  try {
    const { data } = await keyApi.get<GetUsers>(
      `/users?limit=${pagination.limit}&offset=${pagination.offset}`
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
