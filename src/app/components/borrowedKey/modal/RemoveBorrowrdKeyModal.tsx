import { FC, useState } from 'react';

import { Box, Typography, Button, CircularProgress } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import { MainModal } from '../../modal';
import { useBorrowedKeyContext } from '@/app/context/BorrowedKeyContext';
import { closeBorrowedKeyService } from '@/app/services/borrowedKeys';

type Props = {
    open: boolean;
    handleClose: () => void;
    borrowedKeyId: string;
}

export const RemoveBorrowrdKeyModal:FC<Props> = ({open, handleClose, borrowedKeyId }) => {

    const { closeBorrowedKey} = useBorrowedKeyContext();
    const [isLoading, setIsLoading] = useState(false);

    const handleRemoveBorrowedKey = async () => {
        try {
            setIsLoading(true);
            await closeBorrowedKeyService(borrowedKeyId);
            closeBorrowedKey(borrowedKeyId);
            handleClose();
        } catch (error: any) {
            throw new Error(error);
        }finally{
            setIsLoading(false);
        }
    }



  return (
    <MainModal isOpen={open} handleClose={handleClose}        
    >
        <Box 
            p={2}
        >
            <Typography variant="h6" component="h2" gutterBottom>
                ¿Está seguro que realizar esta acción?
            </Typography>
            <Box
                display="flex"
                justifyContent="center"
                gap={2}
            >
                <Button
                    variant="contained"
                    color="success"
                    disabled={isLoading}
                    onClick={handleRemoveBorrowedKey}
                >
                    {
                        isLoading 
                        ? <CircularProgress size={20} /> 
                        : <TaskAltIcon  color='action' /> 
                    }
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleClose}
                >
                    <HighlightOffIcon />
                </Button>
            </Box>
        </Box>
    </MainModal>
  )
}
