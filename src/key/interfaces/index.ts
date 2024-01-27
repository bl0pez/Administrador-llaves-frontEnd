import { useStoreKey } from "@/key/hooks/useStoreKey";
import { useStorePagination } from "@/common/hooks/useStorePagination";

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

export type KeyState = {
  keys: Key[];
  selectedKey: Key | null;
  isLoading: boolean;
};

export interface GetKeys {
  keys: Key[];
  count: number;
}

export enum KeyTypes {
  START_LOADING = "START_LOADING",
  LOAD_KEYS = "LOAD_KEYS",
  UPDATE_KEY = "UPDATE_KEY",
  SELECT_KEY = "SELECT_KEY",
}

type UseStoreKeyReturnType = ReturnType<typeof useStoreKey>;
type UseStorePaginationReturnType = ReturnType<typeof useStorePagination>;

export type KeyContextProps = UseStoreKeyReturnType &
  UseStorePaginationReturnType & {
    onLoadKeys: () => Promise<void>;
  };

export type CreateKey = {
  keyName: string;
  keyDescription: string;
  deliveredBy: string;
  file: string | null;
};

export type UpdateKey = Partial<CreateKey> & {
  image: string;
};
