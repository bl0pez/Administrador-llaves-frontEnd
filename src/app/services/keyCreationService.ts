import { keyApi } from "@/api/keyApi";
import { ICreeateKey, IGetAllKeys, IKey, IPagination } from "../interfaces";

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

export const findAllKeysService = async ({
  limit,
  offset,
  search,
}: IPagination): Promise<IGetAllKeys> => {
  try {
    if (search) {
      const { data } = await keyApi.get<IGetAllKeys>(
        `/keys/filter?limit=${limit}&offset=${offset}&search=${search}`
      );
      return data;
    }

    const { data } = await keyApi.get<IGetAllKeys>(
      `/keys?limit=${limit}&offset=${offset}`
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
