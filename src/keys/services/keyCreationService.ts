import { keyApi } from '@/api/keyApi';

export const keyCreationService = async (key: any) => {
    try {

        const { data } = await keyApi.post('/keys', key, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return data;

    } catch (error: any) {
        throw new Error(error);
    }
}