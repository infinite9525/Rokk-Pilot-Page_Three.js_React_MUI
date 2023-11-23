import React from 'react';
import { Box } from '@mui/material';

type Props = {
  children?: React.ReactNode;
};

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <Box
      component='div'
      sx={{
        height: 1,
        maxHeight: 1,
        maxWidth: 1,
        width: 1,
        bgcolor: '#0d0d0d',
      }}
    >
      {children}
    </Box>
  );
};

export default MainLayout;
