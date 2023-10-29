import { FC, useState } from 'react';
import { Button, CardMedia, Chip, TableCell, TableRow, Typography, styled } from '@mui/material';
import { IKey } from '@/app/interfaces';
import { ImageModal } from '../modal';
import { transformDate } from '@/app/helpers/transformDate';

const ImagenButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#FFFFFF'),
    boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
    backgroundColor: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#FFFFFF',
    },
    }));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));


interface Props {
    item: IKey;
}

export const KeyTableRowItem: FC<Props> = ({ item }) => {

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
        setOpenModal(true);
    }

  return (
    <>
        <StyledTableRow>
            <TableCell>
                <ImagenButton
                    onClick={() => handleOpenModal()}
                >
                    <CardMedia
                        component="img"
                        height="40px"
                        image={ item.image }
                        alt={ item.keyName }
                    />
                </ImagenButton>
            </TableCell>
            <TableCell>
                { item.keyName }
            </TableCell>
            <TableCell>
                    { item.keyDescription }
            </TableCell>
            <TableCell>
                { transformDate(item.createdAt) }
            </TableCell>
            <TableCell>
                { item.isBorrowed
                    ? (
                            <Chip
                                label="Prestada"
                                color="warning"
                                variant='outlined'
                            />
                    )
                    : (
                            <Chip
                                label="Disponible"
                                color="success"
                                variant='outlined'
                            />
                    )
                }
            </TableCell>
            <TableCell>
                { item.deliveredBy }
            </TableCell>  
            <TableCell>
                { item.createBy }
            </TableCell>  
        </StyledTableRow>
        <ImageModal 
        url={item.image}
        isOpen={openModal}
        handleClose={() => setOpenModal(false)}
        />
    </>
  )
}
