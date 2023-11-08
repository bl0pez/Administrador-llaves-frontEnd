import { useState } from 'react';
import { Button, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

export const CreateUser = () => {

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
            Crear Usuario
        </Typography>
    </Button>

    {
        isOpenModal && (
            <></>
        )
    }

    
  
  </>
  )
}
