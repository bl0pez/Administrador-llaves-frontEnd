import { useReducer } from "react";
import { paginationReducer } from "@/common/reducer/paginationReducer";
import { PaginationTypes, StatePagination } from "@/common/interfaces";

const INITIAL_STATE: StatePagination = {
  page: 0,
  offset: 0,
  limit: 5,
  search: "",
  itemCount: 0,
};

export const useStorePagination = () => {
  const [state, dispatch] = useReducer(paginationReducer, INITIAL_STATE);

  const handleChangePage = (newPage: number) =>
    dispatch({ type: PaginationTypes.CHANGE_PAGE, payload: newPage });

  const handleChangeLimit = (newLimit: number) =>
    dispatch({ type: PaginationTypes.CHANGE_LIMIT, payload: newLimit });

  const handleChangeSearch = (newSearch: string) =>
    dispatch({ type: PaginationTypes.CHANGE_SEARCH, payload: newSearch });

  const handleChangeCount = (newCount: number) =>
    dispatch({ type: PaginationTypes.CHANGE_COUNT, payload: newCount });

  return {
    ...state,
    handleChangePage,
    handleChangeLimit,
    handleChangeSearch,
    handleChangeCount,
  };
};
