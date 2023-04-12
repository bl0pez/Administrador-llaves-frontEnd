import { RouterProvider } from 'react-router-dom';
import { router } from "./router";
import { KeyProvider } from './components/context/KeyProvider';

export const App = () => {
  return (
    <>
    <KeyProvider>
      <RouterProvider router={router} />
    </KeyProvider>
    </>
  )
}

