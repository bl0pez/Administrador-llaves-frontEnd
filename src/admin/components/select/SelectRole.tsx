import { FC } from 'react'
import { Roles } from '@/common/interfaces';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface Props {
    role: string;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

export const SelectRole:FC<Props> = ({ role, setFieldValue }: Props) => {

  return (
    <FormControl required>
      <InputLabel id="Rol">Rol</InputLabel>
      <Select
        labelId="Rol"
        id="Rol"
        value={role}
        label="Role"
        onChange={(e: SelectChangeEvent) => setFieldValue('role', e.target.value)}
      >
        {
          Object.values(Roles).map((role) => (
            <MenuItem key={role} value={role}>
              { role }
            </MenuItem>
          ))
        }
      </Select>
      <FormHelperText>
        Selecciona un rol
      </FormHelperText>
    </FormControl>
  )
}
