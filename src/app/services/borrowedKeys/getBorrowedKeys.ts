import { keyApi } from '@/api/keyApi';
import { IvalidateKeyAvailability } from '../../interfaces';

export const getBorrowedKeys = async (): Promise<IvalidateKeyAvailability[]> => {
    try {
      const { data } = await keyApi.get<IvalidateKeyAvailability[]>("/keys/available");
  
      return data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
};