import { FC, useState } from 'react';
import { Chip, IconButton, TableCell, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { User } from '@/admin/interfaces';
import { UpdateUserModal } from '../modal/UpdateUserModal';
import { transformDate } from '@/common/helpers';

export const UserTableItem:FC<User> = (user) => {

    const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <TableRow>
        <TableCell>
            { user.fullName }
        </TableCell>
        <TableCell>
            { user.email }
        </TableCell>
        <TableCell>
            { 
            user.roles.map(role => (
                <Chip
                    key={role}
                    label={role}
                    variant="outlined"
                    size="small"
                    sx={{
                        margin: '0.2rem 0.2rem 0.2rem 0'
                    }}
                />
            ))}
        </TableCell> 
        <TableCell>
            { transformDate(user.created_at) }
        </TableCell>
        <TableCell>
            <IconButton
                onClick={() => setIsOpen(!isOpen)}
                size="small"
                
            >
                <EditIcon />
            </IconButton>
        </TableCell>
    </TableRow>

    <UpdateUserModal
        isOpen={isOpen} 
        handleClose={() => setIsOpen(!isOpen)}
        user={user}   
    />


</>
  )
}
