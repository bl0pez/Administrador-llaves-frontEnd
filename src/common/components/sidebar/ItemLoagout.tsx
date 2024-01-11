import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import LogoutIcon from '@mui/icons-material/Logout';


interface Props {
    handleLogout: () => void;
}

export const ItemLoagout = ({ handleLogout }: Props) => {
  return (
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
  )
}
