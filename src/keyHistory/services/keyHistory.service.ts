import { keyApi } from "@/api/keyApi";
import { GetBorrowedKey } from "@/borrowedKey/interfaces";
import { Pagination } from "@/common/interfaces";

export const keyHistoryService = async (pagination: Pagination) => {
  try {
    const url = `/borrowed-keys/history?limit=${pagination.limit}&offset=${pagination.offset}&search=${pagination.search}`;

    const response = await keyApi.get<GetBorrowedKey>(url);

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
