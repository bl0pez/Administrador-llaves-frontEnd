import { Spiner, TableKeys } from '../components'
import { useKeyHistoryContext } from '../context';
import { BorrowedKey } from '../interfaces';
import { KeyHistoryItem } from '../components/keys/KeyHistoryItem';
import { usePaginations } from '../hooks/usePaginations';


export const KeyHistory = () => {

    const { keysHistory, isLoading } = useKeyHistoryContext();


    const { filterd, search, handleSearch, Pagination, currentPage, endPage } = usePaginations(keysHistory);
    
    if(isLoading) return (
        <div className='flex justify-center items-center h-screen'>
            <Spiner />
        </div>
    );

    return (
        <section className='text-black flex flex-col gap-5 justify-center items-center mx-auto py-5 container'>

            <h1 className='text-2xl text-center font-bold'>
                Historial de llaves prestadas
            </h1>

            <input
                type="text"
                placeholder="Buscar llave"
                name='search'
                id='search'
                value={search}
                autoComplete='off'
                onChange={handleSearch}
                className='w-3/5 block' />

                <TableKeys
                    words={[
                        'Llave',
                        'Operador',
                        'Servicio',
                        'Solicitado por',
                        'Fecha de prestamo',
                        'Fecha de devolucion'
                    ]}
                    roles={[]}
                >
                {
                    filterd().slice(currentPage, endPage).map((item: BorrowedKey) => (
                        <KeyHistoryItem
                            key={ item._id }
                            _id={ item._id }
                            createdAt={ item.createdAt }
                            operator={ item.operator }
                            requestedBy={ item.requestedBy }
                            service={ item.service }
                            updatedAt={ item.updatedAt }
                            llave={ item.key }   
                        />
                    ))    
                }
                </TableKeys>

                {/* Paginacion  */}
                <Pagination />

        </section>
    )
}