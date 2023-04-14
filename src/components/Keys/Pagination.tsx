import React from 'react'
import { Key } from '../../interfaces/interfaces';
import { KeyItem } from './KeyItem';

interface Props {
    keys: Key[];
}

//Creacion de paginacion
export const Pagination = ({ keys }: Props) => {

    //Creamos paginacion para las keys , 5 item por pagina, con tailwind

    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPage] = React.useState(5);

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;


    const currentItems = keys.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(currentPage + 1);
    const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <>
        {
            currentItems.map(key => (
                <KeyItem key={key._id} item={key} />
            ))
        }
    
        <div className='flex justify-center'>
            <button
                className='bg-indigo-600 text-white px-4 py-2 rounded-md'
                onClick={() => prevPage()}
            >Anterior</button>
            <button
                className='bg-indigo-600 text-white px-4 py-2 rounded-md'
                onClick={() => nextPage()}
            >Siguiente</button>
        </div>

    </>
  )
}
