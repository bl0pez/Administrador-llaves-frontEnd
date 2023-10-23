import { FC } from 'react';
import { Box, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

import { useThemeContext } from '@/theme/ThemeContextProvider';
import { ButtonForm } from '@/components/button/ButtonForm';

type Props = {
    children: JSX.Element | JSX.Element[];
    label: string;
    handleSearch: (search: string) => void;
    isLoading: boolean;
}

export const HeaderTableContent:FC<Props> = ({ children, label, handleSearch, isLoading }) => {
    const {mode} = useThemeContext();

  return (
    <Box
        display={'flex'}
        alignItems={'end'}
        width={'100%'}
        flexWrap={'wrap'}
        p={2}
        gap={2}
        sx={{
            backgroundColor: mode === 'dark' ? '#1E1E1E' : '#FFFFFF',
        }}
    >
    <Box
        display={'flex'}
        gap={2}
        alignItems={'center'}
        flexGrow={1}
    >
        { children }
    </Box>
    <Box
        display={'flex'}
        gap={2}
        alignItems={'end'}
        flexGrow={1}
    >
        <TextField 
            sx={{
                width: '100%',
            }}
            type="text"
            id="search"
            name="search"
            label={label}
            onChange={(e) => handleSearch(e.target.value)} 
            autoComplete='off'
            variant="standard" />
    </Box>
</Box>
  )
}
