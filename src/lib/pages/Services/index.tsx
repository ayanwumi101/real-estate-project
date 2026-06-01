'use client'

import React from 'react';
import Hero from './components/Hero';
import OurServices from './components/OurServices';
import Services from './components/Services';
import { Box, Stack, Flex } from '@chakra-ui/react';

const index = () => {
  return (
    <Box py="80px">
      <Stack spacing="60px">
        <Hero />
        <Flex alignItems="flex-start" gap="40px" maxW="1200px" mx="auto" flexWrap={['wrap', 'nowrap']}>
          <OurServices />
          <Services />
        </Flex>
      </Stack>
    </Box>
  );
};

export default index;
