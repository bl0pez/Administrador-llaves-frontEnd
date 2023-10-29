import { CircularProgress, TableBody, TableCell } from '@mui/material';

import { BorrowedTableRowItem } from './BorrowedTableRowItem';
import { useBorrowedKeyContext } from '@/app/context/BorrowedKeyContext';
import { IBorrowedKey } from '@/app/interfaces';

export const BorrowedKeyTableBody = () => {

  const { borrowedKeys, isLoading, itemCount } = useBorrowedKeyContext();

  if (isLoading) {
    return (
      <TableBody>
        <tr>
        <TableCell colSpan={7} style={{ textAlign: 'center' }}>
          <CircularProgress />
        </TableCell>
        </tr>
      </TableBody>
    )
  }

  return (
      <TableBody>
        {
          itemCount === 0 
          ? 
          (
              <tr>
              <TableCell colSpan={7} style={{ textAlign: 'center' }}>
                No se encontraron registros
              </TableCell>
              </tr>
          )
          : 
          (
            borrowedKeys.map((item: IBorrowedKey) => (
              <BorrowedTableRowItem
                item={item}
                key={item.borrowedKeyId}
              />
            ))
          )
        }
      </TableBody>
  )
}
