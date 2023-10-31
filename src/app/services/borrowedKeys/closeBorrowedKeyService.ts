import { keyApi } from "@/api/keyApi";
import { IBorrowedKey } from "@/app/borrowedKey/interfaces";

export const closeBorrowedKeyService = async (borrowedKeyId: string) => {
  try {
    const { data } = await keyApi.patch<IBorrowedKey>(
      `/borrowed-keys/close/${borrowedKeyId}`
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
