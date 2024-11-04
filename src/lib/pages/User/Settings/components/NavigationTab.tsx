'use client'

import { Box, Flex, Text, Button } from '@chakra-ui/react'
import React from 'react'


const NavigationTab = ({tabs, activeTab, setActiveTab}:{tabs: string[], activeTab: string, setActiveTab: (value: string) => void}) => {
  
  return (
    <Box py='35px' px='40px'>
      <Flex borderBottom="1px solid #E4E4E4">
        {tabs.map((tab, index) => (
          <Button
            bg={tab === activeTab ? '#F5F5F5' : 'none'}
            borderRadius="0px"
            borderX={tab === activeTab ? '1px solid #E4E4E4' : 'none'}
            borderTop={tab === activeTab ? '1px solid #E4E4E4' : 'none'}
            color={tab === activeTab ? '#4040A0' : '#8295AA'}
            h="55px"
            px="7"
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </Flex>
    </Box>
  );
}

export default NavigationTab