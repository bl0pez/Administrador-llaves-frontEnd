import { FC, useEffect, useRef, useState } from 'react';
import { Box, Button, styled, Typography, TextField, CircularProgress, Card, CardMedia } from '@mui/material';
import { MainModal } from './MainModal';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';
import ImageIcon from '@mui/icons-material/Image';
import { green } from '@mui/material/colors';
import { useFormik, FormikErrors, Formik } from 'formik';
import * as Yup from 'yup';
import { InputUploadImage } from '../UploadImage'; 
import { keyCreationService } from '@/keys/services/keyCreationService';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const initialFormValues = {
  name: '',
  description: '',
  deliveryBy: '',
  image: null
}

type FormValuesKey = {
  name: string;
  description: string;
  deliveryBy: string;
  image: string | null;
}

export const CreateKeyModal: FC<Props> = ({ isOpen, handleClose }) => {

  const [isLoading, setIsLoading] = useState(false);
  const { values, handleSubmit, errors, getFieldProps, touched, handleChange } = useFormik<FormValuesKey>({
    initialValues: initialFormValues,
    onSubmit: async (values, { resetForm }) => {
      
      setIsLoading(true);

      try {
        
        const newKey = await keyCreationService(values);

        resetForm();

      } catch (error) {
        console.log(error);
      }finally {
        setIsLoading(false);
      }

    },
    validationSchema: Yup.object({
      name: Yup.string()
                    .min(3, 'El nombre debe tener al menos 3 caracteres')
                    .max(20, 'El nombre debe tener menos de 20 caracteres')
                    .required('Este campo es requerido'),
      description: Yup.string()
                    .min(3, 'La descripción debe tener al menos 3 caracteres')
                    .max(30, 'La descripción debe tener menos de 20 caracteres')
                    .required('Este campo es requerido'),
      deliveryBy: Yup.string()
                    .min(3, 'La entrega debe tener al menos 3 caracteres')
                    .max(30, 'La entrega debe tener menos de 20 caracteres')
                    .required('Este campo es requerido'),
      image: Yup.mixed().required('Agrega una imagen')
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
        p={4}
        display={'flex'}
        flexDirection={'column'}
        gap={4}
        borderRadius={2}
        width={'400px'}
    >
        <Typography variant={'h5'} textAlign={'center'}>Crear llave</Typography>

        <TextField
            color='primary'
            autoComplete='off'
            variant='outlined'
            label='Nombre de la llave'
            { ...getFieldProps('name') }
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
            required
        />

        <TextField
            color='primary'
            autoComplete='off'
            variant='outlined'
            label='Descripción de la llave'
            multiline
            { ...getFieldProps('description') }
            error={touched.description && Boolean(errors.description)}
            helperText={touched.description && errors.description}
            required
        />

        <TextField
            color='primary'
            autoComplete='off'
            variant='outlined'
            label='Entrega por'
            { ...getFieldProps('deliveryBy') }
            error={touched.deliveryBy && Boolean(errors.deliveryBy)}
            helperText={touched.deliveryBy && errors.deliveryBy}
            required
        />

        <InputUploadImage 
          handleChange={handleChange}
          image={values.image}
          error={Boolean(touched.image) && Boolean(errors.image)}
          helperText={errors.image}    
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
    </MainModal>
  )
}
