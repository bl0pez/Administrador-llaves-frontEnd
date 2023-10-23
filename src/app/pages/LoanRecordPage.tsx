import { TableBody, TableCell, TableRow } from '@mui/material';
import { StickyTableContainer, TableHeaderRow } from '../components/table';
import { ButtonCreateBorrowedKey } from '../components/button/ButtonCreateBorrowedKey';
import { useState, useEffect } from 'react';
import { getAllLoanRecord } from '../services/borrowedKeys/getAllBorrowedKeys';
import { IGetLoanRecord } from '../interfaces';
import { transformDate } from '../helpers/transformDate';
import { HeaderTableContent } from '../components/headerTable/HeaderTableContent';

const columns = [
  'Nombre llave',
  'Operador',
  'Solicitado por',
  'Servicio o Empresa',
  'Fecha de Préstamo',
  'Fecha de Devolución',
  'Estado',
]


const LoanRecordPage = () => {
  const [keyLoanRecord, setKeyLoanRecord] = useState<IGetLoanRecord[]>([]);

  const loadRecord = async ():Promise<void> => {
    const response = await getAllLoanRecord();  
    console.log('lanzado');
      
    setKeyLoanRecord(response);
  }
    
  useEffect(() => {
    loadRecord();
  }, [])

  return (
    <>
        <HeaderTableContent
            label={'Buscar llave'}
            handleSearch={() => {}}
            search={'search'}
            value={''}
        >   
            <ButtonCreateBorrowedKey />
        </HeaderTableContent>

        <StickyTableContainer>
            <TableHeaderRow
                columns={columns}
            />
                <TableBody>
                    {
                        keyLoanRecord.map((item: IGetLoanRecord) => (
                            <TableRow
                                key={item.loanRecordId}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {item.keyName}
                                </TableCell>
                                <TableCell>{item.operator}</TableCell>
                                <TableCell>{item.borrowerName}</TableCell>
                                <TableCell>{item.borrowerServiceOrCompany}</TableCell>
                                <TableCell>{transformDate(item.createdAt)}</TableCell>
                                <TableCell>{item.createdAt !== item.updatedAt ? transformDate(item.updatedAt) : '-'}</TableCell>
                                <TableCell>{item.borrowed ? 'Prestada' : 'Devuelta'}</TableCell>
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

export default LoanRecordPage;