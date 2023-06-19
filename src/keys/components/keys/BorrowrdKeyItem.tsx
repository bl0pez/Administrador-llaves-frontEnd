import { transformDate } from '@/keys/helpers';
import { BorrowedKey } from '@/keys/interfaces';
import Swal from 'sweetalert2';

type Props = {
    items: BorrowedKey[];
    updateStatusBorrowedKey: (id: string) => void;
}

export const BorrowrdKeyItem = ({ items, updateStatusBorrowedKey }: Props) => {

    const onConfirm = async(id: string, name: string) => {
        const { isConfirmed } = await Swal.fire({
            title: `¿Estas seguro de devolver la llave: ${name}?`,
            text: 'No podras revertir esta accion',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, devolver',
            cancelButtonText: 'No, cancelar'
        });

        if(isConfirmed){
            updateStatusBorrowedKey(id);
        }


    }

    return (
        <>
            {
                items.map((item) => (
                    <tr key={item._id}>
                        <td>{item.key.name}</td>
                        <td>{item.operator}</td>
                        <td>{item.requestedBy}</td>
                        <td>{item.service}</td>
                        <td>{transformDate(item.createdAt)}</td>
                        <td>
                            <button
                                onClick={() => onConfirm(item._id, item.key.name)} 
                                className='bg-green-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition duration-300 ease-in-out hover:shadow-lg' >
                        Devolver
                    </button>
                            </td >

                    </tr >
                ))
            }


        </>
    )
}
