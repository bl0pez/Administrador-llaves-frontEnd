import { useState, useEffect } from 'react';
import { transformDate } from '../helpers/transformDate';
import { IKey } from '../interfaces';
import { useKeyContext } from '../context/KeyContext';

//Tipado de paginaciones
interface Paginations {
    countItems: number;
    page: number;
    rowsPerPage: number;
    search: string;
    filterd: () => IKey[];
    handleChangePage: (e: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    handleChangeRowsPerPage: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const usePaginations = (): Paginations => {

    const { stateKeys } = useKeyContext();
    const { keys, count } = stateKeys;
    
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [countItems, setCountItems] = useState(count);

    useEffect(() => {
        setCountItems(count);
    }, [count]);
    
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
      ) => {
        setPage(newPage);
      };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    const filterd = (): IKey[] => {
        if (search.length === 0) return keys.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        const items = keys.filter((item) => 
        item.keyName.toLowerCase().includes(search.toLowerCase())
        || item.keyDescription.toLowerCase().includes(search.toLowerCase())
        || item.createBy.toLowerCase().includes(search.toLowerCase())
        || item.deliveredBy.toLowerCase().includes(search.toLowerCase())
        || transformDate(item.createdAt).toLowerCase().includes(search.toLowerCase())
        || item.createBy.toLowerCase().includes(search.toLowerCase())
        || transformDate(item.updatedAt).toLowerCase().includes(search.toLowerCase())
        );

        return items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    }

    useEffect(() => {
        setCountItems(filterd().length);
    }, [search]);
    


    return {
        //Estado
        search,
        countItems,
        page,

        //Funciones
        handleSearch,
        handleChangeRowsPerPage,
        handleChangePage,
        // filterd,
        filterd,
        rowsPerPage,
    }



}
