import { keyApi } from "@/api/keyApi";
import { IGetKeyRecord, IPagination } from "@/app/interfaces";

export const getBorrowedKeyRegistration = async (
  pagination: IPagination
): Promise<IGetKeyRecord> => {
  console.count("getBorrowedKeyRegistration");

  try {
    const { data } = await keyApi.get<IGetKeyRecord>(
      `/borrowed-keys?limit=${pagination.limit}&offset=${pagination.offset}`
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
