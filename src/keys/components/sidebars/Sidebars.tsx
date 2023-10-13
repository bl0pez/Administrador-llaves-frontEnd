import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/auth/context';
import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import { Menu, menu } from './routes';
import { ItemMenu } from './ItemMenu';
import { ActionItemMenu } from './ActionItemMenu';
import { Box } from '@mui/material';


const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export const Sidebars = () => {

    const { handleLogout, authstate } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

    const { pathname } = useLocation();


    const [open, setOpen] = React.useState(false);

    const handleDrawerAction = () => {
        setOpen(!open);
    }
  
    return (
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerAction}>
              {open ? <ChevronLeftIcon />: <ChevronRightIcon /> }
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Box
            display={'flex'}
            flexDirection={'column'}
            minHeight={'calc(100vh - 65px)'}
          >
          <List
            sx={{
              flexGrow: 1,
            }}
          >
                {
                  menu.map((item: Menu) => (
                    <ItemMenu 
                      key={item.title}
                      item={item}
                      isOpenMenu={open}
                    />
                  ))
                }
          </List>
          <ActionItemMenu />
          </Box>
        </Drawer>
    )
}
