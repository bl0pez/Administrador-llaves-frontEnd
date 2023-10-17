import { FC, useState } from 'react';
import { Box, Button, Typography, TextField, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InputUploadImage } from '../UploadImage'; 
import { MainModal } from './MainModal';
import { keyCreationService } from '@/app/services/keyCreationService';
import { ErrorAlert } from '../alert/ErrorAlert';
import { ICreeateKey } from '@/app/interfaces';
import { useKeyContext } from '@/app/context/KeyContext';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const initialFormValues: ICreeateKey = {
  keyName: '',
  keyDescription: '',
  deliveredBy: '',
  file: null
}

export const CreateKeyModal: FC<Props> = ({ isOpen, handleClose }) => {

  const { createKey } = useKeyContext();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { values, handleSubmit, errors, getFieldProps, touched, handleChange, setValues } = useFormik<ICreeateKey>({
    initialValues: initialFormValues,
    onSubmit: async (values, { resetForm }) => {      
      setIsLoading(true);

      try {
        
        const newKey = await keyCreationService(values);

        createKey(newKey);
        

        resetForm();
        handleClose();

      } catch (error: any) {
        setErrorMessage(error.message);
      }finally {
        setIsLoading(false);
      }

    },
    validationSchema: Yup.object({
      keyName: Yup.string()
                    .min(3, 'El nombre debe tener al menos 3 caracteres')
                    .max(20, 'El nombre debe tener menos de 20 caracteres')
                    .required('Este campo es requerido'),
      keyDescription: Yup.string()
                    .min(3, 'La descripción debe tener al menos 3 caracteres')
                    .max(30, 'La descripción debe tener menos de 20 caracteres')
                    .required('Este campo es requerido'),
      deliveredBy: Yup.string()
                    .min(3, 'La entrega debe tener al menos 3 caracteres')
                    .max(30, 'La entrega debe tener menos de 20 caracteres')
                    .required('Este campo es requerido'),
      file: Yup.mixed().required('Agrega una imagen')
    })
  });

  const handleImageReset = () => {
    setValues({ ...values, file: null });
  }
  

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

        <Box
          display={'flex'}
          flexWrap={'wrap'}
          gap={2}
        >
          <TextField
              color='primary'
              autoComplete='off'
              variant='outlined'
              label='Nombre de la llave'
              sx={{
                  flexGrow: 1
              }}
              { ...getFieldProps('keyName') }
              error={touched.keyName && Boolean(errors.keyName)}
              helperText={touched.keyName && errors.keyName}
              required
          />

          <TextField
              color='primary'
              autoComplete='off'
              variant='outlined'
              label='Entrega por'
              sx={{
                flexGrow: 1
              }}
              { ...getFieldProps('deliveredBy') }
              error={touched.deliveredBy && Boolean(errors.deliveredBy)}
              helperText={touched.deliveredBy && errors.deliveredBy}
              required
          />
        </Box>

        <TextField
            color='primary'
            autoComplete='off'
            variant='outlined'
            label='Descripción de la llave'
            multiline
            { ...getFieldProps('keyDescription') }
            error={touched.keyDescription && Boolean(errors.keyDescription)}
            helperText={touched.keyDescription && errors.keyDescription}
            required
        />


        <InputUploadImage 
          handleChange={handleChange}
          image={values.file}
          error={Boolean(touched.file) && Boolean(errors.file)}
          helperText={errors.file}
          handleImageReset={ handleImageReset }    
        />

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
                          Creando llave
                      
                          </>
                        ) 
                      : (<>
                          <AddIcon fontSize='small' />
                          Crear llave
                      </>)
              }
        </Button>
      </Box>
      <ErrorAlert 
        isError={Boolean(errorMessage)}
        message={errorMessage}
        setIsError={() => true}
      />        
    </MainModal>
  )
}
