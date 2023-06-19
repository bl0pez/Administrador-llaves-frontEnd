import Modal from 'react-modal';
import { useBorrowedKeyContext, useKeyContext, useModalContext } from '../../context';
import Select from 'react-select';
import { useBorrowrdKeys, useForm } from '@/keys/hooks';
import { BorrowedKeyForm } from '@/keys/interfaces';
import { useState } from 'react';

const INITIAL_STATE: BorrowedKeyForm = {
    key: '',
    operator: '',
    requestedBy: '',
    service: '',
}

type Props = {
  createBorrowedKey : (borrowedKey: BorrowedKeyForm) => void;
}

export const BorrowrdKeyModal = ({ createBorrowedKey }: Props) => {

    const { stateModal, setIsCloseModal } = useModalContext();
    const [selecOption, setSelectOption] = useState('');
    const { formValues, onInputChange, resetForm } = useForm(INITIAL_STATE);

    const onClosedModal = () => {
        resetForm();
    }
    

    const { keyState } = useKeyContext();
    const { keys } = keyState;

    const handleSubmit = (e: any) => {
        e.preventDefault();

        createBorrowedKey({
            key: selecOption,
            operator: formValues.operator,
            requestedBy: formValues.requestedBy,
            service: formValues.service,
        });
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

          <div>
            <label htmlFor='search' className='text-2xl'>Nombre Operador: </label>
            <input 
              type='text' 
              className='block w-full mt-2' 
              placeholder='Operador' 
              name='operator'
              value={formValues.operator}
              onChange={onInputChange}
            />
          </div>

          <div>
            <label htmlFor='search' className='text-2xl'>Emprestada a: </label>
            <input 
              type='text' 
              className='block w-full mt-2' 
              placeholder='Pepito peres'
              name='requestedBy'
              onChange={onInputChange} 
            />
          </div>

          <div>
            <label htmlFor='search' className='text-2xl'>Servicio / empresa: </label>
            <input 
              type='text' 
              className='block w-full mt-2' 
              placeholder='Servicio / empresa' 
              name='service'
              onChange={onInputChange}  
            />
          </div>

          <button
            className='bg-indigo-600 p-2 rounded-md text-white w-full hover:bg-indigo-700 transition duration-300 ease-in-out'
          >Crear</button>


        </form>
      </Modal>
  )
}
