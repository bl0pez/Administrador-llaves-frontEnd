import { FC } from 'react';
import { Card, CardMedia } from '@mui/material';
import { MainModal } from '@/common/components/modal';

interface Props {
    url: string;
    alt: string;
    isOpen: boolean;
    handleClose: () => void;
}


export const ImageModal:FC<Props> = ({
    url,
    alt,
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
                        backgroundColor: '#424242',
                    }}
                    image={url}
                    alt={alt}
                />
        </Card>
    </MainModal>
  )
}
