import { keyApi } from "@/api/keyApi";
import { IBorrowedKey, ICreateBorrowdKey } from "@/app/borrowedKey/interfaces";

export const createBorrowedKeyService = async (
  keys: ICreateBorrowdKey
): Promise<IBorrowedKey> => {
  try {
    const { data } = await keyApi.post<IBorrowedKey>("/borrowed-keys", keys);
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
