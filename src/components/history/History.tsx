export const History = () => {
  return (
    <section className='text-black flex flex-col gap-5 p-14 h-full bg-slate-200'>

      <form className='flex gap-4 flex-col shadow-2xl p-4 bg-white'>

        {/* Para agregar un nuevo registro, ingrese la fecha, nombre del encargado, llave, servicio, entregada por y status. */}
        
        <div className='flex gap-4 justify-between'>
          <div className="flex flex-col">
          <label htmlFor="nombre">Nombre: </label>
          <input type="text" placeholder="Ingre nombre" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="servicio/empresa">Servicio/Empresa: </label>
            <input type="text" placeholder="Ingre servicio" />
          </div>
          <div className="flex flex-col w-full">
          <label htmlFor="llave">Llave: </label>
          <select name="llave" id="llave" className="outline-none p-2 rounded-md border-2 border-gray-300">
            <option value="llave1">Llave 1</option>
            <option value="llave2">Llave 2</option>
            <option value="llave3">Llave 3</option>
          </select>
          </div>
      
          <div className="flex flex-col w-full">
          <label htmlFor="operador">Operador: </label>
          <select name="operador" id="operador" className="outline-none p-2 rounded-md border-2 border-gray-300">
            <option value="operador1">Operador 1</option>
            <option value="operador2">Operador 2</option>
            <option value="operador3">Operador 3</option>
          </select>
          </div>


        </div>
          <button className='bg-indigo-600 text-white p-2 rounded-md w-1/2 m-auto'>Agregar</button>

      </form>

      <table className='table-auto bg-white text-xl'>

        <thead className='bg-indigo-600 text-white'>

          <tr>
            <th className='px-4 py-2'>Fecha</th>
            <th className='px-4 py-2'>Nombre</th>
            <th className='px-4 py-2'>Llave que retira</th>
            <th className='px-4 py-2'>Servicio</th>
            <th className='px-4 py-2'>Operador</th>
            <th className='px-4 py-2'>Status</th>
            </tr>
        </thead>
        <tbody>
          <tr>
            <td className='border px-4 py-2'>04/04/2021</td>
            <td className='border px-4 py-2'>Juan</td>
            <td className='border px-4 py-2'>Llave 1</td>
            <td className='border px-4 py-2'>Medicina</td>
            <td className='border px-4 py-2'>Jose</td>
            <td className='border px-4 py-2'>Devuelta</td>
          </tr>
          </tbody>

      </table>

    </section>
  )
}
