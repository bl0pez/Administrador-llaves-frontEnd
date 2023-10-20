import { keyApi } from '@/api/keyApi';

export const getAllBorrowedKeys = async () => {
    try {
        const { data } = await keyApi.get("/loanRecord");

        console.log(data);
        

        return data;

    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}