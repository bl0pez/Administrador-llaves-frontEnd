import Modal from 'react-modal';
import { useKeyContext, useModalContext } from '../../context';
import Select from 'react-select';

export const BorrowrdKeyModal = () => {

    const { stateModal, setIsCloseModal } = useModalContext();
    const { keyState } = useKeyContext();
    const { keys } = keyState;

    const handleSelect = (e: any) => {
        console.log(e);
    }

  return (
    <Modal
        isOpen={stateModal}
        onRequestClose={setIsCloseModal}
        closeTimeoutMS={200}
        className="modal"
        overlayClassName="modal-fondo"
      >
        <form
          className='grid grid-cols-1 gap-5 justify-center items-center mx-auto py-5 px-5'
        >

          <h1 className='text-4xl col-span-1 text-center'>Solicitar llave</h1>

          <div>
            <label htmlFor='search' className='text-2xl'>Llave: </label>
            <Select
              className='block text-black mt-2'
              options={keys.map(key => ({ value: key._id, label: key.name }))}
              onChange={handleSelect}
            />
          </div>

          <div>
            <label htmlFor='search' className='text-2xl'>Nombre Operador: </label>
            <input type='text' className='block w-full mt-2' placeholder='Operador' />
          </div>

          <div>
            <label htmlFor='search' className='text-2xl'>Emprestada a: </label>
            <input type='text' className='block w-full mt-2' placeholder='Pepito...' />
          </div>

          <div>
            <label htmlFor='search' className='text-2xl'>Servicio / empresa: </label>
            <input type='text' className='block w-full mt-2' placeholder='Servicio / empresa' />
          </div>

          <button
            className='bg-indigo-600 p-2 rounded-md text-white w-full hover:bg-indigo-700 transition duration-300 ease-in-out'
          >Crear</button>


        </form>
      </Modal>
  )
}
