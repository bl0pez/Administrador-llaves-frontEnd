import { FC, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { InputUploadImage } from '../UploadImage'; 
import { CreateKey } from '../../interfaces';
import { useKeyContext } from '@/key/context/KeyContext';
import { MainModal } from '@/common/components/modal';
import { InputForm } from '@/common/components/input';
import { ButtonForm } from '@/common/components/button';
import { ErrorAlert } from '@/common/components/alert';
import { addKeyService } from '@/key/services/key.service';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const initialFormValues: CreateKey = {
  keyName: '',
  keyDescription: '',
  deliveredBy: '',
  file: null
}

export const CreateKeyModal: FC<Props> = ({ isOpen, handleClose }) => {
  const { createKey } = useKeyContext();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { values, handleSubmit, errors, getFieldProps, touched, handleChange, setValues } = useFormik<CreateKey>({
    initialValues: initialFormValues,
    onSubmit: async (values, { resetForm }) => {      
      setIsLoading(true);

      try {
        
        const newKey = await addKeyService(values);

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

          <InputForm
            label='Nombre de la llave'
            type='text'
            isError={Boolean(touched.keyName) && Boolean(errors.keyName)}
            sx={{
              flexGrow: 1
            }}
            helperText={touched.keyName && errors.keyName}
            { ...getFieldProps('keyName') }
          />

          <InputForm
            label='Entrega por'
            type='text'
            isError={Boolean(touched.deliveredBy) && Boolean(errors.deliveredBy)}
            sx={{
              flexGrow: 1
            }}
            helperText={touched.deliveredBy && errors.deliveredBy}
            { ...getFieldProps('deliveredBy') }
          />
        </Box>

        <InputForm
          label='Descripción'
          type='text'
          multiline
          isError={Boolean(touched.keyDescription) && Boolean(errors.keyDescription)}
          helperText={touched.keyDescription && errors.keyDescription}
          { ...getFieldProps('keyDescription') }
        />


        <InputUploadImage 
          handleChange={handleChange}
          image={values.file}
          error={Boolean(touched.file) && Boolean(errors.file)}
          helperText={errors.file}
          handleImageReset={ handleImageReset }    
        />

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
    </MainModal>
  )
}
