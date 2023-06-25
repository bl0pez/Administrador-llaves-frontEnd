import { useState } from 'react';
import Modal from 'react-modal';

import { useKeyContext, useModalContext } from '@/keys/context';
import Select from 'react-select';
import { useBorrowrdKeys, useForm } from '@/keys/hooks';
import { BorrowedKeyForm } from '@/keys/interfaces';
import { Input } from '../html/Input';

const INITIAL_STATE: BorrowedKeyForm = {
  key: '',
  operator: '',
  requestedBy: '',
  service: '',
}

type Props = {
  createBorrowedKey: (borrowedKey: BorrowedKeyForm) => void;
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

    setIsLoading(true);
    
      createBorrowedKey({
        key: selecOption,
        operator: formValues.operator,
        requestedBy: formValues.requestedBy,
        service: formValues.service,
      });
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
