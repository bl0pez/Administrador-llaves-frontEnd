import { useEffect, useState } from 'react';
import { transformDate } from '../helpers/transformDate';
import { string } from 'yup';

export const usePaginations = <T extends {}>(data: T[]) => {

  const [search, setSearch] = useState<string>('');
  const [items, setItems] = useState<T[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(0);
  const [countItems, setCountItems] = useState<number>(0);

  useEffect(() => {
    setItems(data);
    setPage(0);
  }, [data])
  
  
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }

  const itemsFiltered = () => {
    if (search === '') return items;

    const searchLowerCase = search.toLowerCase();

    

  }

  const ItemsSliced = () => {
    return itemsFiltered().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  }

  useEffect(() => {
    setCountItems(itemsFiltered().length);
  }, [items, search])
  

  return {
    handleChangeInput,
    search,
    rowsPerPage,
    countItems,
    page,
    handleChangeRowsPerPage,
    ItemsSliced,
    handleChangePage,
  }

};