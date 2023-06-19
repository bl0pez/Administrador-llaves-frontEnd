import { transformDate } from '@/keys/helpers';
import { BorrowedKey } from '@/keys/interfaces';

export const BorrowrdKeyItem = ({ items }: { items: BorrowedKey[] }) => {
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
                            <button className='bg-green-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition duration-300 ease-in-out hover:shadow-lg' >
                        Devolver
                    </button>
                            </td >

                    </tr >
                ))
            }


        </>
    )
}
