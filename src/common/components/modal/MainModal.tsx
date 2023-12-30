import { FC } from 'react';
import { Modal, Fade, Backdrop, Box } from '@mui/material';
import { useThemeContext } from '@/theme/ThemeContextProvider';

interface Props {
    isOpen: boolean;
    children: JSX.Element | JSX.Element[];
    handleClose: () => void; 
}

export const MainModal: FC<Props> = ({ children, handleClose, isOpen}) => {

    const { mode } = useThemeContext();

    const style = {
        minWidth: '300px',
        with: '400px',
        backgroundColor: mode === 'dark' ? '#424242' : '#fff',
        zIndex: 9999,
    };

  return (
    <Modal
        open={isOpen}
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)'
        }}
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
            <Box 
                borderRadius={2}
                boxShadow={4}
                border={1}
                sx={style}
            >
            {children}
            </Box>
        </Fade>
    </Modal>
  )
}
