import { useReducer } from 'react';
import { keyApi } from '@/api/keyApi';
import { BorrowedKey, BorrowedKeyForm, BorrowedKeys, BorrowrdKeyState, ResBorrowedKey } from "../interfaces";
import { BorrowrdKeyReducer } from "../reducers/BorrowrdKeyReducer";
import Swal from 'sweetalert2';
import { useKeyContext, useModalContext } from '../context';


const INITIAL_STATE: BorrowrdKeyState = {
    borrowedKeys: [],
    isLoading: true,
    error: false,
}

export type Action = {
    borrowrdKeyState: BorrowrdKeyState;
    getBorrowedKeys: () => any;
    createBorrowedKey: (borrowedKey: BorrowedKeyForm) => any;
    updateStatusBorrowedKey: (id: string) => any;
}

export const useBorrowrdKeys = (): Action => {

    const [borrowrdKeyState, dispatch] = useReducer(BorrowrdKeyReducer, INITIAL_STATE);
    const { changeStateKey } = useKeyContext();
    const { setIsCloseModal } = useModalContext();

    //Obtener las llaves prestadas
    const getBorrowedKeys = async () => {
        try {
            const resp = await keyApi.get<BorrowedKeys>('/borrowedKeys');
            dispatch({ type: 'loadBorrowrdKeys', payload: resp.data.borrowedKeys });
        } catch (error) {
            dispatch({ type: 'loadBorrowrdKeys', payload: [] });
        }
    }

    const createBorrowedKey = async (borrowedKey: BorrowedKeyForm) => {
        try {
            const { data }= await keyApi.post<ResBorrowedKey>('/borrowedKeys/create', borrowedKey);
            dispatch({ type: 'addBorrowrdKey', payload: data.borrowedKey });
            changeStateKey(data.borrowedKey.key._id)
            const msj = data.msg || 'Llaves prestadas creadas correctamente';
            setIsCloseModal();
            Swal.fire('Correcto', msj, 'success');
        } catch (error: any) {
            const msj = error?.response.data.msg || 'Error al crear las llaves prestadas';
            Swal.fire('Error', msj, 'error');
        }
    }

    const updateStatusBorrowedKey = async (id: string) => {
        try {
            const { data }= await keyApi.put<ResBorrowedKey>(`/borrowedKeys/update/${id}`);
            dispatch({ type: 'updateStateBorrowedKey', payload: data.borrowedKey });
            changeStateKey(data.borrowedKey.key._id)
            const msj = data.msg || 'Llaves devueltas correctamente';
            Swal.fire('Correcto', msj, 'success');
        } catch (error: any) {
            const msj = error?.response.data.msg || 'Error al devolver las llaves';
            Swal.fire('Error', msj, 'error');
        }
    }

    return {
        //state
        borrowrdKeyState,

        //dispatch
        getBorrowedKeys,
        createBorrowedKey,
        updateStatusBorrowedKey,
    }




}
