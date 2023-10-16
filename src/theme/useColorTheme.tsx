import { useState, useMemo, useEffect } from 'react';
import { createTheme, PaletteMode } from '@mui/material';
import { getDesignTokens } from './theme';
export const useColorTheme = () => {
  
    const [mode, setMode] = useState<PaletteMode>(
      localStorage.getItem('colorMode') as PaletteMode || 'dark',
    );

    useEffect(() => {
      localStorage.setItem('colorMode', mode);
    }, [mode]);

    const colorMode = useMemo(
        () => ({
          // The dark mode switch would invoke this method
          toggleColorMode: () => {
            setMode((prevMode: PaletteMode) =>
              prevMode === 'light' ? 'dark' : 'light',
            );
          },
        }),
        [],
      );

    const modifiedTheme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    return {
        theme: modifiedTheme,
        mode,
        colorMode
    }

}
