import { useState } from 'react';
import Swal from 'sweetalert2';


import { keyApi } from '../../api/keyApi';
import { useKeys } from '../hooks/useKeys';

export const CreateKeyPage = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [receivedBy, setReceivedBy] = useState('');
    const [image, setImage] = useState('');

    const { createKey } = useKeys();

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
            
            console.log(resp);
            

            createKey(resp.data.responseItem);


        } catch (error) {
            
        }


    }

    return (
        <section className="text-black mx-auto flex justify-center items-center h-screen container">



            <form
                onSubmit={onSubmit}
                className="flex flex-col gap-4 shadow-2xl p-4 w-full lg:w-1/2 border-t-4 border-indigo-600">
                <h1 className="text-4xl font-bold text-center">Crear llave</h1>
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
