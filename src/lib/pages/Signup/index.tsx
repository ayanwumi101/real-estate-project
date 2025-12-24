import React from 'react';
import SideImage from './components/SideImage';
import SignupForm from './components/SignupForm';
import { Flex, Box } from '@chakra-ui/react';

const index = () => {
  return (
    <Box w="full" as="section">
      <Flex>
        <Box w={['100%', '50%']}>
          <SignupForm />
        </Box>
        <Box display={['none', 'block']} w={['100%', '50%']}>
          <SideImage />
        </Box>
      </Flex>
    </Box>
  );
};

export default index;
