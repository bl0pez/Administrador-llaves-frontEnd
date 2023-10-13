import { FC } from 'react';
import { Button, CardMedia, IconButton, TableCell, TableRow, Typography, styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Key } from '@/keys/interfaces';

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
    item: Key;
    handleOpenModal: (url: string) => void;
}

export const KeyTableRowItem: FC<Props> = ({ item, handleOpenModal }) => {
  return (
    <StyledTableRow key={item._id}>
        <TableCell>
            <ImagenButton
                onClick={() => handleOpenModal(item.image)}
            >
                <CardMedia
                    component="img"
                    height="40px"
                    image={ item.image }
                    alt="green iguana"
                />
            </ImagenButton>
        </TableCell>
        <TableCell>
            { item.name }
        </TableCell>
        <TableCell>
            { item.description }
        </TableCell>
        <TableCell>
            { new Date().toLocaleDateString() }
        </TableCell>
        <TableCell>
            { item.status 
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
            <IconButton aria-label="delete" size="small">
                <DeleteIcon fontSize="small" />
            </IconButton>
        </TableCell>  
    </StyledTableRow>
  )
}
