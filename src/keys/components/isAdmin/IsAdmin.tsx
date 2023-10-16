import { useAuth } from '@/auth/context/';

interface Props {
    children: JSX.Element | JSX.Element[];
    roles: string[];
}

/**
 * Componente que permite mostrar un componente
 * solo si el usuario cuenta con el rol de administrador
 */
export const IsAdmin = ({ children, roles }: Props) => {

    const { authstate } = useAuth();

  return (
    <>
        {
            roles?.includes('admin') &&
            (
                children
            )
        }
    </>
  )
}
