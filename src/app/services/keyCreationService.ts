import { keyApi } from "@/api/keyApi";
import { ICreeateKey, IGetAllKeys, IKey } from "../interfaces";

export const keyCreationService = async (key: ICreeateKey): Promise<IKey> => {
  try {
    const { data } = await keyApi.post<IKey>("/keys/create", key, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const findAllKeysService = async (): Promise<IGetAllKeys> => {
  try {
    const { data } = await keyApi.get<IGetAllKeys>("/keys");
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
