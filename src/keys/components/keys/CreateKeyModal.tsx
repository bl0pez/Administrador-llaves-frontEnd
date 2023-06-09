import { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

import { Dropzone } from '../dropzone/Dropzone';
import { KeyContext, useModalContext } from '../../context';
import { fetchCreateKey, fetchUpdateKey } from '../../helpers/fetchKeys';

const initialFormValues = {
  name: '',
  description: '',
  image: ''
}

export const CreateKeyModal = () => {

  const { keyState, createKey, onDeselectKey, updateKey } = useContext(KeyContext);
  const {setIsCloseModal, stateModal} = useModalContext();
  const { activeKey } = keyState;

  const [isLoading, setIsLoading] = useState(false);

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

  const onCloseModal = () => {
    setFormValues(initialFormValues);
    onDeselectKey();
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {

      if(activeKey !== null) {

        const { key, msg } = await fetchUpdateKey(activeKey._id, formValues);

        const msj = msg || 'Error al actualizar la llave';

        updateKey(key);
        Swal.fire('Exito', msj, 'success');
        setIsCloseModal();
        setFormValues(initialFormValues);

        setIsLoading(false);
        return;

      }

      const { key } = await fetchCreateKey(formValues);

      createKey(key);

      Swal.fire('Exito', 'Llave creada', 'success');
      setIsCloseModal();
      setFormValues(initialFormValues);


    } catch (error : any) {      
      const errorMsj = error.response.data.msg || 'Error al crear la llave';

      Swal.fire('Error', errorMsj, 'error');

    }

    setIsLoading(false);

  }

  useEffect(()=> {
    if(activeKey !== null) {
      setFormValues({
        name: activeKey.name,
        description: activeKey.description,
        image: activeKey.image
      });

    }
  }, [activeKey])

  return (
    <Modal
      isOpen={stateModal}
      onRequestClose={setIsCloseModal}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
      onAfterClose={onCloseModal}
    >



      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 shadow-2xl p-4 w-full min-h-full">
        <h1 className="text-4xl font-bold text-center">{
          (activeKey) ? 'Editar llave' : 'Crear llave'
        }</h1>
        <label htmlFor="name">Nombre de la llave:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formValues.name}
          onChange={onInputChange}
          autoComplete='off'
        />

        <label htmlFor="description">Descripción:</label>
        <input
          type="text"
          name="description"
          id="description"
          value={formValues.description}
          onChange={onInputChange}
          autoComplete='off'
        />

        <label htmlFor="image">Imagen:</label>
          <Dropzone 
            onFileChange={onFileChange}
            image={formValues.image}
          />
        <button
          disabled={isLoading}
          className="bg-indigo-600 p-2 rounded-md text-white w-full">
            {
              (isLoading)
              ? <i className="fas fa-spinner fa-spin"></i>
              : (activeKey) ? 'Actualizar' : 'Crear'
            }
          </button>

      </form>

    </Modal>
  )
}
