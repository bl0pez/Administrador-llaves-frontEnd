import { FC } from 'react';
import { Card, CardMedia } from '@mui/material';
import { MainModal } from './MainModal';

interface Props {
    url: string;
    isOpen: boolean;
    handleClose: () => void;
}


export const ImageModal:FC<Props> = ({
    url,
    isOpen,
    handleClose
}) => {
  return (
    <MainModal
        handleClose={handleClose}
        isOpen={isOpen}
    >
        <Card
            sx={{
                maxWidth: 345,
            }}
        >
                <CardMedia
                    component="img"
                 
                    sx={{
                        objectFit: 'contain',
                        width: '100%',
                    }}
                    image={url}
                    alt="green iguana"
                />
        </Card>
    </MainModal>
  )
}
