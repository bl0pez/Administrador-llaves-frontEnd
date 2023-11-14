import { Checkbox, FormControl, FormHelperText, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import { FC, useEffect, useRef } from 'react'

interface Props {
    roles: string[];
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}
const items = [
    'operador',
    'admin',
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const SelectRoles:FC<Props> = ({ roles, setFieldValue }) => {

  return (
    <FormControl
        id='roles'
        required>
        <InputLabel 
            id='roles'
        >
            Roles
        </InputLabel>
        <Select
            labelId='roles'
            id='roles'
            name='roles'
            multiple
            value={roles}
            onChange={(e: SelectChangeEvent<typeof roles>) => {
                const { value } = e.target;
                setFieldValue('roles', typeof value === 'string' ? value.split(',') : value);
            }}
            input={<OutlinedInput label='Roles' name='roles' />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
            >
                {
                    items.map((role) => (
                        <MenuItem key={role} value={role}>
                            <Checkbox 
                                checked={roles.indexOf(role) > -1} 
                                color='success'
                            />
                            <ListItemText primary={role} />
                        </MenuItem>
                    ))
                }
        </Select>
            <FormHelperText>
                Seleccione los roles del usuario
            </FormHelperText>
    </FormControl>
  )
}
