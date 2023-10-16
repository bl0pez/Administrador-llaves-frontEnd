import { useKeyContext } from '../context';
import { usePaginations } from '../hooks/usePaginations';
import { Key } from '../interfaces';
import { Box, Button, TableBody, TablePagination, TextField } from '@mui/material';
import { useState } from 'react';
import { ImageModal } from '../components/modal/ImageModal';
import { KeyTableRowItem, StickyTableContainer } from '../components/table';
import { TableHeaderRow } from '../components/table/TableHeaderRow';

import SearchIcon from '@mui/icons-material/Search';
import { ButtonCreateKey } from '../components/html';
import { Spiner } from '../components';

const columns = ['Imagen', 'Llave', 'Descripción', 'Fecha de Creación', 'Estado', 'Acciones'];

const rows: Key[] = [
    { _id: '1', createdAt: new Date(), description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis dicta voluptatem tempore eius at. Dolorem tenetur nihil provident iusto itaque?', image: 'http://localhost:5173/llaves.jpeg', name: 'llave 1', status: false, updatedAt: new Date() },
    { _id: '2', createdAt: new Date(), description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis dicta voluptatem tempore eius at. Dolorem tenetur nihil provident iusto itaque?', image: 'http://localhost:5173/llaves.jpeg', name: 'llave 1', status: true, updatedAt: new Date() },
    { _id: '3', createdAt: new Date(), description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis dicta voluptatem tempore eius at. Dolorem tenetur nihil provident iusto itaque?', image: 'http://localhost:5173/llaves.jpeg', name: 'llave 1', status: false, updatedAt: new Date() },
    { _id: '4', createdAt: new Date(), description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis dicta voluptatem tempore eius at. Dolorem tenetur nihil provident iusto itaque?', image: 'http://localhost:5173/llaves.jpeg', name: 'llave 1', status: false, updatedAt: new Date() },
    { _id: '5', createdAt: new Date(), description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis dicta voluptatem tempore eius at. Dolorem tenetur nihil provident iusto itaque?', image: 'http://localhost:5173/llaves.jpeg', name: 'llave 1', status: true, updatedAt: new Date() },
    { _id: '6', createdAt: new Date(), description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis dicta voluptatem tempore eius at. Dolorem tenetur nihil provident iusto itaque?', image: 'http://localhost:5173/llaves.jpeg', name: 'llave 1', status: false, updatedAt: new Date() },
    { _id: '7', createdAt: new Date(), description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis dicta voluptatem tempore eius at. Dolorem tenetur nihil provident iusto itaque?', image: 'http://localhost:5173/llaves.jpeg', name: 'llave 1', status: true, updatedAt: new Date() },
    { _id: '8', createdAt: new Date(), description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis dicta voluptatem tempore eius at. Dolorem tenetur nihil provident iusto itaque?', image: 'http://localhost:5173/llaves.jpeg', name: 'llave 1', status: false, updatedAt: new Date() },
    { _id: '9', createdAt: new Date(), description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis dicta voluptatem tempore eius at. Dolorem tenetur nihil provident iusto itaque?', image: 'http://localhost:5173/llaves.jpeg', name: 'llave 1', status: false, updatedAt: new Date() },
]

const Keys = () => {

    const { keyState } = useKeyContext();
    const { isLoading, keys } = keyState;

    const [ modalOpen, setModalOpen ] = useState<boolean>(false);
    const [ url, setUrl ] = useState<string>('');
    
    const handleOpenModal = (url: string) => {
        setModalOpen(true);
        setUrl(url);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const { filterd, search, handleSearch, Pagination, currentPage, endPage } = usePaginations(keys);

    // if (!isLoading) return (
    //     <div className='flex h-screen justify-center'>
    //         <Spiner />
    //     </div>
    // )

    return (
        <>

            <Box
                display={'flex'}
                justifyContent={'space-between'}
                flexWrap={'wrap'}
                gap={2}
                alignItems={'end'}
            >
                <Box
                    display={'flex'}
                    alignItems={'end'}
                    width={'400px'}
                    gap={2}
                >
                    <TextField 
                        sx={{
                            width: '100%',
                        }}
                        id="search"
                        type="text"
                        name='search' 
                        label="Buscar llave" 
                        autoComplete='off'
                        variant="standard" />
                    <Button
                        variant='outlined'
                        color='primary'
                    >
                        <SearchIcon />
                    </Button>
                </Box>
                
                <ButtonCreateKey />
          
            </Box>

            <StickyTableContainer>
                <TableHeaderRow 
                    columns={columns}
                />
                    <TableBody>
                        {
                            rows.map((key: Key) => (
                                <KeyTableRowItem
                                    key={key._id}
                                    item={key}
                                    handleOpenModal={handleOpenModal}
                                />
                           ))
                        }
                    </TableBody>
        </StickyTableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={5}
                page={0}
                onPageChange={() => {}}
            />
            {/* <section
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


            </section> */}
            <ImageModal 
                url={url}
                isOpen={modalOpen}
                handleClose={closeModal}
            /> 
        </>
    )
}

export default Keys;
