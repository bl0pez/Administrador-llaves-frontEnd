import { BorrowedKey } from "../interfaces";

export interface KeyHistoryInitialState {
    keysHistory: BorrowedKey[];
    count: number;
    isLoading: boolean;
    totalPage: number;
    error: boolean;
}

export const INITIAL_STATE:KeyHistoryInitialState = {
    keysHistory: [],
    count: 0,
    isLoading: true,
    error: false,
    totalPage: 1,
}

type KeyAction = 
    | { type: "loadKeysHistory", payload: { keys: BorrowedKey[], count: number } }
    | { type: "addKeyHistory", payload: BorrowedKey }

export const KeyHistoryReducer = (stateKeys: KeyHistoryInitialState, action: KeyAction): KeyHistoryInitialState => {

    switch (action.type){
        case "loadKeysHistory":
            return {
                ...stateKeys,
                keysHistory: action.payload.keys,
                count: action.payload.count,
                isLoading: false,
                totalPage: Math.ceil(action.payload.count / 10),
            }
        case "addKeyHistory":
            return {
                ...stateKeys,
                keysHistory: [action.payload, ...stateKeys.keysHistory],
                count: stateKeys.count + 1,
                totalPage: Math.ceil((stateKeys.count + 1) / 10),
            }
        default:
            return stateKeys;
    }

}