import { useState, useEffect } from 'react';
import { transformDate } from '../helpers/transformDate';
import { IKey } from '../interfaces';

//Tipado de paginaciones
interface Paginations {
    search: string;
    currentPage: number;
    endPage: number;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    // filterd: () => any;
    Pagination: () => JSX.Element;
}

//Tipado de llaves
type Keys = IKey[];

//Filtrado de llaves
const keyFiltrado = (items: IKey[], search: String) => {
    return items.filter((item) => 
        item.keyName.toLowerCase().includes(search.toLowerCase())
        || item.keyDescription.toLowerCase().includes(search.toLowerCase())
        || transformDate(item.createdAt).toLowerCase().includes(search.toLowerCase())
        || item.createBy.toLowerCase().includes(search.toLowerCase())
        || transformDate(item.updatedAt).toLowerCase().includes(search.toLowerCase())
    );
}

//Filtrado de llaves prestadas
// const borrowedKeyFiltrado = (items, search: String) => {
//     return items.filter((item) => (
//         item.operator.toLowerCase().includes(search.toLowerCase())
//         || item.key.name.toLowerCase().includes(search.toLowerCase())
//         || transformDate(item.createdAt).toLowerCase().includes(search.toLowerCase())
//         || transformDate(item.updatedAt).toLowerCase().includes(search.toLowerCase())
//         || item.requestedBy.toLowerCase().includes(search.toLowerCase())
//         || item.service.toLowerCase().includes(search.toLowerCase())
//     ));
// }

export const usePaginations = (keys : Keys): Paginations => {

    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [endPage, setEndPage] = useState(10);

    //Captura el valor del input
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    //Filtra los datos
    // const filterd = (): Keys => {

    //     if (search === '') return keys;


    //     if (keys[0].hasOwnProperty('operator')) return borrowedKeyFiltrado(keys as BorrowedKey[], search as string);

    //     return keyFiltrado(keys as Key[], search)

    // }


    // useEffect(() => {
    //     setTotalPages(Math.ceil(filterd().length / 10));
    //     setPage(1);
    // }, [filterd()])

    //Componente que renderiza los botones
    const Pagination = () => {
        return (
            <div className={`
                gap-2 justify-center items-center transition-all duration-500
                ${totalPages === 0 ? 'hidden' : 'flex'}
            `}>
                <button
                    onClick={() => {
                        setPage(page - 1);
                        setCurrentPage(currentPage - 10);
                        setEndPage(endPage - 10);
                    }}
                    disabled={page === 1}
                    className='bg-indigo-600 py-2 px-4 rounded-md text-white  hover:bg-indigo-700'>
                    <i className='fas fa-arrow-left'></i>
                </button>

                <p className='text-lg'>Pagina {page} de {totalPages}</p>


                <button
                    onClick={() => {
                        setPage(page + 1);
                        setCurrentPage(currentPage + 10);
                        setEndPage(endPage + 10);
                    }}
                    disabled={page === totalPages}
                    className='bg-indigo-600 py-2 px-4 rounded-md text-white  hover:bg-indigo-700'>
                    <i className='fas fa-arrow-right'></i>
                </button>
            </div>
        )

    }

    return {
        //Estado
        search,
        currentPage,
        endPage,

        //Funciones
        handleSearch,
        // filterd,

        //Componente
        Pagination,
    }



}
