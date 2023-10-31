import { GetKeys, Key, KeyState, KeyTypes } from "../interfaces";

type KeyAction =
  | { type: KeyTypes.LOAD_KEYS; payload: GetKeys }
  | { type: KeyTypes.ADD_KEY; payload: Key }
  | { type: KeyTypes.CHANGE_PAGE; payload: number }
  | { type: KeyTypes.CHANGE_LIMIT; payload: number }
  | { type: KeyTypes.SEARCH_KEY; payload: string }
  | { type: KeyTypes.START_LOADING };

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
        keys: action.payload.keys,
        itemCount: action.payload.count,
        limit: stateKeys.limit,
        offset: stateKeys.offset,
        page: stateKeys.page,
        isLoading: false,
        search: stateKeys.search,
      };
    }
    case KeyTypes.CHANGE_PAGE: {
      return {
        ...stateKeys,
        page: action.payload,
        offset: action.payload * stateKeys.limit,
        isLoading: false,
      };
    }
    case KeyTypes.CHANGE_LIMIT: {
      return {
        ...stateKeys,
        limit: action.payload,
        isLoading: false,
        page: 0,
      };
    }
    case KeyTypes.ADD_KEY: {
      return {
        ...stateKeys,
        itemCount: stateKeys.itemCount + 1,
        isLoading: false,
      };
    }
    case KeyTypes.SEARCH_KEY: {
      return {
        ...stateKeys,
        search: action.payload,
        page: 0,
        offset: 0,
        isLoading: false,
      };
    }
    default:
      return stateKeys;
  }
};
