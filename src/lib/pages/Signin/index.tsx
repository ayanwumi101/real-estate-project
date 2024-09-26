import React from 'react'
import SideImage from './components/SideImage'
import LoginForm from './components/LoginForm'
import { Flex, Box } from '@chakra-ui/react'


const index = () => {
  return (
    <Box as="section">
      <Flex>
        <Box w={['100%', '50%']}>
          <LoginForm />
        </Box>
        <Box display={['none', 'block']} w={['100%', '50%']}>
          <SideImage />
        </Box>
      </Flex>
    </Box>
  );
}

export default index