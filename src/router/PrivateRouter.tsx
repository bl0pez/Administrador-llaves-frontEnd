import { Navigate } from "react-router-dom";
import { Layouts } from "../keys/pages/Layouts";
import { useAuth } from "../auth/context/AuthContext";
import { KeyProvider, UiProvider } from "../keys/context";

export const PrivateRouter = () => {

  const { authstate } = useAuth();

  if (authstate.status === 'checking') return (<div>Checking...</div>)

  return authstate.status === 'authenticated'
    ? (
      <UiProvider>
        <KeyProvider>
          <Layouts />
        </KeyProvider>
      </UiProvider>
    )
    : (<Navigate to="/auth/login" />)
}
