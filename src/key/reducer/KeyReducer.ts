import { Key, KeyState, KeyTypes } from "@/key/interfaces";

type KeyAction =
  | { type: KeyTypes.LOAD_KEYS; payload: Key[] }
  | { type: KeyTypes.START_LOADING }
  | { type: KeyTypes.UPDATE_KEY; payload: Key }
  | { type: KeyTypes.SELECT_KEY; payload: Key };

export const keyReducer = (
  stateKeys: KeyState,
  action: KeyAction
): KeyState => {
  switch (action.type) {
    case KeyTypes.START_LOADING: {
      return {
        ...stateKeys,
        isLoading: true,
      };
    }
    case KeyTypes.LOAD_KEYS: {
      return {
        ...stateKeys,
        keys: action.payload,
        isLoading: false,
      };
    }
    case KeyTypes.UPDATE_KEY: {
      return {
        ...stateKeys,
        keys: stateKeys.keys.map((key) =>
          key.keyId === action.payload.keyId ? action.payload : key
        ),
      };
    }
    case KeyTypes.SELECT_KEY: {
      return {
        ...stateKeys,
        selectedKey: action.payload,
      };
    }
    default:
      return stateKeys;
  }
};
