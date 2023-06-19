import { BorrowedKey, BorrowrdKeyState, ResBorrowedKey } from '../interfaces';

type Action = 
    | { type: 'loadBorrowrdKeys', payload: BorrowedKey[] }
    | { type: 'addBorrowrdKey', payload: BorrowedKey }
    | { type: 'updateStateBorrowedKey', payload: BorrowedKey }


export const BorrowrdKeyReducer = (state: BorrowrdKeyState, action: Action): BorrowrdKeyState => {
    switch (action.type) {
        case 'loadBorrowrdKeys':
            return {
                ...state,
                borrowedKeys: action.payload,
                isLoading: false,
                error: false,
            }
        case 'addBorrowrdKey':
            return {
                ...state,
                borrowedKeys: [ action.payload, ...state.borrowedKeys ],
                isLoading: false,
                error: false,
            }
        case 'updateStateBorrowedKey':
            return {
                ...state,
                borrowedKeys: state.borrowedKeys.filter( borrowedKey => borrowedKey._id !== action.payload._id ),
                isLoading: false,
                error: false,
            }
        

        default:
            return state;

    }


}