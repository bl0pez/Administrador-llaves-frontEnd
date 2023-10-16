import { useState } from 'react';
import { Button } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { CreateKeyModal } from '../modal';

export const ButtonCreateKey = () => {

  const [ isOpenModal, setIsOpenModal ] = useState<boolean>(false);

  return (
        <>
            <Button
              onClick={() => setIsOpenModal(true)}
              variant='outlined'
              color='primary'
              sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
              }}
          >
              <AddCircleOutlineOutlinedIcon />
              Crear llave
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
