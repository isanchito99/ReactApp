import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const LoadingScreen = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Box textAlign="center">
        <CircularProgress color="primary" size={80} thickness={4} />
        <Typography variant="h5" color="textSecondary" mt={2}>
          Cargando...
        </Typography>
      </Box>
    </Box>
  );
};

export default LoadingScreen;
