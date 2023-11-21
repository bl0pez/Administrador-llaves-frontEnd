import { FC } from 'react';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


import { transformDate } from '@/common/helpers';
import { Box, Typography } from '@mui/material';
type DateTransformedProps = {
    date: Date,
}

export const DateTransformed:FC<DateTransformedProps> = ({ date }) => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box
        display='flex'
        alignItems='center'
        justifyItems='center'
        gap={0.5}
        >
          <CalendarMonthIcon />
          <Typography variant="body2" color="text.secondary">
            {transformDate(date).dateTransformed}
          </Typography>
        </Box>
        <Box
          display='flex'
          alignItems='center'
          justifyItems='center'
          gap={0.5}
        >
          <AccessTimeIcon/>
          <Typography 
            display="inline-block"
            variant="body2" 
            color="text.secondary">
            { transformDate(date).timeTransformed}
          </Typography>
        </Box>
      </Box>

  )
}
