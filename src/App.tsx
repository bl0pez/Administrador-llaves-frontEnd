import { AuthProvider } from './auth/context/AuthContext';
import { MainRouter } from './router/MainRouter';
import { ThemeContextProvider } from './theme/ThemeContextProvider';

export const App = () => {
  return (
    <ThemeContextProvider>
      <AuthProvider>
        <MainRouter />
      </AuthProvider>
    </ThemeContextProvider>
  )
}

