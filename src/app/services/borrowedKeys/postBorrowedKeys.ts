import { keyApi } from "@/api/keyApi";
import { IBorrowKey, IPostBorrowedKeys } from "@/app/interfaces";

export const postBorrowedKeys = async (keys: IBorrowKey): Promise<IPostBorrowedKeys> => {
    try {
        const { data } = await keyApi.post<IPostBorrowedKeys>('/loanRecord/create', keys)
        return data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}