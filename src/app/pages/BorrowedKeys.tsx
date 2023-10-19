import { Box, Button, TableBody, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { useThemeContext } from '@/theme/ThemeContextProvider';
import { StickyTableContainer, TableHeaderRow } from '../components/table';
import { ButtonCreateBorrowedKey } from '../components/button/ButtonCreateBorrowedKey';

const columns = [
  'Nombre llave',
  'Operador que la entregó',
  'Hora de entrega',
  'Operador que la recibió',
  'Hora de devolución',
]


const BorrowedKeys = () => {

  const {mode} = useThemeContext();

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
                <ButtonCreateBorrowedKey />
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
                    // value={search}
                    // onChange={handleSearch} 
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
                    {/* {
                        filterd().map((key: IKey) => (
                            <KeyTableRowItem
                                key={key.keyId}
                                item={key}
                            />
                    ))
                    } */}
                </TableBody>
        </StickyTableContainer>
        {/* <TablePagination
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
            onPageChange={handleChangePage} */}
        {/* /> */}
    </>
  )
}

export default BorrowedKeys