import { FC } from 'react';
import { TableCell, TableRow } from '@mui/material';

import { BorrowedKey } from '@/borrowedKey/interfaces';
import { DateTransformed } from '@/common/components/ui/DateTransformed';

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
                <DateTransformed date={item.createdAt} />
            </TableCell>
            <TableCell>
                {item.receiverName}
            </TableCell>
            <TableCell>
                <DateTransformed date={item.updatedAt} />
            </TableCell>
        </TableRow>
  )
}
