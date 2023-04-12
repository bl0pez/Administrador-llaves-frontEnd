import { createContext } from 'react';
import { KeyState } from '../../interfaces/interfaces';

//Especificamos la informacion que va a tener el contexto
// los type no se pueden extender como las interfaces
export type KeyContextProps = {
    keyState : KeyState,
    filterKeys: (name: string) => void,
}

//Creamos el contexto
export const KeyContext = createContext<KeyContextProps>({} as KeyContextProps);
