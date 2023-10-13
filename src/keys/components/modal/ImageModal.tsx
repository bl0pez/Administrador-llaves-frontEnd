import { FC } from 'react';
import { Backdrop, Box, Card, CardMedia, Fade, Modal } from '@mui/material';

interface Props {
    url: string;
    isOpen: boolean;
    handleOpen: () => void;
    handleClose: () => void;

}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '300px',
    with: '400px',
    boxShadow: 24,
};


export const ImageModal:FC<Props> = ({
    url,
    isOpen,
    handleOpen,
    handleClose
}) => {
  return (
    <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 200,
          },
        }}
    >
        <Fade in={isOpen}>
        <Box sx={style}>
            <Card>
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
        </Box>
        </Fade>
    </Modal>
  )
}
