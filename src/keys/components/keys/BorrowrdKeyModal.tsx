import { useState } from 'react';
import Modal from 'react-modal';

import { useKeyContext, useModalContext } from '@/keys/context';
import Select from 'react-select';
import { useBorrowrdKeys, useForm } from '@/keys/hooks';
import { BorrowedKeyForm, ResBorrowedKey } from '@/keys/interfaces';
import { Input } from '../html/Input';
import Swal from 'sweetalert2';
import { keyApi } from '@/api/keyApi';

const INITIAL_STATE: BorrowedKeyForm = {
  key: '',
  operator: '',
  requestedBy: '',
  service: '',
}

export const BorrowrdKeyModal = () => {
  const { stateModal, setIsCloseModal } = useModalContext();
  const [selecOption, setSelectOption] = useState('');
  const { formValues, onInputChange, resetForm } = useForm(INITIAL_STATE);
  const { keyState } = useKeyContext();
  const { keys } = keyState;

  const [isLoading, setIsLoading] = useState(false);

  const { createBorrowedKey } = useBorrowrdKeys();


  const onClosedModal = () => {
    resetForm();
  }



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

      setIsLoading(true);

      const { data }= await keyApi.post<ResBorrowedKey>('/borrowedKeys/create', {
        key: selecOption,
        operator: formValues.operator,
        requestedBy: formValues.requestedBy,
        service: formValues.service,
      });

      createBorrowedKey(data.borrowedKey);
      setIsCloseModal();

    } catch (error : any) {
      const msj = error.response.data.msg || 'Error al solicitar la llave';

      Swal.fire('Error', msj, 'error');
    }

    setIsLoading(false);


  }




  return (
    <Modal
      isOpen={stateModal}
      onRequestClose={setIsCloseModal}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
      onAfterClose={onClosedModal}
    >
      <form
        onSubmit={handleSubmit}
        className='grid grid-cols-1 gap-5 justify-center items-center mx-auto py-5 px-5'
      >

        <h1 className='text-4xl col-span-1 text-center'>Solicitar llave</h1>

        <div>
          <label htmlFor='search' className='text-2xl'>Llave: </label>
          <Select
            className='block text-black mt-2'
            options={keys.filter(key => !key.status).map(key => ({ value: key._id, label: key.name }))}
            onChange={(e: any) => setSelectOption(e.value)}
          />
        </div>

        <Input
          value={formValues.operator}
          name='operator'
          onInputChange={onInputChange}
          placeholder='Operador'
          texto='Operador'
        />

        <Input
          value={formValues.requestedBy}
          name='requestedBy'
          onInputChange={onInputChange}
          placeholder='Pepito peres'
          texto='Prestada a'
        />

        <Input
          value={formValues.service}
          name='service'
          onInputChange={onInputChange}
          placeholder='Equipos industriales'
          texto='Servicio / empresa'
        />

        <button
          type='submit'
          disabled={isLoading}
        >
          {
            isLoading
              ? <i className="fas fa-spinner fa-spin"></i>
              : 'Solicitar'
          }
        </button>


      </form>
    </Modal>
  )
}
