import { Box, Typography, TextField, Button, CircularProgress, Alert, Snackbar, SlideProps, Slide} from '@mui/material';
import { useForm, FormValidations } from '../../hooks';
import { useAuth } from '../context/AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import { useState } from 'react';
import { keyApi } from '@/api/keyApi';
import { FetchAuth } from '../interfaces';

const initialState = {
    email: '',
    password: ''
}

const formValidations: FormValidations = {
    'email': [(value: string) => value.trim().length > 4, 'El email es requerido'],
    'password': [(value: string) => value.trim().length > 4, 'La contraseña es requerida'],
}

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="right" />;
}

export const LoginForm = () => {

    const { handleLogin } = useAuth();
    const { formValues, onInputChange, onBluer, errors } = useForm(initialState, formValidations);
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        setIsLogin(true);
        //Validamos que los campos no esten vacios
        if (formValues.email.trim().length === 0 || formValues.password.trim().length === 0) {
            return;
        }

        
        try {
            
            const resp = await keyApi.post<FetchAuth>('/login', formValues);

            //Guardamos el token en el localstorage
            localStorage.setItem('token', resp.data.token);
            
            handleLogin(resp.data.user)


        } catch (error : any) {
            setIsError(true);
        } finally {
            setIsLogin(false);
        }

    }

  return (
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

        <TextField
            color='primary'
            variant='outlined'
            label='Email'
            name='email'
            value={formValues.email}
            onChange={onInputChange}
            onBlur={onBluer}
            error={!!errors.email}
            helperText={errors.email}
            required
        />

        <TextField
            color='primary'
            variant='outlined'
            label='Contraseña'
            name='password'
            type='password'
            value={formValues.password}
            onChange={onInputChange}
            onBlur={onBluer}
            error={!!errors.password}
            helperText={errors.password}
            required
        />

        <Button
            variant='contained'
            color='primary'
            type='submit'
            sx={{
                gap: 1,
                height: '40px',
            }}
            disabled={isLogin}
            >
                {
                    isLogin 
                        ?  <CircularProgress  
                            size={20}
                        /> : <LoginIcon  fontSize='small' />
                }
                    Iniciar sesión
        </Button>
    </Box>
  )
}
