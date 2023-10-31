import { ToggleThemeMode } from '@/common/components/ui';
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