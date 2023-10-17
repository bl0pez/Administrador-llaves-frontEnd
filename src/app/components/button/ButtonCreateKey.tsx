import { useState } from 'react';
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { CreateKeyModal } from '../modal';

export const ButtonCreateKey = () => {

  const [ isOpenModal, setIsOpenModal ] = useState<boolean>(false);

  return (
        <>
            <Button
              onClick={() => setIsOpenModal(true)}
              variant='contained'
              sx={{
                  gap: 0.5,
                  position: 'absolute',
                  top: 20,
                  right: 0,
              }}
          >
              <AddIcon />
              <Typography variant='button'>
                  Crear Llave
              </Typography>
          </Button>
          {
              isOpenModal && <CreateKeyModal
                isOpen={isOpenModal}
                handleClose={() => setIsOpenModal(false)}
              />
          }
        </>
  )
}
