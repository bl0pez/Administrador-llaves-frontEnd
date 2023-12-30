import { Roles } from "@/common/interfaces"

interface Props {
    roles: Roles[];
    children: React.ReactNode;
}

export const ProtectiveRoles = ({ roles, children }: Props) => {
    const isAuthorized = roles.some((role) => Object.values(Roles).includes(role));
    if (!isAuthorized) return null;
    return (<>{ children}</>)
}
