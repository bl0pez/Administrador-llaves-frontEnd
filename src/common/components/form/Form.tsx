import { FC } from 'react';
import { Box } from '@mui/material';

interface Props {
    handleSubmit: () => void;
    children: JSX.Element | JSX.Element[];
}

export const Form:FC<Props> = ({ children , handleSubmit }) => {
  return (
    <Box
    component='form'
    onSubmit={handleSubmit}
    boxShadow={4}
    p={2}
    display={'flex'}
    flexDirection={'column'}
    gap={2}
    borderRadius={2}
    width={'400px'}
    >
        { children }
    </Box>
  )
}
