import { useState } from 'react';
import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import { useAuth } from '@/auth/context';
import { Link, useLocation } from 'react-router-dom';
import { sidebarMenu } from './items';
import { useThemeContext } from '@/theme/ThemeContextProvider';

export const Sidebar = () => {

  const { colorMode, mode, theme } =  useThemeContext();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { pathname } = useLocation();
  const { authstate, handleLogout } = useAuth();

  return (
    <>
        <Button
            variant="contained"
            onClick={() => setIsDrawerOpen(true)}
        >
            <MenuIcon />
        </Button>

        <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
        >
          <Box
            sx={{ 
                width: 250,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
             }}
          >
            <Box
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: 1,
                paddingX: 2,
                paddingY: 1,
              }}
            >
              <AccountCircleIcon 
                fontSize='small'/>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                { authstate.name }
              </Typography>
            </Box>
            <Divider />

            <List
              sx={{
                flex: 1
              }}
            >
              {
                sidebarMenu.map((item) => (
                  <ListItem
                    key={item.text}
                    sx={{ 
                      paddingX: 0,
                      paddingY: 0.5,
                    }}
                  >
                    <ListItemButton
                      onClick={() => setIsDrawerOpen(false)}
                      component={Link}
                      to={item.path}
                    >
                      <ListItemIcon>
                        { item.icon }
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                      {
                        (item.path === pathname) && (
                          <ArrowRightIcon />
                        )
                      }
                    </ListItemButton>
                  </ListItem>
                ))
              }
              {
                authstate.roles.includes('admin') && (
                  <ListItem
                    sx={{ 
                      paddingX: 0,
                      paddingY: 0.5,
                    }}
                  >
                    <ListItemButton
                      onClick={() => setIsDrawerOpen(false)}
                      component={Link}
                      to='/dashboard'
                    >
                      <ListItemIcon>
                        <AdminPanelSettingsIcon />
                      </ListItemIcon>
                      <ListItemText primary='Dashboard' />
                      {
                        (pathname.includes('dashboard')) && (
                          <ArrowRightIcon />
                        )
                      }
                    </ListItemButton>
                  </ListItem>
                )
              }

            </List>

             <List
                sx={{
                  flexBasis: 'end'
                }}
             >
                <ListItemButton
                  onClick={() => colorMode.toggleColorMode()}
                >
                  <ListItemIcon
                    sx={{
                      color: 'text.secondary'
                    }}
                  >
                    {
                        mode === 'dark' 
                          ? <Brightness7Icon /> 
                          : <Brightness4Icon />
                    }
                  </ListItemIcon>
                  <ListItemText
                    primary={`${theme.palette.mode} Theme `}
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={() => handleLogout()}
                  color='error'
                >
                  <ListItemIcon
                  >
                    <LogoutIcon 
                      color='error'
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Logout"
                    sx={{
                      color: 'error.main'
                    }} 
                  />
                </ListItemButton>
             </List>
          </Box>
        </Drawer>
    
    </>
  )
}
