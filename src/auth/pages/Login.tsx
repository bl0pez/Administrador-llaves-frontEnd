import { ToggleThemeMode } from '@/components/ui/ToggleThemeMode';
import { LoginForm } from '../components/LoginForm';

function Login() {
    return (
        <>
            <ToggleThemeMode />
            <LoginForm />
        </>
    )
}

export default Login;