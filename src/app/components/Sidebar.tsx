import { useState } from 'react';
import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import KeyIcon from '@mui/icons-material/Key';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import MenuIcon from '@mui/icons-material/Menu';

import { useAuth } from '@/auth/context';

export const Sidebar = () => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
              <ListItemButton>
                <ListItemIcon>
                  <PlaylistAddIcon />
                </ListItemIcon>
                <ListItemText primary="Llaves Prestadas" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <KeyIcon />
                </ListItemIcon>
                <ListItemText primary="Lista de Llaves" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <QueryBuilderIcon />
                </ListItemIcon>
                <ListItemText primary="Historial" />
              </ListItemButton>

            </List>


          </Box>
        </Drawer>
    
    </>
  )
}
