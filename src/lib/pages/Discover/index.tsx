import React from 'react'
import Properties from '../home/components/Properties';
import { Box } from '@chakra-ui/react';
import Discover from './components/Discover';


const index = () => {
  return (
    <Box as="section" w="100%">
      <Discover />
      <Properties />
    </Box>
  );
}

export default index