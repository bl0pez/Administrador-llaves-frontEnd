import { TableBody, TablePagination } from '@mui/material'
import { ButtonCreateKey } from '../components/button/ButtonCreateKey'
import { KeyTableRowItem, StickyTableContainer, TableHeaderRow } from '../components/table';
import { IKey } from '../interfaces';
import { HeaderTableContent } from '../components/headerTable/HeaderTableContent';
import { useKeyContext } from '../context/KeyContext';

const columns = [
    'Imagen',
    'Nombre',
    'Descripción',
    'Fecha de creación',
    'Estado',
    'Entregada por',
    'Recibida por',
]

const KeyPage = () => {

    const { stateKeys, loadKeys, handleChangePage, handleChangeLimit, handleSearch } = useKeyContext();
    const { keys, count, isLoading, limit, page } = stateKeys;

  return (
    <>
        <HeaderTableContent
            label={'Buscar llave'}
            handleSearch={handleSearch}
            isLoading={isLoading}
        >
            <ButtonCreateKey />
        </HeaderTableContent>

        <StickyTableContainer>
            <TableHeaderRow 
                columns={columns}
            />
                <TableBody>
                    {
                        keys.map((key: IKey) => (
                            <KeyTableRowItem
                                key={key.keyId}
                                item={key}
                            />
                    ))
                    }
                </TableBody>
        </StickyTableContainer>
        <TablePagination
            id='pagination'
            rowsPerPageOptions={[
                5,
                10,
                25,
            ]}
            component="div"
            count={count}
            onRowsPerPageChange={(e) => handleChangeLimit(parseInt(e.target.value, 10))}
            rowsPerPage={limit}
            page={page}
            onPageChange={(e, newPage) => handleChangePage(newPage)}
        />
    </>
  )
}

export default KeyPage;