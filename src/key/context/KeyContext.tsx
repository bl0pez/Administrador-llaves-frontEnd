import { createContext, useContext, useEffect } from "react";

import { KeyContextProps } from "../interfaces";
import { ChildrenProps } from "@/common/interfaces";
import { useStoreKey } from "../hooks/useStoreKey";
import { useStorePagination } from "../../common/hooks/useStorePagination";
import { getKeysService } from "../services/key.service";

export const KeyContext = createContext({} as KeyContextProps);

export const KeyProvider = ({ children }: ChildrenProps) => {
  const storeKey = useStoreKey();
  const storePagination = useStorePagination();

  const { setKeys } = storeKey;
  const { limit, offset, search, handleChangeCount } = storePagination;

  const onLoadKeys = async () => {
    storeKey.onStartLoading();
    const { count, keys } = await getKeysService({ limit, offset, search });
    setKeys(keys);
    handleChangeCount(count);
  };

  useEffect(() => {
    onLoadKeys();
  }, [limit, offset, search]);

  return (
    <KeyContext.Provider
      value={{
        ...storeKey,
        ...storePagination,
        onLoadKeys,
      }}
    >
      {children}
    </KeyContext.Provider>
  );
};

export const useKeyContext = () => useContext(KeyContext);
