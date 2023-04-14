import { useEffect, useState } from "react";
import { useKeys } from "../hooks/useKeys"
import { KeyItem } from "./KeyItem";
export const Keys = () => {

  const { keys, isLoading, error, filterKeys, keysFiltered } = useKeys();
  const [search, setSearch] = useState('');

    //Creamos paginacion para las keys , 5 item por pagina, con tailwind

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const totalItems = keysFiltered.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    
    



    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;


    const currentItems = keysFiltered.slice(indexOfFirstItem, indexOfLastItem);
    

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(currentPage + 1);
    const prevPage = () => setCurrentPage(currentPage - 1);

  useEffect(() => {
    filterKeys(search);
  }, [search, keys])

  return (
    <section
      className='text-black flex flex-col gap-5 justify-center items-center h-full bg-slate-200'
    >

      {/* buscador */}

      <label htmlFor='search' className='text-2xl'>Buscar llave</label>
      <input
        type="text"
        className='w-3/5 block'
        placeholder='Buscar llave'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />



      {/* diseñame una tabla con tailwinds para las llaves */}
      <table className='table-auto bg-white text-xl'>
        <thead className='bg-indigo-600 text-white'>
          <tr>
            <th className='px-4 py-2'>Imagen</th>
            <th className='px-4 py-2'>Llave</th>
            <th className='px-4 py-2'>Descripción</th>
            <th className='px-4 py-2'>Resepcionada por</th>
            <th className='px-4 py-2'>Fecha de resepcion</th>
            <th className='px-4 py-2'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            currentItems.map(key => (
              <KeyItem key={key._id} item={key} />
            ))
          }
          {/* {
            keysFiltered.map(item => ((
              <KeyItem key={item._id} item={item} />
            )))
          }

          {
            keysFiltered.length === 0 && (
              <tr>
                <td className='border px-4 py-2 text-center' colSpan={6}>No hay llaves</td>
              </tr>
            )
          } */}
        </tbody>
      </table>

      {/* paginacion anterior , total pagonas , siquiente */}
      <div className='flex justify-center'>
        {
        
        }

      </div>
      



    </section>
  )
}
