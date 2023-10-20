import { Box, Button, TableBody, TableCell, TableRow, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { useThemeContext } from '@/theme/ThemeContextProvider';
import { StickyTableContainer, TableHeaderRow } from '../components/table';
import { ButtonCreateBorrowedKey } from '../components/button/ButtonCreateBorrowedKey';
import { useState, useEffect } from 'react';
import { getAllBorrowedKeys } from '../services/borrowedKeys/getAllBorrowedKeys';

const columns = [
  'Nombre llave',
  'Operador que la entregó',
  'Hora de entrega',
  'Operador que la recibió',
  'Hora de devolución',
]


const BorrowedKeys = () => {

  const {mode} = useThemeContext();
  const [borrowedKeys, setBorrowedKeys] = useState([]);

  const items = async () => {
    const response = await getAllBorrowedKeys();
    setBorrowedKeys(response);
  }
    
  useEffect(() => {
    items();
  }, [])

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
                    {
                        borrowedKeys.map((item, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    a
                                </TableCell>
                                {/* <TableCell align="right">{item.operatorDelivered}</TableCell>
                                <TableCell align="right">{item.deliveryTime}</TableCell>
                                <TableCell align="right">{item.operatorReceived}</TableCell>
                                <TableCell align="right">{item.returnTime}</TableCell> */}
                            </TableRow>
                        )
                        )
                    }
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