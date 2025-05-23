'use client';

import React from 'react';
import NavigationTab from './components/NavigationTab';
import { Box, Stack, Button, Heading, Flex, Text, Input, InputLeftElement, InputGroup, Select } from '@chakra-ui/react';
import { LocationIcon } from '~/lib/components/Icons/Icons';
import CompletedPayments from './components/CompletedPayments';
import PendingPayments from './components/PendingPayments';

const index = () => {
  const tabs = ['pending payments', 'completed payments'];
  const [activeTab, setActiveTab] = React.useState<string>('pending payments');
  return (
    <Box py="30px" px="40px">
      <Stack spacing="40px">
        {' '}
        <Box>
          <Stack spacing="15px">
            <Heading fontWeight={500} fontSize={24}>
              Skyline Residences
            </Heading>
            <Flex alignItems="center" gap="10px">
              <LocationIcon />
              <Text fontWeight={500}>
                Plot 10, Adewunmi Layout, Iju Ishaga, Lagos
              </Text>
            </Flex>
          </Stack>
        </Box>
        <NavigationTab
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          assetType="instalment"
          totalAmountReceived={1500000}
        />
        <Box>
          <Stack spacing="24px">
            {/* Search and filter section */}
            <Flex></Flex>
            {/* Payment list section */}
            <Box>
              {activeTab === 'pending payments' ? (
                <PendingPayments />
              ) : (
                <CompletedPayments />
              )}
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default index;
