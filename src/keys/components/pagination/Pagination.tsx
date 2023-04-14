
interface PaginationProps {
    total: number;
    page: number;
    limit: number;
    nextPage: () => void;
    prevPage: () => void;
}

export const Pagination = ({total, limit, page, nextPage, prevPage}:PaginationProps) => {


    

  return (
    <div>Pagination</div>
  )
}
