import React from 'react';
import SideImage from './components/SideImage';
import VerifyEmail from './components/VerifyEmail';
import { Flex, Box } from '@chakra-ui/react';

const index = () => {
  return (
    <Box w="full" as="section">
      <Flex>
        <Box w={['100%', '50%']}>
          <VerifyEmail />
        </Box>
        <Box display={['none', 'block']} w={['100%', '50%']}>
          <SideImage />
        </Box>
      </Flex>
    </Box>
  );
};

export default index;
