import { ThemeProvider, Theme } from "@mui/material";
import { createContext, FC, PropsWithChildren, useContext } from 'react';
import { useColorTheme } from "./useColorTheme";
import CssBaseline from '@mui/material/CssBaseline';

type ThemeContextType = {
    theme: Theme,
    mode: 'light' | 'dark',
    colorMode: { toggleColorMode: () => void }
};

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeContextProvider:FC<PropsWithChildren> = ({children}) => {

    const { mode, theme, colorMode } = useColorTheme();

    return (
        <ThemeContext.Provider value={{
            mode,
            theme,
            colorMode
        }}>
        <ThemeProvider theme={theme}>  
            {children}
            <CssBaseline />
      </ThemeProvider>
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => {
    return useContext(ThemeContext);
}