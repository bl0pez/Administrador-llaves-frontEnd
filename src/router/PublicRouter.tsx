import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/context/AuthContext";
import Auth from "@/auth/layouts/Auth";
const PublicRouter = () => {
 
    const { authstate } = useAuth();

    return authstate?.status === 'not-authenticated' ? <Auth /> : <Navigate to="/" />

}

export default PublicRouter;


