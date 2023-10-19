import {useState } from 'react';
import { Button, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

import { CreateBorrowedKeyModal } from '../modal/CreateBorrowedKeyModal';

export const ButtonCreateBorrowedKey = () => {

  const [ isOpenModal, setIsOpenModal ] = useState<boolean>(false);

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
              Crear Llave Prestada
          </Typography>
      </Button>

      <CreateBorrowedKeyModal 
        isOpen={isOpenModal}
        handleClose={() => setIsOpenModal(false)}
      />
    
    </>
  )
}
