export interface ChildrenProps {
  children: JSX.Element | JSX.Element[];
}

export interface Pagination {
  limit: number;
  offset: number;
  search?: string;
}
