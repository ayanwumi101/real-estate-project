'use client';

import React, { useState } from 'react';
import Hero from './components/Hero';
import OurServices from './components/OurServices';
import Services from './components/Services';
import { Box, Stack, Flex } from '@chakra-ui/react';

const index = () => {
  const [activeService, setActiveService] = useState<string>('risk-assessment');
  
  return (
    <Box py="80px" position="relative">
      <Stack spacing="60px">
        <Hero />
        <Flex
          alignItems="flex-start"
          gap="40px"
          maxW="1200px"
          mx="auto"
          flexWrap={['wrap', 'nowrap']}
        >
          <OurServices activeService={activeService} />
          <Services onActiveChange={setActiveService} />
        </Flex>
      </Stack>
    </Box>
  );
};

export default index;
