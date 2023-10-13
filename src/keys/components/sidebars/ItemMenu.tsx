import { Link, useLocation } from 'react-router-dom';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Menu } from './routes';
import { FC } from 'react';

interface Props {
    item: Menu;
    isOpenMenu: boolean;
}

export const ItemMenu: FC<Props> = ({ item, isOpenMenu }) => {
  return (
    <ListItem disablePadding>
    <ListItemButton
        component={Link}
        to={item.url} 
    >
        <ListItemIcon>
            <item.icon />
        </ListItemIcon>
            <ListItemText primary={item.title} />
    </ListItemButton>
    </ListItem>
  )
}
