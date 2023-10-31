import { FC } from 'react';
import { TablePagination as Pagination } from '@mui/material';

type Props = {
    itemCount: number;
    handleChangeLimit: (limit: number) => void;
    limit: number;
    page: number;
    handleChangePage: (page: number) => void;
}

export const TablePagination:FC<Props> = ({ itemCount, handleChangeLimit, limit, page, handleChangePage }) => {

  return (
    <>
        <Pagination
          id='pagination'
          rowsPerPageOptions={[
              5,
              10,
              25,
          ]}
          component="div"
          count={itemCount}
          onRowsPerPageChange={(e) => handleChangeLimit(parseInt(e.target.value, 10))}
          rowsPerPage={limit}
          page={page}
          onPageChange={(e, newPage) => handleChangePage(newPage)}
        />
    </>
  )
}
