import { Key } from './fetchAllKeys';

export interface KeyState {
    keys: Key[];
    isLoading: boolean;
    error: string;
}