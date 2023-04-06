export const New = () => {
  return (
    <section className="text-black flex justify-center items-center h-full">

      
      <form className="flex flex-col gap-4 w-1/2 shadow-2xl p-4">
        <label htmlFor="name">Nombre:</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="description">Descripción:</label>
        <input type="text" name="description" id="description" />
        <label>resepcionada por:</label>
        <input type="text" name="resepcionada por" id="resepcionada por" />
        <label>Imagen:</label>
        <input type="file" name="imagen" id="imagen" className="mx-auto" />
        <button className="bg-indigo-600 p-2 rounded-md text-white w-full">Crear</button>
      </form> 


    </section>
  )
}
