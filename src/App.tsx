import { RouterProvider } from 'react-router-dom';
import { router } from "./router";
import { KeyProvider } from './keys/context/KeyContext';


export const App = () => {
  return (
    <>
    <KeyProvider>
      <RouterProvider router={router} />
    </KeyProvider>
    </>
  )
}

