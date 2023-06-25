import { BorrowedKey } from "../interfaces";

export interface KeyHistoryInitialState {
    keysHistory: BorrowedKey[];
    count: number;
    isLoading: boolean;
    error: boolean;
}

export const INITIAL_STATE:KeyHistoryInitialState = {
    keysHistory: [],
    count: 0,
    isLoading: true,
    error: false,
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
            }
        case "addKeyHistory":
            return {
                ...stateKeys,
                keysHistory: [action.payload, ...stateKeys.keysHistory],
                count: stateKeys.count + 1,
            }
        default:
            return stateKeys;
    }

}