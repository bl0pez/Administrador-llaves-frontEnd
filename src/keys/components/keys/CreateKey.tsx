import React, { useContext, useState } from 'react'
import Dropzone from 'react-dropzone';
import Swal from 'sweetalert2';
import { FetchPostCreateKey } from '../../interfaces/fetchAllKeys';
import { keyApi } from '../../../api/keyApi';
import { KeyContext } from '../../context/KeyContext';

export const CreateKey = () => {

    
    const { keyState, createKey } = useContext(KeyContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [receivedBy, setReceivedBy] = useState('');
    const [image, setImage] = useState('');

    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {

            const state = {
                name,
                description,
                receivedBy,
                image
            }

            const { data } = await keyApi.post<FetchPostCreateKey>('/keys', state);
            

            createKey( data.responseItem );

            Swal.fire('Exito', 'Llave creada', 'success');


        } catch (error) {
            
            Swal.fire('Error', 'No se pudo crear la llave', 'error');

        }
    }

  return (
    <section className="text-black mx-auto flex justify-center items-center min-h-screen container">



            <form
                onSubmit={onSubmit}
                className="flex flex-col gap-4 shadow-2xl p-4 w-full border-t-4 border-indigo-600">
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
                    <Dropzone />

                <button className="bg-indigo-600 p-2 rounded-md text-white w-full">Crear</button>
            </form>


        </section>
  )
}
