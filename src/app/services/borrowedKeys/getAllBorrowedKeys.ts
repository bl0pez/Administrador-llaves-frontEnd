import { keyApi } from "@/api/keyApi";
import { IGetLoanRecord } from "@/app/interfaces";

export const getAllLoanRecord = async (): Promise<IGetLoanRecord[]> => {
  try {
    const { data } = await keyApi.get<IGetLoanRecord[]>("/loanRecord");
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
