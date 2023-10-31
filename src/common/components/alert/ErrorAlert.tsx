import { FC } from 'react';
import { Alert, Slide, SlideProps, Snackbar } from '@mui/material';

type Props = {
    isError: boolean;
    setIsError: (value: boolean) => void;
    message: string;
}


function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="right" />;
}

export const ErrorAlert:FC<Props> = ({ isError, setIsError, message}) => {
  return (
    <Snackbar
    sx={{
        position: 'fixed',
        top: 10,
        left: 4,
    }}
    anchorOrigin={{ vertical: 'top', horizontal: 'left' }} 
    open={isError}
    TransitionComponent={SlideTransition}
    autoHideDuration={4000} 
    onClose={() => setIsError(false)}>
    <Alert variant="filled" severity="error" sx={{ width: '100%' }}>
        {message}
    </Alert>
</Snackbar>
  )
}
