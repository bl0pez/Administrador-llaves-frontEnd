import { PaginationTypes, StatePagination } from "../interfaces";

type PaginationAction =
  | { type: PaginationTypes.CHANGE_PAGE; payload: number }
  | { type: PaginationTypes.CHANGE_LIMIT; payload: number }
  | { type: PaginationTypes.CHANGE_SEARCH; payload: string }
  | { type: PaginationTypes.CHANGE_COUNT; payload: number };

export const paginationReducer = (
  statePagination: StatePagination,
  action: PaginationAction
): StatePagination => {
  switch (action.type) {
    case PaginationTypes.CHANGE_COUNT: {
      return {
        ...statePagination,
        itemCount: action.payload,
      };
    }
    case PaginationTypes.CHANGE_PAGE: {
      return {
        ...statePagination,
        page: action.payload,
        offset: action.payload * statePagination.limit,
      };
    }
    case PaginationTypes.CHANGE_LIMIT: {
      return {
        ...statePagination,
        limit: action.payload,
        page: 0,
      };
    }
    case PaginationTypes.CHANGE_SEARCH: {
      return {
        ...statePagination,
        search: action.payload,
        page: 0,
      };
    }
    default:
      return statePagination;
  }
};
