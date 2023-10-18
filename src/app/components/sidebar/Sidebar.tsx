import { useState } from 'react';
import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { useAuth } from '@/auth/context';
import { Link, useLocation } from 'react-router-dom';
import { sidebarMenu } from './items';

export const Sidebar = () => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { pathname } = useLocation();
  const { authstate } = useAuth();

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
            sx={{ width: 250 }}
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

            <List>
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
            </List>


          </Box>
        </Drawer>
    
    </>
  )
}