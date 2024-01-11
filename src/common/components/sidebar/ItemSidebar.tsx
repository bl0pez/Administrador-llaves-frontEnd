import { Link, useLocation } from 'react-router-dom';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import ArrowRightIcon from '@mui/icons-material/ArrowRight';

interface Props {
    onClick: () => void;
    to: string;
    icon: JSX.Element;
    title: string;
}

export const ItemSidebar = ({onClick, to, icon, title}: Props) => {

  const { pathname } = useLocation();

  return (
    <ListItem
    sx={{ 
      paddingX: 0,
      paddingY: 0.5,
    }}
  >
    <ListItemButton
      onClick={onClick}
      component={Link}
      to={to}
    >
      <ListItemIcon>
        { icon }
      </ListItemIcon>
      <ListItemText primary={title} />
      {
        (pathname.includes( title )) && (
          <ArrowRightIcon />
        )
      }
    </ListItemButton>
  </ListItem>
  )
}
