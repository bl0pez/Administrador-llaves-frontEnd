import { LoginForm } from '../components/LoginForm';


function Login() {
    return (
        <div className='flex items-center justify-center min-h-screen container mx-auto'>
            <div className='max-w-md w-full space-y-8 shadow-2xl p-2 bg-white'>
                <div>
                    <img
                        className='mx-auto h-24 w-auto'
                        src='https://www.blopez.cl/assets/logo-4d2289a5.svg'
                        alt='Workflow'
                    />
                    <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                        Iniciar sesión
                    </h2>
                </div>
                <LoginForm />
            </div>
        </div>
    )
}

export default Login;