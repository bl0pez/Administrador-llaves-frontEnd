import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/context/AuthContext";
import AppLayout from "@/app/layouts/AppLayout";
import { KeyProvider } from "@/app/context/KeyContext";

{/* <KeyProvider>
<BorrowedKeyProvider>
  <KeyHistoryProvider>
    <AppLayout />
  </KeyHistoryProvider>
</BorrowedKeyProvider>
</KeyProvider> */}

const PrivateRouter = () => {

  const { authstate } = useAuth();

  return authstate?.status === 'authenticated'
    ? (
      <KeyProvider>
        <AppLayout />
      </KeyProvider>
    )
    : (<Navigate to="/auth/login" />)
}

export default PrivateRouter;
