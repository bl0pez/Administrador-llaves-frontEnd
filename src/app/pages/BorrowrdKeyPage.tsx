import { StickyTableContainer, TableHeaderRow } from '../components/table';
import { ButtonCreateBorrowedKey } from '../components/button/ButtonCreateBorrowedKey';
import { HeaderTableContent } from '../components/headerTable/HeaderTableContent';
import { BorrowedKeyProvider } from '../context/BorrowedKeyContext';
import { BorrowedKeyTableBody } from '../components/borrowedKey/table/BorrowedKeyTableBody';
import { BorrowedKeyTablePagination } from '../components/borrowedKey/table/BorrowedKeyTablePagination';

const columns = [
  'Nombre llave',
  'Operador',
  'Solicitado por',
  'Servicio o Empresa',
  'Fecha de Préstamo',
  'Acciones'
]


const BorrowedKeyPage = () => {
  return (
    <BorrowedKeyProvider>
        <HeaderTableContent
            label={'Buscar llave'}
            handleSearch={() => {}}
            isLoading={true}
        >   
            <ButtonCreateBorrowedKey />
        </HeaderTableContent>

        <StickyTableContainer>
            <TableHeaderRow
                columns={columns}
            />
            <BorrowedKeyTableBody />
        </StickyTableContainer>
        <BorrowedKeyTablePagination />
    </BorrowedKeyProvider>
  )
}

export default BorrowedKeyPage;