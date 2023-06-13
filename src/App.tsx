import { RouterProvider } from 'react-router-dom';
import { router } from "./router";
import { KeyProvider, UiProvider } from './keys/context';
import { ModalProvider, SidebarProvider } from './context';
import { AuthProvider, useAuth } from './auth/context/AuthContext';

export const App = () => {

  const { authstate } = useAuth();

  return (
    <>
      <SidebarProvider>
        <AuthProvider>
          <KeyProvider>
            <ModalProvider>
              <UiProvider>
                <RouterProvider router={router} />
              </UiProvider>
            </ModalProvider>
          </KeyProvider>
        </AuthProvider>
      </SidebarProvider>
    </>
  )
}

