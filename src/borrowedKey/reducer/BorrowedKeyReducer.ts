import {
  BorrowedKeyAction,
  BorrowedKeyState,
  BorrowedKeyTypes,
} from "../interfaces";

export const BorrowedKeyReducer = (
  state: BorrowedKeyState,
  action: BorrowedKeyAction
): BorrowedKeyState => {
  switch (action.type) {
    case BorrowedKeyTypes.START_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case BorrowedKeyTypes.LOAD_BORROWED_KEYS: {
      return {
        ...state,
        borrowedKeys: action.payload.borrowedKeys,
        itemCount: action.payload.count,
        isLoading: false,
      };
    }
    case BorrowedKeyTypes.CHANGE_PAGE: {
      return {
        ...state,
        page: action.payload,
        offset: action.payload * state.limit,
        isLoading: false,
      };
    }
    case BorrowedKeyTypes.CHANGE_LIMIT: {
      return {
        ...state,
        limit: action.payload,
        isLoading: false,
      };
    }
    case BorrowedKeyTypes.ADD_BORROWED_KEY: {
      return {
        ...state,
        borrowedKeys: [...state.borrowedKeys, action.payload],
        itemCount: state.itemCount + 1,
      };
    }
    case BorrowedKeyTypes.CLOSE_BORROWED_KEY: {
      return {
        ...state,
        borrowedKeys: state.borrowedKeys.filter(
          (borrowedKey) => borrowedKey.borrowedKeyId !== action.payload
        ),
        itemCount: state.itemCount - 1,
      };
    }
    case BorrowedKeyTypes.SEARCH_BORROWED_KEY: {
      console.log(action.payload);
      return {
        ...state,
        search: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};
