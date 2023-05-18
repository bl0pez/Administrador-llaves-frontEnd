import { RouterProvider } from 'react-router-dom';
import { router } from "./router";
import { KeyProvider, UiProvider } from './keys/context';
import { ModalProvider, SidebarProvider } from './context';

export const App = () => {

  return (
    <>
      <SidebarProvider>
        <KeyProvider>

          <ModalProvider>
            <UiProvider>
              <RouterProvider router={router} />
            </UiProvider>
          </ModalProvider>

        </KeyProvider>
      </SidebarProvider>
    </>
  )
}

