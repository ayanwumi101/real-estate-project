import { Box, Flex } from '@chakra-ui/react';
import React from 'react'
import SideImage from '../Signin/components/SideImage';
import ForgotPasswordForm from './ForgotPasswordForm';


const index = () => {
  return (
    <Box as="section" w='100%' h={['auto','100vh']}>
      <Flex alignItems='center' justifyContent='center' h='100%'>
        <Box w={['100%', '50%']} h='100%'>
          <ForgotPasswordForm />
        </Box>
        <Box display={['none', 'block']} w={['100%', '50%']} h='100%'>
          <SideImage />
        </Box>
      </Flex>
    </Box>
  );
}

export default index