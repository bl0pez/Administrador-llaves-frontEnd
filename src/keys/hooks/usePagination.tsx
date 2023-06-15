import { useState } from 'react';
import { Key } from '../interfaces';

type PaginationHook = {
    filteredKeys: () => Key[];
    nextPage: () => void;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    prevPage: () => void;
    search: string;
}

export const usePagination = (keys:Key[]): PaginationHook => {
    const [search, setSearch] = useState<string>('');
    const [currentPages, setCurrentPages] = useState(0);
  

    const filteredKeys = (): Key[] => {
        if (search === '') return keys.slice(currentPages, currentPages + 5);
        
        const filtered = keys.filter(key => 
            key.name.toLowerCase().includes(search.toLowerCase()) ||
            key.description.toLowerCase().includes(search.toLowerCase()) ||
            key.user?.name.toLowerCase().includes(search.toLowerCase()) ||
            key.description.toLowerCase().includes(search.toLowerCase()) ||
            key.createdAt.toLowerCase().includes(search.toLowerCase())
            )
        
        
        return filtered.slice(currentPages, currentPages + 5);
    }

    const nextPage = () => {
        if (currentPages + 5 < keys.length)
            return setCurrentPages(currentPages + 5);
    }

    const prevPage = () => {
        if (currentPages > 0)
            return setCurrentPages(currentPages - 5);
    }

    const onSearchChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPages(0);
        setSearch(target.value);
    }

    return {
        search,
        filteredKeys,
        nextPage,
        prevPage,
        onSearchChange
    }

}
