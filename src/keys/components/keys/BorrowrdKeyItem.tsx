import { transformDate } from '@/keys/helpers';
import { onConfirm } from '@/keys/helpers/onConfirm';
import { useBorrowrdKeys } from '@/keys/hooks';
import { IsAdmin } from '../isAdmin/IsAdmin';
import { BorrowedKey } from '@/keys/interfaces';

export const BorrowrdKeyItem = () => {
    const { updateStatusBorrowedKey, borrowedKeys } = useBorrowrdKeys();

    return (
        <>
            {
                borrowedKeys.map((item: BorrowedKey) => (
                    <tr key={item._id}>
                        <td>{item.key.name}</td>
                        <td>{item.operator}</td>
                        <td>{item.requestedBy}</td>
                        <td>{item.service}</td>
                        <td>{transformDate(item.createdAt)}</td>
                        <IsAdmin
                            roles={['ADMIN_ROLE', 'OPERATOR_ROLE']}
                        >
                            <td>
                                <button
                                    onClick={() => onConfirm(item._id, item.key.name, updateStatusBorrowedKey)}
                                    className='bg-green-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition duration-300 ease-in-out hover:shadow-lg' >
                                    Devolver

                                </button>
                            </td >
                        </IsAdmin>

                    </tr >
                ))
            }


        </>
    )
}
