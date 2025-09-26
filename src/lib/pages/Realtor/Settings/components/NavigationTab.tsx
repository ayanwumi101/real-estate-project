'use client'

import { Box, Flex, Text, Button } from '@chakra-ui/react'
import React from 'react'


const NavigationTab = ({tabs, activeTab, setActiveTab}:{tabs: string[], activeTab: string, setActiveTab: (value: string) => void}) => {
  
  return (
    <Box py="20px" px={['15px', '40px']} w="full" overflow="auto">
      <Flex borderBottom="1px solid #E4E4E4" w="full" overflow="auto" pb="2">
        {tabs.map((tab, index) => (
          <Box>
            <Button
              bg={tab === activeTab ? '#EDEDFF' : 'none'}
              borderRadius={tab === activeTab ? '50px' : '0px'}
              color={tab === activeTab ? 'brand.100' : '#8295AA'}
              px="20px"
              py="16px"
              onClick={() => setActiveTab(tab)}
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
}

export default NavigationTab