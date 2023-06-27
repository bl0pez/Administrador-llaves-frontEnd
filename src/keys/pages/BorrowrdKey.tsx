import { BorrowrdKeyItem, BorrowrdKeyModal, ButtonOpenModal, IsAdmin, Spiner, TableKeys } from '../components';

export const BorrowrdKey = () => {

  return (
    <section
      className='text-black flex flex-col gap-5 justify-center items-center mx-auto py-5 container'
    >

      <h1
        className='text-4xl font-bold'
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

      <IsAdmin
        roles={['ADMIN_ROLE', 'OPERATOR_ROLE']}
      >
        <ButtonOpenModal />

        <BorrowrdKeyModal />
      </IsAdmin>

    </section>
  )
}
