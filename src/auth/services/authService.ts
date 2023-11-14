import { keyApi } from "@/api/keyApi";
import { FetchAuth } from "../interfaces";
import { LoginUser } from "../interfaces/index";

export const loginService = async ({
  email,
  password,
}: LoginUser): Promise<FetchAuth> => {
  try {
    const { data } = await keyApi.post<FetchAuth>("/auth/login", {
      email,
      password,
    });

    return {
      user: data.user,
      token: data.token,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const checkAuthStatusService = async (): Promise<FetchAuth> => {
  try {
    const { data } = await keyApi.get<FetchAuth>("/auth/checkAuthStatus");

    return {
      user: data.user,
      token: data.token,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};
