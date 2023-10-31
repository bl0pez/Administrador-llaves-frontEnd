export interface Key {
  createBy: string;
  createdAt: Date;
  deletedAt: Date | null;
  deliveredBy: string;
  image: string;
  isBorrowed: boolean;
  keyDescription: string;
  keyId: string;
  keyName: string;
  updatedAt: Date;
}

export interface KeyState {
  keys: Key[];
  isLoading: boolean;
  itemCount: number;
  limit: number;
  offset: number;
  page: number;
  search: string;
}

export interface GetKeys {
  keys: Key[];
  count: number;
}

export enum KeyTypes {
  START_LOADING = "START_LOADING",
  LOAD_KEYS = "LOAD_KEYS",
  CHANGE_PAGE = "CHANGE_PAGE",
  CHANGE_LIMIT = "CHANGE_LIMIT",
  ADD_KEY = "ADD_KEY",
  SEARCH_KEY = "SEARCH_KEY",
}

export type KeyContextProps = {
  keys: Key[];
  isLoading: boolean;
  itemCount: number;
  limit: number;
  offset: number;
  page: number;
  search: string;
  loadKeys: (data: GetKeys) => void;
  handleChangePage: (newPage: number) => void;
  handleChangeLimit: (newLimit: number) => void;
  createKey: (key: Key) => void;
  handleSearch: (value: string) => void;
};

export interface CreateKey {
  keyName: string;
  keyDescription: string;
  deliveredBy: string;
  file: string | null;
}
