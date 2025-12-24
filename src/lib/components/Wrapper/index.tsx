import { Box } from '@chakra-ui/react';
import React from 'react';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box maxW="1440px" mx="auto">
      {children}
    </Box>
  );
};

export default Wrapper;
