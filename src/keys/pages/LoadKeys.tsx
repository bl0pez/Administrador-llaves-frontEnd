import { BorrowrdKeyItem, BorrowrdKeyModal, ButtonOpenModal, Spiner, TableKeys } from '../components';

function LoadKeys() {

  return (
    <section
      className='text-black flex flex-col gap-5 justify-center items-center mx-auto py-5 container'
    >

      <h1
        className='text-4xl font-bold text-center'
      >Prestamo de llaves</h1>

      <TableKeys
        words={[
          'Llaves',
          'Operador',
          'Solicitada por',
          'Servicio / empresa',
          'Fecha de solicitud',
        ]}
        wordsAdmin={[
          'Acciones'
        ]}
      >
        <BorrowrdKeyItem />
      </TableKeys>

      <ButtonOpenModal />

      <BorrowrdKeyModal />

    </section>
  )
}

export default LoadKeys;
