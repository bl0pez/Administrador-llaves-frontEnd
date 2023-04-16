import { RouterProvider } from 'react-router-dom';
import { router } from "./router";
import { KeyProvider } from './keys/context/KeyContext';
import { SidebarProvider } from './context/SidebarContext';

export const App = () => {

  return (
    <>
      <SidebarProvider>
        <KeyProvider>
          <RouterProvider router={router} />
        </KeyProvider>
      </SidebarProvider>
    </>
  )
}

