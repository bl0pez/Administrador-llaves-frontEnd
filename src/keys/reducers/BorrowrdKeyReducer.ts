import { BorrowedKey, BorrowrdKeyState } from '../interfaces';

type Action = 
    | { type: 'loadBorrowrdKeys', payload: BorrowedKey[] }


export const BorrowrdKeyReducer = (state: BorrowrdKeyState, action: Action): BorrowrdKeyState => {
    switch (action.type) {
        case 'loadBorrowrdKeys':
            return {
                ...state,
                borrowedKeys: action.payload,
                isLoading: false,
                error: false,
            }

        default:
            return state;

    }


}