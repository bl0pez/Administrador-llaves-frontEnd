interface Props {
    children: JSX.Element | JSX.Element[];
}

export const TableKeys = ({ children }:Props) => {
  return (
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
        {children}
    </tbody>
  </table>
  )
}
