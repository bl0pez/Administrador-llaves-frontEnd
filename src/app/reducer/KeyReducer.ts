import {
  EReducerTypes,
  IGetAllKeys,
  IKey,
  IKeyStateReducer,
} from "../interfaces";

type KeyAction =
  | { type: EReducerTypes.LOAD_KEYS; payload: IGetAllKeys }
  | { type: EReducerTypes.ADD_KEY; payload: IKey }
  | { type: EReducerTypes.CHANGE_PAGE; payload: number }
  | { type: EReducerTypes.CHANGE_LIMIT; payload: number }
  | { type: EReducerTypes.SEARCH_KEY; payload: string }
  | { type: EReducerTypes.START_LOADING };

// En los reducer siempre se debe de retornar un nuevo estado
// y no una mutación del estado anterior
export const keyReducer = (
  stateKeys: IKeyStateReducer,
  action: KeyAction
): IKeyStateReducer => {
  switch (action.type) {
    case EReducerTypes.START_LOADING: {
      return {
        ...stateKeys,
        isLoading: true,
      };
    }
    case EReducerTypes.LOAD_KEYS: {
      return {
        keys: action.payload.keys,
        count: action.payload.count,
        limit: stateKeys.limit,
        offset: stateKeys.offset,
        page: stateKeys.page,
        isLoading: false,
        search: stateKeys.search,
      };
    }
    case EReducerTypes.CHANGE_PAGE: {
      return {
        ...stateKeys,
        page: action.payload,
        offset: action.payload * stateKeys.limit,
        isLoading: false,
      };
    }
    case EReducerTypes.CHANGE_LIMIT: {
      return {
        ...stateKeys,
        limit: action.payload,
        isLoading: false,
        page: 0,
      };
    }
    case EReducerTypes.ADD_KEY: {
      return {
        ...stateKeys,
        count: stateKeys.count + 1,
        isLoading: false,
      };
    }
    case EReducerTypes.SEARCH_KEY: {
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
