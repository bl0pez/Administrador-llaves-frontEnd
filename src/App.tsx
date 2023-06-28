import { RouterProvider } from 'react-router-dom';
import { router } from "./router";
import 'sweetalert2/dist/sweetalert2.min.css';

import { AuthProvider } from './auth/context/AuthContext';

export const App = () => {

  return (
    <>
        <AuthProvider>
                <RouterProvider router={router} />
        </AuthProvider>
    </>
  )
}

