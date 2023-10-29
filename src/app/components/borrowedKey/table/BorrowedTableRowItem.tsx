import { FC, useState } from 'react';
import { Chip, TableCell, TableRow, styled } from '@mui/material';
import { transformDate } from '@/app/helpers/transformDate';
import { IBorrowedKey } from '@/app/interfaces';
import { RemoveBorrowrdKeyModal } from '../modal/RemoveBorrowrdKeyModal';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));


interface Props {
    item: IBorrowedKey;
}

export const BorrowedTableRowItem: FC<Props> = ({ item }) => {

    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
    }

  return (
    <>
        <StyledTableRow>
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
                <Chip
                    label="cerrar"
                    variant="outlined"
                    color="error"
                    onClick={() => setOpenModal(true)}
                />
            </TableCell>
        </StyledTableRow>
        <RemoveBorrowrdKeyModal open={openModal} handleClose={handleCloseModal} borrowedKeyId={item.borrowedKeyId} />
    </>
  )
}
