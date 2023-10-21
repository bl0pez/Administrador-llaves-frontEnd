import { FC } from 'react';
import { TextField } from '@mui/material';

type InputFormProps = {
  helperText: string | false | undefined;
  isError: boolean;
  label: string;
  type: 'text' | 'password' | 'email' | 'number';
  [x: string]: any;
}

export const InputForm:FC<InputFormProps> = ({ isError, helperText, label, type, ...props}) => {
  return (
      <TextField
      type={type}
      color='primary'
      autoComplete='off'
      variant='outlined'
      label='Nombre de la llave'
      error={isError}
      helperText={helperText}
      { ...props }
      required
      />
  )
}
