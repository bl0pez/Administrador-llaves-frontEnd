import React, { createContext, useContext, useState, useMemo } from 'react';

export type ModalContextProps = {
    stateModal: boolean;
    setIsOpenModal: () => void;
    setIsCloseModal: () => void;
}

export const ModalContext = createContext({} as ModalContextProps);


interface Props {
    children: JSX.Element | JSX.Element[];
}

export const ModalProvider = ({ children }: Props) => {

    
    const [stateModal, setStateModal] = useState<boolean>(false);
    
    console.count('LoadKeys');

        const setIsCloseModal = () => {
            setStateModal(false);
        }

        const setIsOpenModal = () => {
            setStateModal(true);
        }

    
        return (
            <ModalContext.Provider value={{
                stateModal,
                setIsOpenModal,
                setIsCloseModal
            }}>
                {children}
            </ModalContext.Provider>
        )


};

/**
 * Hook para acceder al context de ModalContext
 * @returns {ModalContextProps} ModalContextProps
 */
export const useModalContext = ():ModalContextProps  => useContext(ModalContext);