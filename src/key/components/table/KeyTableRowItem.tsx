import { FC, useState } from 'react';
import { Button, CardMedia, Chip, TableCell, TableRow, styled } from '@mui/material';

import { ImageModal } from '../modal/ImageModal';
import { Key } from '../../interfaces';
import { DateTransformed } from '@/common/components/ui/DateTransformed';

const ImagenButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#FFFFFF'),
    boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
    backgroundColor: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#FFFFFF',
    },
    }));

interface Props {
    item: Key;
}

export const KeyTableRowItem: FC<Props> = ({ item }) => {

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
        setOpenModal(true);
    }

  return (
    <>
        <TableRow>
            <TableCell>
                <ImagenButton
                    onClick={() => handleOpenModal()}
                >
                    <CardMedia
                        component="img"
                        height="40px"
                        image={`${import.meta.env.VITE_URL_BACKEND_PUBLIC_URL}${item.image}`}
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
                <DateTransformed date={item.createdAt} />
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
        </TableRow>
        <ImageModal 
        url={`${import.meta.env.VITE_URL_BACKEND_PUBLIC_URL}${item.image}`}
        isOpen={openModal}
        handleClose={() => setOpenModal(false)}
        />
    </>
  )
}
