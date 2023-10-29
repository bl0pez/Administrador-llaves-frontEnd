import { TablePagination } from '@mui/material';

import { useBorrowedKeyContext } from '@/app/context/BorrowedKeyContext';

export const BorrowedKeyTablePagination = () => {

    const { itemCount, handleChangeLimit, limit, page, handleChangePage } = useBorrowedKeyContext();

  return (
    <>
        <TablePagination
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
