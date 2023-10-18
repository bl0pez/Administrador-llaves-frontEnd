import { FC, useState, lazy } from 'react';
import { Button, CardMedia, IconButton, TableCell, TableRow, Typography, styled } from '@mui/material';
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
    const [urlImage, setUrlImage] = useState('');

    const handleOpenModal = (url: string) => {
        setOpenModal(true);
        setUrlImage(url);
    }

  return (
    <>
        <StyledTableRow>
            <TableCell>
                <ImagenButton
                    onClick={() => handleOpenModal(item.image)}
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
                { item.isLoaned
                    ? (
                        <Typography
                                fontSize={12} 
                                color='green'
                                whiteSpace={'nowrap'} 
                                sx={{ fontWeight: 'light' }}
                                border={1}
                                borderRadius={1}
                                padding={1}
                                display={'inline-block'}
                            >
                                Disponible
                            </Typography>
                    ) 
                    : (
                            <Typography
                            fontSize={12}
                                whiteSpace={'nowrap'} 
                                color='red'
                                sx={{ fontWeight: 'light' }}
                                border={1}
                                borderRadius={1}
                                padding={1}
                                display={'inline-block'}
                            >
                                No disponible
                            </Typography>
                    ) }
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
