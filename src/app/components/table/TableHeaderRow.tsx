import { FC } from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material'
import { useThemeContext } from '@/theme/ThemeContextProvider';

interface Props {
    columns: string[];
}

export const TableHeaderRow:FC<Props> = ({ columns }) => {

    const { mode } = useThemeContext();

  return (
    <TableHead>
        <TableRow>
            {
                columns.map((Column, index) => (
                    <TableCell 
                        key={index}    
                        sx={{ 
                                whiteSpace: 'nowrap',
                                backgroundColor: mode === 'dark' ? '#1E1E1E' : '#FFFFFF',
                                minWidth: '150px',
                        }}
                    > 
                        { Column }
                    </TableCell>
                ))
            }
        </TableRow>
    </TableHead>
  )
}
