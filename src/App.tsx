import { RouterProvider } from 'react-router-dom';
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

