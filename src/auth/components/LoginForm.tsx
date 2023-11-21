import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Box, Typography, Alert, Snackbar, SlideProps, Slide} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import { useAuth } from '../context/AuthContext';
import { LoginUser } from '../interfaces';
import { loginService } from '../services';

import { ButtonForm } from '@/common/components/button';
import { InputForm } from '@/common/components/input';
import { yupValidation } from '@/admin/helpers';

const initialState: LoginUser = {
    email: '',
    password: ''
}

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="right" />;
}

export const LoginForm = () => {

    const { handleLogin } = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

        const { handleSubmit, errors, getFieldProps, touched } = useFormik<LoginUser>({
            initialValues: initialState,
            onSubmit: async (values) => {
              
              setIsLoading(true);
        
              try {
                
                const { token, user } = await loginService(values);
                localStorage.setItem('token', token);
                handleLogin(user)
        
              } catch (error) {
                setIsError(true);
              }finally {
                setIsLoading(false);
              }
        
            },
            validationSchema: Yup.object({
              email: yupValidation.email(),
              password: yupValidation.password()
            })
          });

  return (
    <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
           boxShadow: { xs: 0, md: 4 },
        }}
        p={4}
        display={'flex'}
        flexDirection={'column'}
        gap={4}
        borderRadius={2}
        width={'400px'}
    >

        <Snackbar
            sx={{
                position: 'absolute',
            }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} 
            open={isError}
            TransitionComponent={SlideTransition}
            autoHideDuration={4000} 
            onClose={() => setIsError(false)}>
            <Alert variant="filled" severity="error" sx={{ width: '100%' }}>
                Email o contraseña incorrectos
            </Alert>
        </Snackbar>

        <Typography 
            variant='h1' 
            align='center' 
            gap={2}
            fontSize={28} 
            display={'flex'} 
            justifyContent={'center'}
            alignItems={'center'}
            >
                <AccountCircleIcon fontSize='large' color='primary' />  
                Iniciar sesión
        </Typography>

        <InputForm
            label='Email'
            type='email'
            { ...getFieldProps('email') }
            isError={Boolean(touched.email) && Boolean(errors.email)}
            helperText={touched.email && errors.email}
        />

        <InputForm
            label='Contraseña'
            type='password'
            { ...getFieldProps('password') }
            isError={Boolean(touched.password) && Boolean(errors.password)}
            helperText={touched.password && errors.password}
        />

        <ButtonForm
            type='submit'
            title='Iniciar sesión'
            isLoading={isLoading}
            icon={LoginIcon}
        />
    </Box>
  )
}
