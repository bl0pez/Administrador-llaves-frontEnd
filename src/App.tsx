import { RouterProvider } from 'react-router-dom';
import 'sweetalert2/dist/sweetalert2.min.css';

import { router } from "./router";
import { AuthProvider, useAuth } from './auth/context/AuthContext';

export const App = () => {

  return (
    <>
        <AuthProvider>
                <RouterProvider router={router} />
        </AuthProvider>
    </>
  )
}

