import { Spiner, TableKeys } from '../components'
import { useKeyHistoryContext } from '../context';
import { transformDate } from '../helpers';
import { useEffect, useState } from 'react';
import { BorrowedKey } from '../interfaces';


export const KeyHistory = () => {

    const { keysHistory, isLoading, count } = useKeyHistoryContext();
    const [search, setSearch] = useState('');


    const filterKeysHistory = (): BorrowedKey[] => {



        if (search === '') return keysHistory.slice(0, 10);

        return keysHistory.filter((key) => (
            key.key.name.toLowerCase().includes(search.toLowerCase()) ||
            key.operator.toLowerCase().includes(search.toLowerCase()) ||
            key.requestedBy.toLowerCase().includes(search.toLowerCase()) ||
            key.service.toLowerCase().includes(search.toLowerCase()) ||
            transformDate(key.createdAt).includes(search.toLowerCase()) ||
            transformDate(key.updatedAt).includes(search.toLowerCase())
        ));

    }


    return (
        <section className='text-black flex flex-col gap-5 justify-center items-center mx-auto py-5 container'>

            <label htmlFor='search' className='text-2xl'>Buscar llave</label>
            <input
                type="text"
                placeholder="Buscar llave"
                name='search'
                id='search'
                value={search}
                autoComplete='off'
                onChange={({ target }) => setSearch(target.value)}
                className='w-3/5 block' />

            {
                isLoading
                    ? <Spiner />
                    : (<TableKeys
                        words={[
                            'Nombre Llave',
                            'Operador',
                            'Solicitado por',
                            'Servicio / Empresa',
                            'Fecha de prestamo',
                            'Fecha de devolución',
                        ]}

                    >
                        {
                            filterKeysHistory().map(({ _id, createdAt, updatedAt, service, key, operator, requestedBy }) => (
                                <tr key={_id}>
                                    <td>
                                        {key.name}
                                    </td>
                                    <td>
                                        {operator}
                                    </td>
                                    <td>
                                        {requestedBy}
                                    </td>
                                    <td>
                                        {service}
                                    </td>
                                    <td>
                                        {
                                            transformDate(createdAt)
                                        }
                                    </td>
                                    <td>
                                        {
                                            transformDate(updatedAt)
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </TableKeys>)
            }

        </section>
    )
}
