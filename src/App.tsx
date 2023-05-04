import { RouterProvider } from 'react-router-dom';
import { router } from "./router";
import { KeyProvider, UiProvider } from './keys/context';
import { SidebarProvider } from './context';

export const App = () => {

  return (
    <>
      <SidebarProvider>
        <KeyProvider>
          <UiProvider>
            <RouterProvider router={router} />
          </UiProvider>
        </KeyProvider>
      </SidebarProvider>
    </>
  )
}

