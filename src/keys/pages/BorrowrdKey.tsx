import { BorrowrdKeyItem, IsAdmin, Spiner, TableKeys } from '../components';

const BorrowrdKey = () => {
  return (
    <section
    className='text-black flex flex-col gap-5 justify-center items-center mx-auto py-5 container'
  >

    <h1
      className='text-2xl text-center font-bold'
    >Llaves Prestadas</h1>

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
      roles={['ADMIN_ROLE', 'OPERATOR_ROLE']}
    >
      <BorrowrdKeyItem />
    </TableKeys>

    <IsAdmin
      roles={['ADMIN_ROLE', 'OPERATOR_ROLE']}
    >

    </IsAdmin>

  </section>
  )
}

export default BorrowrdKey
