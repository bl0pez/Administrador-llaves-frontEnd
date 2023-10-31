import { keyApi } from "@/api/keyApi";
import { Pagination } from "@/common/interfaces";

export const getKeysService = async (pagination: Pagination) => {
  try {
    const controller = new AbortController();

    if (pagination.search) {
      const { data } = await keyApi.get(
        `/keys/filter?limit=${pagination.limit}&offset=${pagination.offset}&search=${pagination.search}`,
        {
          signal: controller.signal,
        }
      );

      return data;
    }

    const { data } = await keyApi.get(
      `/keys?limit=${pagination.limit}&offset=${pagination.offset}`,
      {
        signal: controller.signal,
      }
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
