import { useReducer } from "react";
import { keyReducer } from "@/key/reducer/KeyReducer";
import { Key, KeyState, KeyTypes } from "@/key/interfaces";

const INITIAL_STATE: KeyState = {
  keys: [],
  selectedKey: null,
  isLoading: true,
};

export const useStoreKey = () => {
  const [state, dispatch] = useReducer(keyReducer, INITIAL_STATE);

  const onStartLoading = () => dispatch({ type: KeyTypes.START_LOADING });

  const setKeys = (data: Key[]) =>
    dispatch({ type: KeyTypes.LOAD_KEYS, payload: data });

  const updateKey = (updateKey: Key) =>
    dispatch({ type: KeyTypes.UPDATE_KEY, payload: updateKey });

  const onSelectKey = (key: Key) =>
    dispatch({ type: KeyTypes.SELECT_KEY, payload: key });

  return {
    ...state,
    onStartLoading,
    onSelectKey,
    setKeys,
    updateKey,
  };
};
