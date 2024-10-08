import { Box, Flex } from '@chakra-ui/react';
import React from 'react'
import ResetPassword from './ResetPassword';
import SideImage from '../Signin/components/SideImage';


const index = () => {
  return (
    <Box as="section" w="100%" h={['auto', '100vh']}>
      <Flex>
        <Box w={['100%', '50%']}>
          <ResetPassword />
        </Box>
        <Box display={['none', 'block']} w={['100%', '50%']}>
          <SideImage />
        </Box>
      </Flex>
    </Box>
  );
}

export default index