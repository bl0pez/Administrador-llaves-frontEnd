import { useEffect, useState } from "react";
import { useKeys } from "../hooks/useKeys"
import { KeyItem } from "./KeyItem";

export const Keys = () => {

  const { keys, isLoading, error, filterKeys, keysFiltered } = useKeys();
  const [search, setSearch] = useState('')

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
          {/* <td className='border px-4 py-2'>
              <img 
                src='https://picsum.photos/200/300' 
                className='w-14 h-14 object-cover rounded-md' 
                alt='imagen' />
            </td> */}
          {/* <td className='border px-4 py-2'>Llave 1</td>
            <td className='border px-4 py-2'>Llave de la puerta de la casa</td>
            <td className='border px-4 py-2'>Juan</td>
            <td className='border px-4 py-2'>04/04/2021</td>
            <td className='border px-4 py-2 text-center'>
              <button className='bg-indigo-600 p-3 rounded-md text-white mr-2 hover:bg-indigo-700'>
                <i className='fas fa-edit'></i>
              </button>
              <button className='bg-red-600 p-3 rounded-md text-white hover:bg-red-700'>
                <i className='fas fa-trash'></i>
              </button>
            

            </td> */}
          {
            keysFiltered.map(item => ((
              <KeyItem key={item._id} item={item} />
            )))
          }
        </tbody>
      </table>

      {/* paginacion */}
      <div className='flex justify-center items-center mt-4'>
        <button className='bg-indigo-600 p-2 rounded-md text-white mr-2'>
          <i className='fas fa-angle-double-left'></i>
        </button>
        <button className='bg-indigo-600 p-2 rounded-md text-white mr-2'>
          <i className='fas fa-angle-left'></i>
        </button>
        <button className='bg-indigo-600 p-2 rounded-md text-white mr-2'>
          <i className='fas fa-angle-right'></i>
        </button>
        <button className='bg-indigo-600 p-2 rounded-md text-white mr-2'>
          <i className='fas fa-angle-double-right'></i>
        </button>
      </div>


    </section>
  )
}
