'use client';

import { Box, Flex, Text, Button } from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const NavigationTab = ({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: string[];
  activeTab: string;
  setActiveTab: (
    value: 'Profile' | 'Next of Kins' | 'Notifications' | 'Privacy' | 'Security'
  ) => void;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Box py="35px" px={['15px', '40px']} w="full" overflow="auto">
      <Flex borderBottom="1px solid #E4E4E4" w="full" overflow="auto" pb="2">
        {tabs.map((tab, index) => (
          <Box>
            <Button
              bg={tab === activeTab ? '#EDEDFF' : 'none'}
              borderRadius={tab === activeTab ? '50px' : '0px'}
              color={tab === activeTab ? 'brand.100' : '#8295AA'}
              px="20px"
              py="16px"
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set('tab', tab);
                router.replace(`?${params.toString()}`, { scroll: false });
              }}
              fontSize={14}
              key={index}
              fontWeight={tab === activeTab ? 600 : 500}
              _hover={{ bg: 'none' }}
            >
              {tab}
            </Button>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default NavigationTab;
