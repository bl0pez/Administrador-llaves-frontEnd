import { FC } from 'react';
import { Paper, Table, TableContainer, TableHead,  TableRow } from '@mui/material';

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const StickyTableContainer: FC<Props> = ({ children }) => {
  return (
    <Paper 
    sx={{
        boxShadow: "0px 5px 5px rgba(0,0,0,0.05)",
        width: '100%',
        overflow: 'hidden'                
    }}>
    <TableContainer
        sx={{
            height: '400px',
            width: '100%',
        }}
    >
        <Table
            stickyHeader 
            aria-label="sticky table"
        >
            { children }
        </Table>
    </TableContainer>
</Paper>
  )
}