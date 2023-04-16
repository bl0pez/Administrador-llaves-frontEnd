import { createContext, useState } from 'react';

export type SidebarContextProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const SidebarContext = createContext({} as SidebarContextProps);

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const SidebarProvider = ({ children }: Props) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <SidebarContext.Provider value={{
            isOpen,
            setIsOpen
        }}>
            {children}
        </SidebarContext.Provider>
    )
}

