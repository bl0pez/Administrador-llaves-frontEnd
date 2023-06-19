import { BorrowrdKeyItem, BorrowrdKeyModal, Spiner, TableKeys } from '../components';
import { useBorrowedKeyContext, useModalContext } from '../context';

function LoadKeys(){
  
  const { borrowrdKeyState } = useBorrowedKeyContext();
  const { isLoading, borrowedKeys, error } = borrowrdKeyState;

  //Modal
  const { setIsOpenModal } = useModalContext();

  if(isLoading) return (
    <div className='flex h-screen justify-center'>
        <Spiner />
    </div>
)

    if(error) return (
        <div className='flex h-screen justify-center items-center'>
            <h1>Upss algo a salido mal</h1>
        </div>
    )


  return (
    <section
      className='text-black flex flex-col gap-5 justify-center items-center mx-auto py-5 container'
    >
      <TableKeys
        words={[
          'Llaves',
          'Operador',
          'Solicitada por',
          'Servicio / empresa',
          'Fecha de solicitud',
        ]}
      >
          <BorrowrdKeyItem 
            items={borrowedKeys}
          />
      </TableKeys>

      <button
        className='absolute bottom-5 right-5 bg-indigo-600 text-4xl w-16 h-16 rounded-full text-white hover:bg-indigo-700'
        onClick={setIsOpenModal}
      >
        <i className='fas fa-plus'></i>
      </button>

      <BorrowrdKeyModal />

    </section>
  )
}

export default LoadKeys;
