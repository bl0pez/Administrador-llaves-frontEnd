import { useContext, useState } from 'react'
import { TableKeys } from '../components/table/TableKeys';
import { KeyContext } from '../context/KeyContext';
import { KeyItem } from '../components/keys/KeyItem';
import { Key } from '../interfaces/fetchAllKeys';

export const KeysPage = () => {

    const [search, setSearch] = useState<string>('');
    const { keyState } = useContext(KeyContext);
    const { isLoading, error, keys } = keyState;

    const [currentPages, setCurrentPages] = useState(0);

    const filteredKeys = (): Key[] => {
        if (search === '') return keys.slice(currentPages, currentPages + 5);

        const filtered = keys.filter(key => key.name.startsWith(search.toLocaleLowerCase()))
        return filtered.slice(currentPages, currentPages + 5);
    }

    const nextPage = () => {
        if (currentPages + 5 < keys.length)
            return setCurrentPages(currentPages + 5);
    }

    const prevPage = () => {
        if (currentPages > 0)
            return setCurrentPages(currentPages - 5);
    }

    const onSearchChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPages(0);
        setSearch(target.value);
    }

    return (
        <section
            className='text-black flex flex-col gap-5 justify-center items-center mx-auto py-5 container'
        >

            <label htmlFor='search' className='text-2xl'>Buscar llave</label>
            <input
                type="text"
                className='w-3/5 block'
                placeholder='Buscar llave'
                value={search}
                onChange={onSearchChange}
            />

                <TableKeys>
                    {
                        filteredKeys().map(key => (
                            <KeyItem key={key._id} item={key} />
                        ))
                    }
                </TableKeys>

            {/* paginación */}
            <div className='flex gap-5'>
                <button
                    className='bg-indigo-600 py-3 px-5 rounded-md text-white  hover:bg-indigo-700'
                    onClick={prevPage}
                    >
                    <i className='fas fa-arrow-left'></i>
                </button>
                <button
                    className='bg-indigo-600 py-3 px-5 rounded-md text-white hover:bg-indigo-700'
                    onClick={nextPage}
                >
                    <i className='fas fa-arrow-right'></i>
                </button>
            </div>

        </section>
    )
}
