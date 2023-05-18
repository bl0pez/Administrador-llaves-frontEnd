import { useContext, useState } from 'react'

import { UiContext, KeyContext } from '../context';
import { TableKeys } from '../components/table/TableKeys';
import { KeyItem } from '../components/keys/KeyItem';
import { CreateKeyModal } from '../components/keys/CreateKeyModal';
import { usePagination } from '../hooks/usePagination';
import { Pagination } from '../components/pagination/Pagination';
import { ModalContext } from '../../context';

export const KeysPage = () => {

    const { keyState } = useContext(KeyContext);
    const { isLoading, error, keys } = keyState;

    const { filteredKeys, nextPage, prevPage, onSearchChange, search } = usePagination(keys);

    // modal
    const { isOpenModal, onCloseModal, onOpenModal } = useContext(UiContext);
    const {setIsOpenModal} = useContext(ModalContext)
    const [isOpen, setIsOpen] = useState<boolean>(false);

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
                <button
                    className='absolute bottom-5 right-5 bg-indigo-600 text-4xl w-16 h-16 rounded-full text-white hover:bg-indigo-700'
                    onClick={setIsOpenModal}
                >
                    <i className='fas fa-plus'></i>
                </button>


            </section>

            <CreateKeyModal />
        </>
    )
}
