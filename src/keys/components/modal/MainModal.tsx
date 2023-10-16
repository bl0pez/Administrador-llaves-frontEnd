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
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '300px',
        with: '400px',
        boxShadow: 24,
        borderRadius: 2,
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: mode === 'dark' ? '#424242' : '#fff',
    };

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
            <Box 
                sx={style}
            >
            {children}
            </Box>
        </Fade>
    </Modal>
  )
}
