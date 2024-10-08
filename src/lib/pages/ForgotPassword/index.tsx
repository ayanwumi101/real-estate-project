import { Box, Flex } from '@chakra-ui/react';
import React from 'react'
import SideImage from '../Signin/components/SideImage';
import ForgotPasswordForm from './ForgotPasswordForm';


const index = () => {
  return (
    <Box as="section" w='100%' h='100vh'>
      <Flex>
        <Box w={['100%', '50%']}>
          <ForgotPasswordForm />
        </Box>
        <Box display={['none', 'block']} w={['100%', '50%']}>
          <SideImage />
        </Box>
      </Flex>
    </Box>
  );
}

export default index