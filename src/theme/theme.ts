import { PaletteMode } from '@mui/material';

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'

    ? {
      primary: {
        main: '#666CFF'
      },
      secondary: {
        main: '#6D788D'
      },
      background: {
        default: '#F4F6F8',
        paper: '#FFFFFF'
      },
    }

    : {
      primary: {
        main: '#666CFF'
      },
      secondary: {
        main: '#6D788D'
      },
      background: {
        default: '#171C24',
        paper: '#30334E'
      },
    }),
  }
})