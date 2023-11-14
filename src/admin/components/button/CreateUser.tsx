import { useState } from 'react';
import { Button, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { CreateUserModal } from '../modal/CreateUserModal';

export const CreateUser = () => {

    const [ isOpenModal, setIsOpenModal ] = useState<boolean>(false);
    const handleClose = () => setIsOpenModal(false);
  return (
    <>
    <Button
      onClick={() => setIsOpenModal(true)}
      variant='contained'
      sx={{
          gap: 0.5,
      }}
    >
      <AddIcon />
        <Typography variant='button'>
            Crear Usuario
        </Typography>
    </Button>

    {
        isOpenModal && (
            <CreateUserModal 
                isOpen={isOpenModal}
                handleClose={handleClose}
            />
        )
    }
  </>
  )
}
