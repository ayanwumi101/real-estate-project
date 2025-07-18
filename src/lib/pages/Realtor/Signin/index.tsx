import React from 'react'
import Signin from './components/Signin'
import SideImage from './components/SideImage'
import { Box, Flex } from '@chakra-ui/react'


const index = () => {
  return (
    <Box as="section">
      <Flex>
        <Box w={['100%', '50%']}>
          <Signin />
        </Box>
        <Box display={['none', 'block']} w={['100%', '50%']}>
          <SideImage />
        </Box>
      </Flex>
    </Box>
  );
}

export default index