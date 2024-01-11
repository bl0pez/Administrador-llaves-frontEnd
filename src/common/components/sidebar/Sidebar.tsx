import { useState } from 'react';
import { Box, Button, Divider, Drawer, List, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import GroupIcon from '@mui/icons-material/Group';
import { ProtectiveRoles } from '@/common/components/roles/ProtectiveRoles';

import { useAuth } from '@/auth/context';
import { sidebarMenu } from './items';
import { Roles } from '@/common/interfaces';
import { ItemSidebar } from './ItemSidebar';
import { ItemToggleMode } from './ItemToggleMode';
import { ItemLoagout } from './ItemLoagout';

export const Sidebar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
                  <ItemSidebar
                    key={item.text}
                    onClick={() => setIsDrawerOpen(false)}
                    to={item.path}
                    icon={item.icon}
                    title={item.text}
                  />
                ))
              }
              <ProtectiveRoles
                roles={[Roles.ADMIN]}
              >
                <ItemSidebar
                  onClick={() => setIsDrawerOpen(false)}
                  to='/users'
                  icon={<GroupIcon color='secondary' />}
                  title='Users'
                />
              </ProtectiveRoles>

            </List>

             <List
                sx={{
                  flexBasis: 'end'
                }}
             >
                {/* toggle theme mode */}
                <ItemToggleMode />
                {/* logout button */}
                <ItemLoagout handleLogout={handleLogout} />
             </List>
          </Box>
        </Drawer>
    
    </>
  )
}
