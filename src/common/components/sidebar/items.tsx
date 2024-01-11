import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import KeyIcon from '@mui/icons-material/Key';
import HistoryIcon from '@mui/icons-material/History';

type SidebarMenu = {
    icon: JSX.Element;
    path: string;
    text: string;
}

export const sidebarMenu: SidebarMenu[] = [
    {   
        icon:  <PlaylistAddIcon  color='secondary' />, 
        path: '/', 
        text: 'Llaves Prestadas', 
    },
    {
        icon: <KeyIcon color='secondary' />, 
        path: '/keyList', 
        text: 'Llaves',
    },
    {
        icon: <HistoryIcon color='secondary' />,
        path: '/history',
        text: 'Historial',
    }
]