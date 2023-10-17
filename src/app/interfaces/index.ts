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
  LOAD_KEYS = "LOAD_KEYS",
  ADD_KEY = "ADD_KEY",
  DELETE_KEY = "DELETE_KEY",
  UPDATE_KEY = "UPDATE_KEY",
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",
}

export interface IKeyStateReducer {
  keys: IKey[];
  isLoading: boolean;
  count: number;
}

export interface IGetAllKeys {
  keys: IKey[];
  count: number;
}
