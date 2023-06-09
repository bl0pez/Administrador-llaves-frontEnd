import { useForm, FormValidations } from "../../hooks";
import { useAuth } from "../context/AuthContext";

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
    <form
    onSubmit={handleSubmit} 
    className='mt-8 space-y-6'>
    <input type='hidden' name='remember' defaultValue='true' />
    <div className='rounded-md shadow-sm -space-y-px'>
        <div>
            <label htmlFor='email-address' className='sr-only'>
                Email address
            </label>
            <input

                id='email-address'
                name='email'
                type='email'
                value={formValues.email}
                onChange={onInputChange}
                autoComplete='email'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Email address'
                onBlur={onBluer}
            />
            {
                errors.email && <span className='text-red-500 text-xs'>{errors.email}</span>
            }
        </div>
        <div>
            <label htmlFor='password' className='sr-only'>
                Password
            </label>
            <input

                id='password'
                name='password'
                type='password'
                value={formValues.password}
                onChange={onInputChange}
                autoComplete='current-password'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Password'
                onBlur={onBluer}
            />
            {
                errors.password && <span className='text-red-500 text-xs'>{errors.password}</span>
            }
        </div>
    </div>


    <div>
        <button
            type='submit'
            // className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            className='btn'
        >
            Ingresar
        </button>
    </div>
</form>
  )
}
