import Modal from 'react-modal';
import { Dropzone } from '../dropzone/Dropzone';
import Swal from 'sweetalert2';
import { FetchPostCreateKey } from '../../interfaces/fetchAllKeys';
import { keyApi } from '../../../api/keyApi';
import { useContext, useState } from 'react';
import { KeyContext } from '../../context/KeyContext';

Modal.setAppElement('#root');

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}


export const CreateKeyModal = ({ isOpen, setIsOpen }: Props) => {

  const { keyState, createKey } = useContext(KeyContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [receivedBy, setReceivedBy] = useState('');
  const [image, setImage] = useState<File | null>(null); 

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      

      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('receivedBy', receivedBy);
      formData.append('image', image!);

      const { data } = await keyApi.post<FetchPostCreateKey>('/keys', 
      formData
      );


      createKey(data.key);

      Swal.fire('Exito', 'Llave creada', 'success');


    } catch (error) {

      Swal.fire('Error', 'No se pudo crear la llave', 'error');

    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >



      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 shadow-2xl p-4 w-full">
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

        <label htmlFor="image">Imagen:</label>
          <Dropzone 
            setImage={setImage}
            image={image}
          />
        <button
          className="bg-indigo-600 p-2 rounded-md text-white w-full">Crear</button>

      </form>

    </Modal>
  )
}
