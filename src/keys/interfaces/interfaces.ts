import { Key } from './fetchAllKeys';

export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    uid: string | null;
    name: string | null;
    email: string | null;
    errorMsj: string | null;
}

export interface KeyState {
    keys: Key[];
    isLoading: boolean;
    error: string;
    activeKey: null | Key;
}