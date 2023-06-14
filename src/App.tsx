import { RouterProvider } from 'react-router-dom';
import 'sweetalert2/dist/sweetalert2.min.css';

import { router } from "./router";
import { ModalProvider, SidebarProvider } from './context';
import { AuthProvider, useAuth } from './auth/context/AuthContext';

export const App = () => {

  const { authstate } = useAuth();

  return (
    <>
      <SidebarProvider>
        <AuthProvider>
            <ModalProvider>
                <RouterProvider router={router} />
            </ModalProvider>
        </AuthProvider>
      </SidebarProvider>
    </>
  )
}

