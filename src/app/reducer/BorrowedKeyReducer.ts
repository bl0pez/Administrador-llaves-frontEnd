import { EBorrowedKeyTypes, IBorrowedKey, IGetKeyRecord } from "../interfaces";

export interface IBorrowedKeyStateReducer {
  borrowedKeys: IBorrowedKey[];
  isLoading: boolean;
  itemCount: number;
  limit: number;
  offset: number;
  page: number;
  search: string;
}

type BorrowedKeyAction =
  | { type: EBorrowedKeyTypes.START_LOADING }
  | {
      type: EBorrowedKeyTypes.LOAD_BORROWED_KEYS;
      payload: IGetKeyRecord;
    }
  | {
      type: EBorrowedKeyTypes.ADD_BORROWED_KEY;
      payload: IBorrowedKey;
    }
  | { type: EBorrowedKeyTypes.CHANGE_PAGE; payload: number }
  | { type: EBorrowedKeyTypes.CHANGE_LIMIT; payload: number }
  | { type: EBorrowedKeyTypes.CLOSE_BORROWED_KEY; payload: string };

export const BorrowedKeyReducer = (
  state: IBorrowedKeyStateReducer,
  action: BorrowedKeyAction
): IBorrowedKeyStateReducer => {
  switch (action.type) {
    case EBorrowedKeyTypes.START_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case EBorrowedKeyTypes.LOAD_BORROWED_KEYS: {
      return {
        ...state,
        borrowedKeys: action.payload.borrowedKeys,
        itemCount: action.payload.count,
        isLoading: false,
      };
    }
    case EBorrowedKeyTypes.CHANGE_PAGE: {
      return {
        ...state,
        page: action.payload,
        offset: action.payload * state.limit,
        isLoading: false,
      };
    }
    case EBorrowedKeyTypes.CHANGE_LIMIT: {
      return {
        ...state,
        limit: action.payload,
        isLoading: false,
      };
    }
    case EBorrowedKeyTypes.ADD_BORROWED_KEY: {
      return {
        ...state,
        borrowedKeys: [...state.borrowedKeys, action.payload],
        itemCount: state.itemCount + 1,
      };
    }
    case EBorrowedKeyTypes.CLOSE_BORROWED_KEY: {
      return {
        ...state,
        borrowedKeys: state.borrowedKeys.filter(
          (borrowedKey) => borrowedKey.borrowedKeyId !== action.payload
        ),
        itemCount: state.itemCount - 1,
      };
    }
    default:
      return state;
  }
};
