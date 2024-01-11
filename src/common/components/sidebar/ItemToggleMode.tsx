import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from "@/theme/ThemeContextProvider";

export const ItemToggleMode = () => {

  const { colorMode, mode } =  useThemeContext();

  return (
    <ListItemButton
    onClick={() => colorMode.toggleColorMode()}
  >
    <ListItemIcon
      sx={{
        color: mode === 'dark' ? 'text.light' : 'text.dark'
      }}
    >
      {
          mode === 'dark' 
            ? <Brightness7Icon /> 
            : <Brightness4Icon />
      }
    </ListItemIcon>
    <ListItemText
      primary={mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
      sx={{
        color: mode === 'dark' ? 'text.light' : 'text.dark'
      }}
    />
  </ListItemButton>
  )
}
