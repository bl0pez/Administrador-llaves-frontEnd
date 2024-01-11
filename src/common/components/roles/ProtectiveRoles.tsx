import { useAuth } from "@/auth/context";
import { Roles } from "@/common/interfaces"

interface Props {
    roles: Roles[];
    children: React.ReactNode;
}

export const ProtectiveRoles = ({ roles, children }: Props) => {
    const { authstate } = useAuth();
    const isAuthorized = roles.some((role) => authstate.role.includes(role));
    if (!isAuthorized) return null;
    return (<>{ children }</>)
}
