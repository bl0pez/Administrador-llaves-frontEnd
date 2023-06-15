import { useAuth } from "../../../auth/context/AuthContext";

interface Props {
    children: JSX.Element | JSX.Element[];
}

/**
 * Componente que permite mostrar un componente
 * solo si el usuario cuenta con el rol de administrador
 */
export const IsAdmin = ({ children }: Props) => {

    const { authstate } = useAuth();

  return (
    <>
        {
            authstate.role === 'ADMIN_ROLE' &&
            (
                children
            )
        }
    </>
  )
}
