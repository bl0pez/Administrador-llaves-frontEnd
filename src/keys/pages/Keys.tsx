import { useKeyContext, useModalContext } from '../context';
import { usePagination } from '../hooks/usePagination';
import { CreateKeyModal, IsAdmin, KeyItem, Pagination, Spiner, TableKeys } from '../components';

export const Keys = () => {

    const { keyState } = useKeyContext();
    const { isLoading, keys } = keyState;

    const { filteredKeys, nextPage, prevPage, onSearchChange, search } = usePagination(keys);

    // modal
    const { setIsOpenModal } = useModalContext();

    if(!isLoading) return (
        <div className='flex h-screen justify-center'>
            <Spiner />
        </div>
    )

    return (
        <>
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
                            <KeyItem
                                key={key._id}
                                item={key}
                            />
                        ))
                    }
                </TableKeys>

                {/* paginación */}
                <Pagination
                    nextPage={nextPage}
                    prevPage={prevPage}
                />

                {/* Boton para crear nueva llave */}
                <IsAdmin>
                    <button
                        className='absolute bottom-5 right-5 bg-indigo-600 text-4xl w-16 h-16 rounded-full text-white hover:bg-indigo-700'
                        onClick={setIsOpenModal}
                    >
                        <i className='fas fa-plus'></i>
                    </button>
                </IsAdmin>


            </section>

            <CreateKeyModal />
        </>
    )
}
