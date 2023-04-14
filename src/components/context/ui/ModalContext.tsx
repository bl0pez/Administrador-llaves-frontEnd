import { createContext } from "react";

export type ModalContextType = {
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
}

export const ModalContext = createContext<ModalContextType>({} as ModalContextType);