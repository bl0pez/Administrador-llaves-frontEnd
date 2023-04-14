import { useState } from 'react';
import { keyApi } from '../../api/keyApi';
import { useKeys } from '../hooks/useKeys';
import Swal from 'sweetalert2';

export const New = () => {

  const { newKey } = useKeys();

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [receivedBy, setReceivedBy] = useState('')
  const [image, setImage] = useState('')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      
      const state = {
        name,
        description,
        receivedBy,
        image
      }

      const resp = await keyApi.post('/keys', state);

      newKey(resp.data.responseItem);

      Swal.fire('Llave creada', 'La llave se creo correctamente', 'success');

    } catch (error) {
      Swal.fire('Error', 'Hubo un error al crear la llave', 'error');
    }
    

  }

  return (
    <section className="text-black flex justify-center items-center h-full">

      
      <form 
      onSubmit={onSubmit}
      className="flex flex-col gap-4 w-1/2 shadow-2xl p-4">
        <label htmlFor="name">Nombre:</label>
        <input 
          type="text" 
          name="name" 
          id="name" 
          value={name}
          onChange={(e) => setName(e.target.value)}  
        />
        <label htmlFor="description">Descripción:</label>
        <input 
          type="text" 
          name="description" 
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)} 
        />
        <label>resepcionada por:</label>
        <input 
          type="text" 
          name="resepcionada por" 
          id="resepcionada por" 
          value={receivedBy}
          onChange={(e) => setReceivedBy(e.target.value)}
          />
        <label>Imagen:</label>
        <input type="file" name="imagen" id="imagen" className="mx-auto" />
        <button className="bg-indigo-600 p-2 rounded-md text-white w-full">Crear</button>
      </form> 


    </section>
  )
}
