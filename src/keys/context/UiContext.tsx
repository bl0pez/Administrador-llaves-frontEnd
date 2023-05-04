import { createContext, useState } from 'react';

export type UiContextProps = {
    isOpenModal: boolean;
    onOpenModal: () => void;
    onCloseModal: () => void;
}

export const UiContext = createContext({} as UiContextProps);

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const UiProvider = ({ children } : Props) => {
    
        //Estado del modal
        const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

        /**
         * Función para abrir el modal
         */
        const onOpenModal = () => {
            setIsOpenModal(true);
        }

        /**
         * Función para cerrar el modal
         */
        const onCloseModal = () => {
            setIsOpenModal(false);
        }

    
        return (
            <UiContext.Provider value={{
                //Estado del modal
                isOpenModal,
                //Funciones del modal
                onOpenModal,
                onCloseModal
            }}>
                {children}
            </UiContext.Provider>
        )
}