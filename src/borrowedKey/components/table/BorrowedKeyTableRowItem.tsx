import { FC, useState } from 'react';
import { Chip, TableCell, TableRow } from '@mui/material';

import { RemoveBorrowrdKeyModal } from '../modal/RemoveBorrowrdKeyModal';
import { BorrowedKey } from '@/borrowedKey/interfaces';
import { DateTransformed } from '@/common/components/ui/DateTransformed';
interface Props {
    item: BorrowedKey;
}

export const BorrowedKeyTableRowItem: FC<Props> = ({ item }) => {

    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
    }

  return (
    <>
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
                <Chip
                    label="cerrar"
                    variant="outlined"
                    color="error"
                    onClick={() => setOpenModal(true)}
                />
            </TableCell>
        </TableRow>
        <RemoveBorrowrdKeyModal open={openModal} handleClose={handleCloseModal} borrowedKeyId={item.borrowedKeyId} />
    </>
  )
}
