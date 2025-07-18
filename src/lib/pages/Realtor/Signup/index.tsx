import { Box, Flex } from '@chakra-ui/react';
import React from 'react'
import Signup from '~/lib/pages/Realtor/Signup'
import SideImage from './components/SideImage';


const index = () => {
  return (
    <Box as="section">
      <Flex>
        <Box w={['100%', '50%']}>
          <Signup />
        </Box>
        <Box display={['none', 'block']} w={['100%', '50%']}>
          <SideImage />
        </Box>
      </Flex>
    </Box>
  );
}

export default index