import { useKeyContext, useModalContext } from '../context';
import { ButtonOpenModal, CreateKeyModal, IsAdmin, KeyItem, Spiner, TableKeys } from '../components';
import { usePaginations } from '../hooks/usePaginations';
import { Key } from '../interfaces';

export const Keys = () => {

    const { keyState } = useKeyContext();
    const { isLoading, keys } = keyState;

    const { filterd, search, handleSearch, Pagination, currentPage, endPage } = usePaginations(keys);

    if (!isLoading) return (
        <div className='flex h-screen justify-center'>
            <Spiner />
        </div>
    )

    return (
        <>
            <section
                className='text-black flex flex-col gap-5 justify-center items-center mx-auto py-5 container'
            >

                <h1 className='text-2xl text-center font-bold'>
                    Llaves
                </h1>
                <input
                    id='search'
                    type="text"
                    className='w-3/5 block'
                    placeholder='Buscar llave'
                    autoComplete='off'
                    value={search}
                    onChange={handleSearch}
                />

                <TableKeys
                    words={[
                        'Imagen',
                        'Llaves',
                        'Descripción',
                        'Resepcionado por',
                        'Fecha de resepcion',
                        'Estado',
                    ]}
                    wordsAdmin={[
                        'Acciones'
                    ]}
                    roles={['ADMIN_ROLE']}
                >
                    {
                        filterd().slice(currentPage, endPage).map((key: Key) => (
                                <KeyItem
                                    key={key._id}
                                    item={key}
                                />
                        ))
                    }
                </TableKeys>


                <Pagination />

                <IsAdmin
                    roles={['ADMIN_ROLE']}
                >
                    <ButtonOpenModal
                        text='Crear llave'
                    />
                    <CreateKeyModal />
                </IsAdmin>


            </section>

        </>
    )
}
