import { FC, useEffect, useState } from 'react';
import { IBorrowKey, IKey, IvalidateKeyAvailability } from '@/app/interfaces';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MainModal } from './MainModal';
import { Autocomplete, Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ErrorAlert } from '../alert/ErrorAlert';
import { getBorrowedKeys } from '../../services/getBorrowedKeys';

interface Props {
    isOpen: boolean;
    handleClose: () => void;
}

const initialFormValues: IBorrowKey = {
    borrowerName: '',
    borrowerServiceOrCompany: '',
    keyId: '',
}

export const CreateBorrowedKeyModal:FC<Props> = ({ handleClose, isOpen }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const [isOpenAutocomplete, setIsOpenAutocomplete] = useState<boolean>(false);
    const [autocompleteOptions, setAutocompleteOptions] = useState<IvalidateKeyAvailability[]>([]);

    const getKeysIsBorrowed = async () => {
        const keys = await getBorrowedKeys();
        console.log(keys);
        
        setAutocompleteOptions(keys ? keys : []);
    }

    useEffect(() => {
        getKeysIsBorrowed();
    }, [isOpenAutocomplete])

    const keysOptions = autocompleteOptions.map((key) => ({
        id: key.keyId,
        label: key.keyName,
    }))





    const { values, handleSubmit, errors, getFieldProps, touched, handleChange, setValues  } = useFormik<IBorrowKey>({
        initialValues: initialFormValues,
        onSubmit: async (values, { resetForm }) => {      
          setIsLoading(true);
    
          try {
            
            
            
    
            resetForm();
            handleClose();
    
          } catch (error: any) {
            setErrorMessage(error.message);
          }finally {
            setIsLoading(false);
          }
    
        },
        validationSchema: Yup.object({
            borrowerName: Yup.string()
                        .min(3, 'Este campo debe tener al menos 3 caracteres')
                        .max(40, 'Este campo debe tener menos de 40 caracteres')
                        .required('Este campo es requerido'),
            borrowerServiceOrCompany: Yup.string()
                        .min(3, 'Este campo debe tener al menos 3 caracteres')
                        .max(40, 'Este campo debe tener menos de 40 caracteres')
                        .required('Este campo es requerido'),
          deliveredBy: Yup.string()
                        .min(3, 'La entrega debe tener al menos 3 caracteres')
                        .max(30, 'La entrega debe tener menos de 20 caracteres')
                        .required('Este campo es requerido'),
          file: Yup.mixed().required('Agrega una imagen')
        })
      });

  return (
    <MainModal
        isOpen={isOpen}
        handleClose={handleClose}
    >
        <Box
        component='form'
        onSubmit={handleSubmit}
        boxShadow={4}
        p={2}
        display={'flex'}
        flexDirection={'column'}
        gap={2}
        borderRadius={2}
    >
        <Typography variant={'h5'} textAlign={'center'}>Crear llave</Typography>

        <Box>
          
        
    
        <Button
            variant='contained'
            color='primary'
            type='submit'
            sx={{
                gap: 1,
                height: '40px',
            }}
            disabled={isLoading}
        >
              {
                  isLoading
                      ?  (<>
                            <CircularProgress  
                              size={20}
                            />
                          Creando prestamo de llave
                      
                          </>
                        ) 
                      : (<>
                          <AddIcon fontSize='small' />
                          Crear prestamo de llave
                      </>)
              }
        </Button>
      </Box>
      <ErrorAlert 
        isError={Boolean(errorMessage)}
        message={errorMessage}
        setIsError={() => true}
      />                
    
        </Box>
    </MainModal>
  )
}
