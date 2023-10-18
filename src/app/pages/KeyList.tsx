import { Box, Button, TableBody, TablePagination, TextField } from '@mui/material'
import { ButtonCreateKey } from '../components/button/ButtonCreateKey'
import SearchIcon from '@mui/icons-material/Search';
import { KeyTableRowItem, StickyTableContainer, TableHeaderRow } from '../components/table';
import { IKey } from '../interfaces';
import { usePaginations } from '../hooks/usePaginations';
import { useThemeContext } from '@/theme/ThemeContextProvider';

const columns = [
    'Imagen',
    'Nombre',
    'Descripción',
    'Fecha de creación',
    'Estado',
    'Entregada por',
    'Recibida por',
]

const KeyList = () => {

    const {mode} = useThemeContext();
    const { rowsPerPage, filterd, countItems, handleChangeRowsPerPage,  handleChangePage, page, handleSearch, search } = usePaginations();

  return (
    <>
        <Box
            display={'flex'}
            alignItems={'end'}
            width={'100%'}
            flexWrap={'wrap'}
            p={2}
            gap={2}
            sx={{
                backgroundColor: mode === 'dark' ? '#1E1E1E' : '#FFFFFF',
            }}
        >
            <Box
                display={'flex'}
                gap={2}
                alignItems={'center'}
                flexGrow={1}
            >
                <ButtonCreateKey />
            </Box>
            <Box
                display={'flex'}
                gap={2}
                alignItems={'end'}
                flexGrow={1}
            >
                <TextField 
                    sx={{
                        width: '100%',
                    }}
                    type="text"
                    id='search'
                    name='search'
                    value={search}
                    onChange={handleSearch} 
                    label="Buscar llave" 
                    autoComplete='off'
                    variant="standard" />
                <Button
                    variant='contained'
                >
                    <SearchIcon />
                </Button>
            </Box>
        </Box>
        <StickyTableContainer>
            <TableHeaderRow 
                columns={columns}
            />
                <TableBody>
                    {
                        filterd().map((key: IKey) => (
                            <KeyTableRowItem
                                key={key.keyId}
                                item={key}
                            />
                    ))
                    }
                </TableBody>
        </StickyTableContainer>
        <TablePagination
            rowsPerPageOptions={[
                5,
                10,
                25,
            ]}
            component="div"
            count={countItems}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
        />
    </>
  )
}

export default KeyList