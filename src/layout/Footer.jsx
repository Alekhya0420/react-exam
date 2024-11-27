import React from 'react';
import { Box, Typography } from '@mui/material';

const Footr = () => {
  return (
    <Box sx={{backgroundColor:'red',color:'white',py: 2,textAlign:'center'}}>
      <Typography variant="body2">© 2024 Your E-commerce Store. All Rights Reserved.</Typography>
    </Box>
  );
};

export default Footr;
