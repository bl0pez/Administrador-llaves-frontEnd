import { useReducer } from 'react';
import { keyApi } from '@/api/keyApi';
import { BorrowedKey, BorrowedKeys, BorrowrdKeyState } from "../interfaces";
import { BorrowrdKeyReducer } from "../reducers/BorrowrdKeyReducer";


const INITIAL_STATE: BorrowrdKeyState = {
    borrowedKeys: [],
    isLoading: true,
    error: false,
}

export type Action = {
    borrowrdKeyState: BorrowrdKeyState;
    getBorrowedKeys: () => any;
}

export const useBorrowrdKeys = (): Action => {

    const [borrowrdKeyState, dispatch] = useReducer(BorrowrdKeyReducer, INITIAL_STATE);

    //Obtener las llaves prestadas
    const getBorrowedKeys = async () => {
        try {
            const resp = await keyApi.get<BorrowedKeys>('/borrowedKeys');
            dispatch({ type: 'loadBorrowrdKeys', payload: resp.data.borrowedKeys });
        } catch (error) {
            dispatch({ type: 'loadBorrowrdKeys', payload: [] });
        }
    }

    return {
        //state
        borrowrdKeyState,

        //dispatch
        getBorrowedKeys,
    }




}
