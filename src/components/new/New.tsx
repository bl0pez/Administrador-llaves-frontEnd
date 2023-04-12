import { useState } from 'react';
import { keyApi } from '../../api/keyApi';
import { Key, Keys } from '../../interfaces/Key.inteface';

export const New = () => {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [receivedBy, setReceivedBy] = useState('')
  const [image, setImage] = useState('')

  const [keys, setKeys] = useState<Keys[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      
      const newKey = {
        name,
        description,
        receivedBy,
        image
      }

      const resp = await keyApi.post('/key', newKey)
      console.log(resp.data)

      setKeys([...keys, resp.data]);

      window.alert('Llave creada con éxito');

    } catch (error) {
      
      window.alert('Error al crear la llave');

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
