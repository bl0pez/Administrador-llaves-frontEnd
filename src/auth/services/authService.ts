import { keyApi } from '@/api/keyApi';
import { IFetchAuth } from '../interfaces';
import { ILoginUser } from '../interfaces/index';

export const loginService = async ({email, password}:ILoginUser): Promise<IFetchAuth> => {
    try {
        
        const { data } = await keyApi.post<IFetchAuth>('/auth/login', {email, password});

        return {
            user: data.user,
            token: data.token
        };

    } catch (error: any) {
        throw new Error(error);
    }
}

export const checkAuthStatusService = async (): Promise<IFetchAuth> => {
    try {
        
        const { data } = await keyApi.get<IFetchAuth>('/auth/checkAuthStatus');

        return {
            user: data.user,
            token: data.token
        };

    } catch (error: any) {
        throw new Error(error);
    }
}