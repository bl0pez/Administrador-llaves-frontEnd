export interface ChildrenProps {
  children: JSX.Element | JSX.Element[];
}

export interface Pagination {
  limit: number;
  offset: number;
  search?: string;
}

export enum PaginationTypes {
  CHANGE_PAGE = "CHANGE_PAGE",
  CHANGE_LIMIT = "CHANGE_LIMIT",
  CHANGE_SEARCH = "CHANGE_SEARCH",
  CHANGE_COUNT = "CHANGE_COUNT",
}

export type StatePagination = {
  page: number;
  offset: number;
  limit: number;
  search: string;
  itemCount: number;
};

export enum Roles {
  ADMIN = "ADMIN",
  OPERATOR = "OPERATOR",
  USER = "USER",
}
