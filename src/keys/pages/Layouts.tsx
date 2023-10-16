import { Outlet } from 'react-router-dom';
import { Sidebars } from '../components/sidebars/Sidebars';
import Modal from 'react-modal';
import { Box, Container } from '@mui/material';
import { ToggleThemeMode } from '@/components/ui/ToggleThemeMode';

Modal.setAppElement('#root');
export const Layouts = () => {
    return (
        <Box sx={{ display: 'flex', width: '100vw', overflowX: 'hidden' }}>
            <Sidebars />
            <Container maxWidth="xl">
            <Box 
                component="main" 
                sx={{ flexGrow: 1, p: 3 }}>
                <Outlet />
            </Box>
            </Container>
        </Box>
    )
}
