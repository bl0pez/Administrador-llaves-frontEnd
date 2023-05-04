import { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

import { Dropzone } from '../dropzone/Dropzone';
import { KeyContext } from '../../context';
import { fetchCreateKey } from '../../helpers/fetchKeys';

Modal.setAppElement('#root');

interface Props {
  isOpenModal: boolean;
  onCloseModal: () => void;
}

const initialFormValues = {
  name: '',
  description: '',
  receivedBy: '',
  image: File || null
}

export const CreateKeyModal = ({ isOpenModal, onCloseModal }: Props) => {

  const { keyState, createKey } = useContext(KeyContext);
  const { activeKey } = keyState;

  const [formValues, setFormValues] = useState(initialFormValues);

  // camputa los valores del input
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  // campura los valores del input file
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.files
    })
  }

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [receivedBy, setReceivedBy] = useState('');
  const [image, setImage] = useState<File | null>(null); 

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

      const { key } = await fetchCreateKey({
        name,
        description,
        receivedBy,
        image
      });

      createKey(key);

      Swal.fire('Exito', 'Llave creada', 'success');
      onCloseModal();


    } catch (error) {

      Swal.fire('Error', 'No se pudo crear la llave', 'error');

    }
  }

  useEffect(()=> {
    if(activeKey !== null) {

      setName(activeKey.name);
      setDescription(activeKey.description);
      setReceivedBy(activeKey.receivedBy);

    }
  }, [activeKey])

  return (
    <Modal
      isOpen={isOpenModal}
      onRequestClose={onCloseModal}
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
          onChange={onInputChange}
        />

        <label htmlFor="description">Descripción:</label>
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={onInputChange}
        />


        <label>resepcionada por:</label>
        <input
          type="text"
          name="resepcionada por"
          id="resepcionada por"
          value={receivedBy}
          onChange={onInputChange}
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
