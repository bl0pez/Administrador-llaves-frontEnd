import { FC, useEffect, useState } from 'react';
import { IBorrowKey, IKey, IvalidateKeyAvailability } from '@/app/interfaces';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MainModal } from './MainModal';
import { Autocomplete, Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ErrorAlert } from '../alert/ErrorAlert';
import { getBorrowedKeys } from '../../services/borrowedKeys/getBorrowedKeys';
import { postBorrowedKeys } from '@/app/services/borrowedKeys/postBorrowedKeys';
import { ButtonForm } from '@/components/button/ButtonForm';

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
        setAutocompleteOptions(keys ? keys : []);
    }

    useEffect(() => {
        getKeysIsBorrowed();
    }, [isOpenAutocomplete])

    const keysOptions = autocompleteOptions.map((key) => ({
        id: key.keyId,
        label: key.keyName,
    }))





    const { values, handleSubmit, errors, getFieldProps, touched, handleChange } = useFormik<IBorrowKey>({
        initialValues: initialFormValues,
        onSubmit: async (values, { resetForm }) => {      
          setIsLoading(true);
    
          try {
            
            const BorrowedKey = await postBorrowedKeys(values);
            
            
            
    
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
            keyId: Yup.string()
                        .uuid('Campo invalido')
                        .required('Este campo es requerido')
                        .test('is-key-available', 'Llave no valida', (value) => {
                          const isKeyAvailable = keysOptions.find((key) => key.id === value);
                          return !!isKeyAvailable;
                        })
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
        <Typography variant={'h5'} textAlign={'center'}>Crear prestamo de llave</Typography>

        <TextField
            label='solictado por'
            variant='outlined'
            {...getFieldProps('borrowerName')}
            error={touched.borrowerName && Boolean(errors.borrowerName)}
            helperText={touched.borrowerName && errors.borrowerName}
        />

        <TextField
            label='servicio o empresa'
            variant='outlined'
            {...getFieldProps('borrowerServiceOrCompany')}
            error={touched.borrowerServiceOrCompany && Boolean(errors.borrowerServiceOrCompany)}
            helperText={touched.borrowerServiceOrCompany && errors.borrowerServiceOrCompany}
        />

        <Autocomplete
            disablePortal
            id="autocomplete-key"
            options={keysOptions}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            sx={{ width: 300 }}
            open={isOpenAutocomplete}
            onOpen={() => setIsOpenAutocomplete(true)}
            onClose={() => setIsOpenAutocomplete(false)}
            getOptionLabel={(option) => option.label}

            renderInput={(params) => <TextField {...params} label="Llave" helperText={touched.keyId && errors.keyId} value={values.keyId} error={Boolean(touched.keyId) && Boolean(errors.keyId)} />}
            onChange={(event, value) => {
                if(value) {
                  handleChange({
                    target: {
                      name: 'keyId',
                      value: value.id
                    }
                  })
                }
            }}
        />

        <Box>
          
        
        <ButtonForm
            type='submit'
            title='Crear'
            isLoading={isLoading}
            icon={AddIcon}
        />
        
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
