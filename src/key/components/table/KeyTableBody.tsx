import { CircularProgress, TableBody, TableCell } from '@mui/material';

import { useKeyContext } from '@/app/key/context/KeyContext';
import { Key } from '../../interfaces';
import { KeyTableRowItem } from './KeyTableRowItem';

export const KeyTableBody = () => {

  const { isLoading,  itemCount, keys} = useKeyContext();

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
            keys.map((item: Key) => (
              <KeyTableRowItem
                key={item.keyId}
                item={item}
              />
            ))
          )
        }
      </TableBody>
  )
}
