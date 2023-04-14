import { useState } from "react";
import { ModalContext } from "./ModalContext";
import { ModalState } from "../../../interfaces/interfaces";


const INITIAL_STATE:ModalState = {
    showModal: false,
}

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const ModalProvider = ({ children }: Props) => {
    
        const [showModal, setShowModal] = useState<boolean>(INITIAL_STATE.showModal);
    
        return (
            <ModalContext.Provider value={{
                showModal,
                setShowModal
            }}>
                {children}
            </ModalContext.Provider>
        )
};