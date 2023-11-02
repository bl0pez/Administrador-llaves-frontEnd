import { keyApi } from "@/api/keyApi";
import { Pagination } from "@/common/interfaces";
import {
  BorrowedKey,
  CreateBorrowedKey,
  GetBorrowedKey,
  keyAvailable,
} from "../interfaces";

export const getBorrowedKeysService = async (
  pagination: Pagination
): Promise<GetBorrowedKey> => {
  try {
    const controller = new AbortController();

    if (pagination.search) {
      const { data } = await keyApi.get<GetBorrowedKey>(
        `/borrowed-keys/filter?limit=${pagination.limit}&offset=${pagination.offset}&search=${pagination.search}`,
        {
          signal: controller.signal,
        }
      );

      return data;
    }

    const { data } = await keyApi.get<GetBorrowedKey>(
      `/borrowed-keys?limit=${pagination.limit}&offset=${pagination.offset}`,
      {
        signal: controller.signal,
      }
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getKeysAvailableService = async (): Promise<keyAvailable[]> => {
  try {
    const { data } = await keyApi.get<keyAvailable[]>("/keys/available");

    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const addBorrowedKeyService = async (
  velus: CreateBorrowedKey
): Promise<BorrowedKey> => {
  try {
    const { data } = await keyApi.post<BorrowedKey>("/borrowed-keys", {
      velus,
    });

    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const closeBorrowedKeyService = async (borrowedKeyId: string) => {
  try {
    await keyApi.put(`/borrowed-keys/close/${borrowedKeyId}`);
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
