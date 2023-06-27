import { useModalContext } from '@/keys/context';

export const ButtonOpenModal = () => {

  console.count('ButtonOpenModal');

    const { setIsOpenModal } = useModalContext();

  return (
    <button
    className='absolute bottom-5 right-5 bg-indigo-600 text-4xl w-16 h-16 rounded-full text-white hover:bg-indigo-700'
    onClick={setIsOpenModal}
  >
    <i className='fas fa-plus'></i>
  </button>
  )
}
