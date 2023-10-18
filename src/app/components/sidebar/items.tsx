import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import KeyIcon from '@mui/icons-material/Key';

type SidebarMenu = {
    icon: JSX.Element;
    path: string;
    text: string;
}

export const sidebarMenu: SidebarMenu[] = [
    {   
        icon:  <PlaylistAddIcon />, 
        path: '/', 
        text: 'Llaves Prestadas', 
    },
    {
        icon: <KeyIcon />, 
        path: '/keyList', 
        text: 'Llaves',
    }
]