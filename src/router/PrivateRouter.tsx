import { Navigate } from "react-router-dom";
import { Layouts } from "../keys/pages/Layouts";
import { useAuth } from "../auth/context/AuthContext";
import { BorrowedKeyProvider, KeyHistoryProvider, KeyProvider, ModalProvider, UiProvider } from '@/keys/context';


export const PrivateRouter = () => {

  const { authstate } = useAuth();

  return authstate?.status === 'authenticated'
    ? (
      <UiProvider>
        <ModalProvider>
          <KeyProvider>
            <BorrowedKeyProvider>
              <KeyHistoryProvider>
                <Layouts />
              </KeyHistoryProvider>
            </BorrowedKeyProvider>
          </KeyProvider>
        </ModalProvider>
      </UiProvider>
    )
    : (<Navigate to="/auth/login" />)
}
