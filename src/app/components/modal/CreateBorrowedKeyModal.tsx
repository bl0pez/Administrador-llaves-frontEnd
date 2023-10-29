import { FC, useEffect, useMemo, useState } from 'react';
import { ICreateBorrowdKey, IvalidateKeyAvailability } from '@/app/interfaces';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MainModal } from './MainModal';
import { Autocomplete, Box, CircularProgress, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ErrorAlert } from '../alert/ErrorAlert';
import { getBorrowedKeys } from '../../services/borrowedKeys/getBorrowedKeys';
import { ButtonForm } from '@/components/button/ButtonForm';
import { useBorrowedKeyContext } from '@/app/context/BorrowedKeyContext';
import { createBorrowedKeyService } from '@/app/services/borrowedKeys/createBorrowedKeyService';

interface Props {
    isOpen: boolean;
    handleClose: () => void;
}

const initialFormValues: ICreateBorrowdKey = {
    borrowerName: '',
    borrowerServiceOrCompany: '',
    keyId: '',
}

export const CreateBorrowedKeyModal:FC<Props> = ({ handleClose, isOpen }) => {

    const { createBorrowedKey } = useBorrowedKeyContext();

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const [keyOptions, setKeyOptions] = useState<IvalidateKeyAvailability[]>([]);
    const [keyLoading, setKeyLoading] = useState<boolean>(false);
    
    const isOpenAutocompleteHandler = async() => {
      
      setKeyLoading(true);
      const keys = await getBorrowedKeys();
      setKeyOptions(keys);
      setKeyLoading(false);

    }




    const { handleSubmit, errors, getFieldProps, touched, handleChange } = useFormik<ICreateBorrowdKey>({
        initialValues: initialFormValues,
        onSubmit: async (values, { resetForm }) => {      
          setIsLoading(true);
    
          try {
            
            const BorrowedKey = await createBorrowedKeyService(values);
            createBorrowedKey(BorrowedKey);
    
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
                          const isKeyAvailable = keyOptions.find((key) => {
                            return key.keyId === value;
                          });
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
            id="keyId"
            onOpen={isOpenAutocompleteHandler}
            options={keyOptions}
            getOptionLabel={(option) => option.keyName}
            isOptionEqualToValue={(option, value) => option.keyName === value.keyName}
            loading={keyLoading}
            onChange={(event, value) => {
              handleChange({
                target: {
                  name: 'keyId',
                  value: value?.keyId
                }
              })
            }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  label="Llave"
                  variant="outlined"
                  error={touched.keyId && Boolean(errors.keyId)}
                  helperText={touched.keyId && errors.keyId}
                />
              )
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
