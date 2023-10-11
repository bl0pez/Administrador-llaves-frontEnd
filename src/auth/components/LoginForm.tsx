import { Box, Typography, TextField, Button } from '@mui/material';
import { useForm, FormValidations } from '../../hooks';
import { useAuth } from '../context/AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';

const initialState = {
    email: '',
    password: ''
}

const formValidations: FormValidations = {
    'email': [(value: string) => value.trim().length > 4, 'El email es requerido'],
    'password': [(value: string) => value.trim().length > 4, 'La contraseña es requerida'],
}

export const LoginForm = () => {

    const { handleLogin } = useAuth();
    const { formValues, onInputChange, onBluer, errors } = useForm(initialState, formValidations);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        //Validamos que los campos no esten vacios
        if (formValues.email.trim().length === 0 || formValues.password.trim().length === 0) {
            return;
        }

        handleLogin(formValues);

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
            }}
            >
                <LoginIcon
                    fontSize='small'
                />
                Ingresar
        </Button>
    </Box>
  )
}
