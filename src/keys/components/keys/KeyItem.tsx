import Swal from 'sweetalert2';

import { keyApi } from '../../../api/keyApi';
import { useKeyContext } from '../../context/KeyContext';
import { Key } from '../../interfaces/interfaces';
import { useAuth } from '../../../auth/context/AuthContext';
import { useModalContext } from '../../context';

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
                console.log(resp.data);
                Swal.fire('Eliminado', resp.data.msg, 'success');
                deleteKey(id);
            }


        } catch (error) {
            Swal.fire('Error', 'Error al eliminar la llave', 'error');
        }
    }

    return (
        <tr>
            <td className='border px-4 py-2'>
                <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${item.image}`}
                    className='w-14 h-14 object-cover rounded-md'
                    alt='imagen' />
            </td>
            <td className='border px-4 py-2'>{item.name}</td>
            <td className='border px-4 py-2'>{item.description}</td>
            <td className='border px-4 py-2'>{item.user?.name}</td>
            <td className='border px-4 py-2'>{item.createdAt.slice(0, 10)}</td>
            {
                authstate.role === 'ADMIN_ROLE' &&
                (<td className='border px-4 py-2 text-center'>
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
                </td>)
            }
        </tr>
    )
}
