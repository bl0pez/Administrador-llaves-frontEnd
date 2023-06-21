import { BorrowedKey, BorrowrdKeyState, ResBorrowedKey } from '../interfaces';

type Action = 
    | { type: 'startLoadingBorrowrdKeys' }
    | { type: 'loadBorrowrdKeys', payload: BorrowedKey[] }
    | { type: 'addBorrowrdKey', payload: BorrowedKey }
    | { type: 'updateStateBorrowedKey', payload: BorrowedKey }
    | { type: 'errorBorrowrdKeys' }


export const BorrowrdKeyReducer = (state: BorrowrdKeyState, action: Action): BorrowrdKeyState => {
    switch (action.type) {
        case 'startLoadingBorrowrdKeys':
            return {
                ...state,
                isLoading: true,
                error: false,
            }
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
        case 'errorBorrowrdKeys':
            return {
                ...state,
                isLoading: false,
                error: true,
                borrowedKeys: []
            }
        

        default:
            return state;

    }


}