export interface ICreeateKey {
  keyName: string;
  keyDescription: string;
  deliveredBy: string;
  file: string | null;
}

export interface IKey {
  createBy: string;
  createdAt: Date;
  deletedAt: Date | null;
  deliveredBy: string;
  image: string;
  isLoaned: boolean;
  keyDescription: string;
  keyId: string;
  keyName: string;
  updatedAt: Date;
}

export interface IChildrenProps {
  children: JSX.Element | JSX.Element[];
}

export enum EReducerTypes {
  ADD_KEY = "ADD_KEY",
  CHANGE_LIMIT = "CHANGE_LIMIT",
  CHANGE_PAGE = "CHANGE_PAGE",
  LOAD_KEYS = "LOAD_KEYS",
  SEARCH_KEY = "SEARCH_KEY",
  START_LOADING = "START_LOADING",
}

export interface IKeyStateReducer {
  keys: IKey[];
  isLoading: boolean;
  count: number;
  limit: number;
  offset: number;
  page: number;
  search: string;
}

export interface IGetAllKeys {
  keys: IKey[];
  count: number;
}

export interface IBorrowKey {
  keyId: string;
  borrowerName: string;
  borrowerServiceOrCompany: string;
}

export interface IPostBorrowedKeys {
  borrowerName: string;
  borrowerServiceOrCompany: string;
  createdAt: Date;
  key: string;
  operador: string;
  updatedAt: Date | null;
}

export interface IvalidateKeyAvailability {
  keyId: string;
  keyName: string;
}

export interface IGetLoanRecord {
  borrowed: boolean;
  borrowerName: string;
  borrowerServiceOrCompany: string;
  createdAt: Date;
  keyName: string;
  loanRecordId: string;
  operator: string;
  updatedAt: Date;
}

export interface IPagination {
  limit?: number;
  offset?: number;
  search?: string;
}
