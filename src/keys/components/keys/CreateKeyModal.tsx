import { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

import { Dropzone } from '../dropzone/Dropzone';
import { KeyContext } from '../../context';
import { fetchCreateKey } from '../../helpers/fetchKeys';
import { ModalContext } from '../../../context';

Modal.setAppElement('#root');

interface Props {
  isOpenModal: boolean;
  onCloseModal: () => void;
}

const initialFormValues = {
  name: '',
  description: '',
  receivedBy: '',
  image: null,
}

export const CreateKeyModal = () => {

  const { keyState, createKey } = useContext(KeyContext);
  const {setIsCloseModal, setIsOpenModal, stateModal} = useContext(ModalContext);
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
  const onFileChange = (e: any) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.files[0]
    })
  }
  

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [receivedBy, setReceivedBy] = useState('');
  const [image, setImage] = useState<File | null>(null); 

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

      const { key } = await fetchCreateKey(formValues);

      createKey(key);

      Swal.fire('Exito', 'Llave creada', 'success');
      setIsCloseModal();
      setFormValues(initialFormValues);


    } catch (error) {

      Swal.fire('Error', 'No se pudo crear la llave', 'error');

    }
  }

  useEffect(()=> {
    if(activeKey !== null) {

      setFormValues({
        name: activeKey.name,
        description: activeKey.description,
        receivedBy: activeKey.receivedBy,
        image: null
      })

    }
  }, [activeKey])

  return (
    <Modal
      isOpen={stateModal}
      onRequestClose={setIsCloseModal}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
      onAfterClose={() => setFormValues(initialFormValues)}
    >



      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 shadow-2xl p-4 w-full min-h-full">
        <h1 className="text-4xl font-bold text-center">Crear llave</h1>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formValues.name}
          onChange={onInputChange}
        />

        <label htmlFor="description">Descripción:</label>
        <input
          type="text"
          name="description"
          id="description"
          value={formValues.description}
          onChange={onInputChange}
        />


        <label>resepcionada por:</label>
        <input
          type="text"
          name="receivedBy"
          id="receivedBy"
          value={formValues.receivedBy}
          onChange={onInputChange}
        />

        <label htmlFor="image">Imagen:</label>
          <Dropzone 
            onFileChange={onFileChange}
            image={formValues.image}
          />
        <button
          className="bg-indigo-600 p-2 rounded-md text-white w-full">Crear</button>

      </form>

    </Modal>
  )
}
