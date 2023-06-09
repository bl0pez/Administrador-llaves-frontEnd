import { useModalContext } from '@/keys/context';

type Porps = {
  text: string;
}

export const ButtonOpenModal = ({text}: Porps) => {
    const { setIsOpenModal } = useModalContext();

  return (
    <button
    className='fixed bottom-3 right-3 bg-indigo-600 text-4xl rounded-full text-white hover:bg-indigo-700 group w-14 h-14'
    onClick={setIsOpenModal}
  >
    <i className='fas fa-plus'></i>

    <span className='absolute w-auto p-2 m-2 min-w-max bottom-16 right-7 rounded-md shadow-md text-white bg-indigo-600 text-xs font-bold transition-all duration-100 scale-0 origin-bottom group-hover:scale-100'>
      {/* bombilla icono*/}
      <i className='fas fa-lightbulb mr-1'></i>
      {text}
    </span>

  </button>
  )
}
