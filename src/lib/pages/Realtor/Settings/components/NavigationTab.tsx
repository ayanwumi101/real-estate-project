'use client';

import { Box, Flex, Text, Button } from '@chakra-ui/react';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const NavigationTab = ({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: string[];
  activeTab: string;
  setActiveTab: (value: string) => void;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Box py="20px" px={['15px', '15px']} w="full" overflow="auto">
      <Flex
        borderBottom="1px solid #E4E4E4"
        w="full"
        overflow="auto"
        pb="2"
        gap="6px"
      >
        {tabs.map((tab, index) => (
          <Box>
            <Button
              bg={tab === activeTab ? '#EDEDFF' : 'none'}
              borderRadius="50px"
              color={tab === activeTab ? 'brand.100' : '#8295AA'}
              px="16px"
              py="10px"
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set('tab', tab);
                router.replace(`?${params.toString()}`, { scroll: false });
              }}
              fontSize={14}
              key={index}
              fontWeight={tab === activeTab ? 600 : 500}
              _hover={{ bg: '#EDEDFF' }}
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
