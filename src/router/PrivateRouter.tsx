import { Navigate } from "react-router-dom";
import { Layouts } from "../keys/pages/Layouts";
import { useAuth } from "../auth/context/AuthContext";
import { BorrowedKeyProvider, KeyHistoryProvider, KeyProvider } from '@/keys/context';


const PrivateRouter = () => {

  const { authstate } = useAuth();

  return authstate?.status === 'authenticated'
    ? (
          <KeyProvider>
            <BorrowedKeyProvider>
              <KeyHistoryProvider>
                <Layouts />
              </KeyHistoryProvider>
            </BorrowedKeyProvider>
          </KeyProvider>
    )
    : (<Navigate to="/auth/login" />)
}

export default PrivateRouter;
