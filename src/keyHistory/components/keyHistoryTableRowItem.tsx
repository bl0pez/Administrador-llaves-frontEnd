import { FC } from 'react';
import { TableCell, TableRow } from '@mui/material';

import { BorrowedKey } from '@/borrowedKey/interfaces';
import { transformDate } from '@/common/helpers';

interface Props {
    item: BorrowedKey;
}

export const KeyHistoryTableRowItem: FC<Props> = ({ item }) => {
  return (
        <TableRow>
            <TableCell>
                {item.keyName}
            </TableCell>
            <TableCell>
                {item.operator}
            </TableCell>
            <TableCell>
                {item.borrowerName}
            </TableCell>
            <TableCell>
                {item.borrowerServiceOrCompany}
            </TableCell>
            <TableCell>
                {transformDate(item.createdAt)}
            </TableCell>
            <TableCell>
                {transformDate(item.updatedAt)}
            </TableCell>
        </TableRow>
  )
}
