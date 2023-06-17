import React from 'react'

export const LoadKeys = () => {
  return (
    <section
      className='text-black flex flex-col gap-5 justify-center items-center mx-auto py-5 container'
    >

      <table className='w-full overflow-x-auto'>
        <thead className=''>
          <tr>
            <th>Imagen</th>
            <th>Llave</th>
            <th>Emprestada por</th>
            <th>Solicitada por</th>
            <th>Fecha de solicitud</th>
            <th>Acciones</th>
          </tr>
        </thead>


      </table>


    </section>
  )
}
