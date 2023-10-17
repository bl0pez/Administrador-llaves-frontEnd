import { Box, Button, TableBody, TablePagination, TextField } from "@mui/material"
import { ButtonCreateKey } from "../components/button/ButtonCreateKey"
import SearchIcon from '@mui/icons-material/Search';
import { KeyTableRowItem, StickyTableContainer, TableHeaderRow } from "../components/table";
import { IKey } from "../interfaces";
import { useKeyContext } from "../context/KeyContext";

const columns = [
    'Imagen',
    'Nombre',
    'Descripción',
    'Fecha de creación',
    'Estado',
    'Entregada por',
]

const KeyList = () => {

    const { stateKeys } = useKeyContext();

    const { keys, count } = stateKeys;

  return (
    <>
      <ButtonCreateKey />
      <>

<Box
    display={'flex'}
    justifyContent={'space-between'}
    flexWrap={'wrap'}
    gap={2}
    alignItems={'end'}
>
    <Box
        display={'flex'}
        alignItems={'end'}
        width={'400px'}
        gap={2}
    >
        <TextField 
            sx={{
                width: '100%',
            }}
            id="search"
            type="text"
            name='search' 
            label="Buscar llave" 
            autoComplete='off'
            variant="standard" />
        <Button
            variant='outlined'
            color='primary'
        >
            <SearchIcon />
        </Button>
    </Box>
    
    <ButtonCreateKey />

</Box>

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
                        // handleOpenModal={handleOpenModal}
                    />
               ))
            }
        </TableBody>
</StickyTableContainer>
<TablePagination
    rowsPerPageOptions={[5, 10, 25]}
    component="div"
    count={count}
    rowsPerPage={5}
    page={0}
    onPageChange={() => {}}
/>
</>
    </>
  )
}

export default KeyList