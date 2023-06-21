import { keyApi } from '@/api/keyApi';
import { BorrowedKey, BorrowedKeyForm, BorrowedKeys, ResBorrowedKey } from "../interfaces";
import { useBorrowedKeyContext, useKeyContext, useModalContext } from '../context';
import { useState } from 'react';
import Swal from 'sweetalert2';

// export type Action = {
//     borrowrdKeyState: BorrowrdKeyState;
//     getBorrowedKeys: () => any;
//     createBorrowedKey: (borrowedKey: BorrowedKeyForm) => any;
//     updateStatusBorrowedKey: (id: string) => any;
// }

type FetchAction = {
    isLoading: boolean;
    error: boolean;
    borrowedKeys: BorrowedKey | BorrowedKey[];
    getBorrowedKeys: () => any;
    createBorrowedKey: (borrowedKey: BorrowedKeyForm) => any;
    updateStatusBorrowedKey: (id: string) => any;
}

/**
 * Hook para manejar el estado de las llaves prestadas
 * @returns - borrowedKeys: Llaves prestadas
 * @returns - error: Error al obtener las llaves prestadas
 * @returns - isLoading: Cargando las llaves prestadas
 * @returns - getBorrowedKeys: Obtener las llaves prestadas
 * @returns - createBorrowedKey: Crear una llave prestada
 * @returns - updateStatusBorrowedKey: Actualizar el estado de una llave prestada
 */
export const useBorrowrdKeys = (): FetchAction => {

    const { changeStateKey } = useKeyContext();
    const { loadBorrowedKeys, startLoading, errorBorrowrdKey, newBorrowrdKey, borrowrdKeyState, updateBorrowrdKey } = useBorrowedKeyContext();
    const { borrowedKeys, error, isLoading } = borrowrdKeyState

    //Obtener las llaves prestadas
    const getBorrowedKeys = async () => {
        try {
            const resp = await keyApi.get<BorrowedKeys>('/borrowedKeys');
            loadBorrowedKeys(resp.data.borrowedKeys);
        } catch (error) {
            errorBorrowrdKey();
        }
    }


    const createBorrowedKey = async (borrowedKey: BorrowedKeyForm) => {
        try {
            const { data }= await keyApi.post<ResBorrowedKey>('/borrowedKeys/create', borrowedKey);
            newBorrowrdKey(data.borrowedKey);
            changeStateKey(data.borrowedKey.key._id);
            const msj = data.msg || 'La llave se presto correctamente';
            Swal.fire('Llave prestada', msj, 'success');
        } catch (error: any) {
            errorBorrowrdKey();
            const msj = error.response.data.msg || 'Error al prestar la llave';
            Swal.fire('Error', msj, 'error');
        }
    }

    const updateStatusBorrowedKey = async (id: string) => {
            try {
                const { data }= await keyApi.put<ResBorrowedKey>(`/borrowedKeys/update/${id}`);
                updateBorrowrdKey(data.borrowedKey);
                changeStateKey(data.borrowedKey.key._id);
            } catch (error) {
                errorBorrowrdKey();
            }
    }

    return {
        //States
        borrowedKeys,
        error,
        isLoading,
        //Actions
        getBorrowedKeys,
        createBorrowedKey,
        updateStatusBorrowedKey,
    }




}
