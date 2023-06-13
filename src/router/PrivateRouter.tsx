import { Navigate } from "react-router-dom";
import { Layouts } from "../keys/pages/Layouts";
import { useAuth } from "../auth/context/AuthContext";

export const PrivateRouter = () => {

    const { authstate } = useAuth();

  if(authstate.status === 'checking') return (<div>Checking...</div>)

  return authstate.status === 'authenticated' ? <Layouts /> : <Navigate to="/auth/login" />
}
