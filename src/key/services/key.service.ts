import { keyApi } from "@/api/keyApi";
import { Pagination } from "@/common/interfaces";
import { CreateKey, GetKeys, UpdateKey } from "../interfaces";

export const getKeysService = async (
  pagination: Pagination
): Promise<GetKeys> => {
  try {
    if (pagination.search) {
      const { data } = await keyApi.get(
        `/keys/filter?limit=${pagination.limit}&offset=${pagination.offset}&search=${pagination.search}`
      );

      return data;
    }

    const { data } = await keyApi.get(
      `/keys?limit=${pagination.limit}&offset=${pagination.offset}`
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const addKeyService = async (key: CreateKey) => {
  try {
    const { data } = await keyApi.post("/keys/create", key, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

interface UpdateKeyService {
  keyId: string;
  updateKey: UpdateKey;
}

export const UpdateKeyService = async ({
  keyId,
  updateKey,
}: UpdateKeyService) => {
  try {
    const { data } = await keyApi.patch(`/keys/update/${keyId}`, updateKey, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const deleteKeyService = async (keyId: string) => {
  try {
    const { data } = await keyApi.delete(`/keys/delete/${keyId}`);
    console.log(data);
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
