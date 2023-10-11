import 'sweetalert2/dist/sweetalert2.min.css';

import { AuthProvider } from './auth/context/AuthContext';
import { MainRouter } from './router/MainRouter';
import { ThemeContextProvider } from './theme/ThemeContextProvider';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const App = () => {
  return (
    <ThemeContextProvider>
      <AuthProvider>
        <MainRouter />
      </AuthProvider>
    </ThemeContextProvider>
  )
}

