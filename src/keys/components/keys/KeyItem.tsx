import Swal from 'sweetalert2';

import { keyApi } from '@/api/keyApi';
import { Key } from '@/keys/interfaces';
import { useAuth } from '@/auth/context';
import { useKeyContext, useModalContext } from '@/keys/context';
import { transformDate } from '@/keys/helpers';
import { IsAdmin } from '../isAdmin/IsAdmin';

interface props {
    item: Key;
}

export const KeyItem = ({ item }: props) => {

    const { deleteKey, onSelectKey } = useKeyContext();
    const { authstate } = useAuth();
    const { setIsOpenModal } = useModalContext();

    /**
     * Selecciona la llave y 
     * abre el modal para editar la llave
     */
    const updateKey = () => {
        onSelectKey(item);
        setIsOpenModal();
    }

    /**
     * Perminte eliminar una llave
     * @param id id de la llave a eliminar
     */
    const removeKey = async (id: string) => {
        try {

            //Preguntamos con swal si esta seguro de eliminar la llave
            const { isConfirmed } = await Swal.fire({
                title: '¿Estas seguro?',
                text: 'No podras revertir esta accion',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'No, cancelar'
            });

            if (isConfirmed) {
                const resp = await keyApi.delete(`/keys/${id}`);
                deleteKey(id);
                Swal.fire('Eliminado', resp.data.msg, 'success');
            }


        } catch (error: any) {
            const msg = error.response.data.msg || 'Error al eliminar la llave';
            Swal.fire('Error', msg, 'error');
        }
    }

    return (
        <tr>
            <td>
                <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${item.image}`}
                    className='w-12 h-12 object-cover rounded-md block'
                    alt='imagen' />
            </td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.user?.name}</td>
            <td>{transformDate(item.createdAt)}</td>
            <td>
                {
                    item.status
                        ? <span className='bg-green-500 text-white py-1 px-2 rounded-md'>Prestada</span>
                        : <span className='bg-red-500 text-white py-1 px-2 rounded-md'>No prestada</span>
                }
            </td>
            {
                <IsAdmin
                    roles={['ADMIN_ROLE']}
                >
                    <td>
                        {/* Boton para editar llave */}
                        <button
                            className='bg-indigo-600 p-3 rounded-md text-white mr-2 hover:bg-indigo-700'
                            onClick={() => updateKey()}
                        >
                            <i className='fas fa-edit'></i>
                        </button>
                        {/* Boton para elminar llave */}
                        <button
                            onClick={() => removeKey(item._id)}
                            className='bg-red-600 p-3 rounded-md text-white hover:bg-red-700'>
                            <i className='fas fa-trash'></i>
                        </button>
                    </td>
                </IsAdmin>
            }
        </tr>
    )
}
