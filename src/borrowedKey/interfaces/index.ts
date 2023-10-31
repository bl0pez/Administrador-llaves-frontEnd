export interface BorrowedKey {
  borrowedKeyId: string;
  borrowerName: string;
  borrowerServiceOrCompany: string;
  isOpened: boolean;
  operator: string;
  keyName: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum BorrowedKeyTypes {
  START_LOADING = "START_LOADING",
  LOAD_BORROWED_KEYS = "LOAD_BORROWED_KEYS",
  CHANGE_PAGE = "CHANGE_PAGE",
  CHANGE_LIMIT = "CHANGE_LIMIT",
  ADD_BORROWED_KEY = "ADD_BORROWED_KEY",
  SEARCH_BORROWED_KEY = "SEARCH_BORROWED_KEY",
  CLOSE_BORROWED_KEY = "CLOSE_BORROWED_KEY",
}

export type BorrowedKeyContextProps = {
  borrowedKeys: BorrowedKey[];
  itemCount: number;
  page: number;
  limit: number;
  isLoading: boolean;
  closeBorrowedKey: (borrowedKeyId: string) => void;
  createBorrowedKey: (borrowedKey: BorrowedKey) => void;
  handleChangeLimit: (newLimit: number) => void;
  handleChangePage: (newPage: number) => void;
  searchBorrowedKey: (value: string) => void;
};

export interface BorrowedKeyState {
  borrowedKeys: BorrowedKey[];
  isLoading: boolean;
  itemCount: number;
  limit: number;
  offset: number;
  page: number;
  search: string;
}

export type BorrowedKeyAction =
  | { type: BorrowedKeyTypes.START_LOADING }
  | {
      type: BorrowedKeyTypes.LOAD_BORROWED_KEYS;
      payload: GetBorrowedKey;
    }
  | {
      type: BorrowedKeyTypes.ADD_BORROWED_KEY;
      payload: BorrowedKey;
    }
  | { type: BorrowedKeyTypes.CHANGE_PAGE; payload: number }
  | { type: BorrowedKeyTypes.CHANGE_LIMIT; payload: number }
  | { type: BorrowedKeyTypes.CLOSE_BORROWED_KEY; payload: string }
  | { type: BorrowedKeyTypes.SEARCH_BORROWED_KEY; payload: string };

export interface GetBorrowedKey {
  count: number;
  borrowedKeys: BorrowedKey[];
}

export interface CreateBorrowedKey {
  keyId: string;
  borrowerName: string;
  borrowerServiceOrCompany: string;
}

export interface keyAvailable {
  keyId: string;
  keyName: string;
}
