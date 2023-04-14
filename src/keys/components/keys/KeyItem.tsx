import { Key } from "../../interfaces/fetchAllKeys";

interface props {
    item: Key;
}

export const KeyItem = ({ item }: props) => {
    return (
        <tr>
            <td className='border px-4 py-2'>
                <img
                    src='https://picsum.photos/200/300'
                    className='w-14 h-14 object-cover rounded-md'
                    alt='imagen' />
            </td>
            <td className='border px-4 py-2'>{item.name}</td>
            <td className='border px-4 py-2'>{item.description}</td>
            <td className='border px-4 py-2'>{item.receivedBy}</td>
            <td className='border px-4 py-2'>{item.createdAt.slice(0, 10)}</td>
            <td className='border px-4 py-2 text-center'>
                <button className='bg-indigo-600 p-3 rounded-md text-white mr-2 hover:bg-indigo-700'>
                    <i className='fas fa-edit'></i>
                </button>
                <button className='bg-red-600 p-3 rounded-md text-white hover:bg-red-700'>
                    <i className='fas fa-trash'></i>
                </button>
            </td>
        </tr>
    )
}
