'use client'

import { Flex, Text, Stack, Box } from '@chakra-ui/react';
import React from 'react';
import { BsChevronRight } from 'react-icons/bs';
import RealtorDashboardLayout from '~/lib/layout/components/RealtorDashboardHeader';
import ClientDetailsHeader from './components/ClientDetailsHeader';
import NavigationTab from './components/NavigationTab';
import AssetsList from './components/AssetsList';
import TransactionsList from './components/TransactionsList';
import Securities from './components/Securities';
import Analytics from './components/Analytics';

const index = () => {
  const tabs = ['assets', 'transactions', 'securities', 'analytics'];
  const [activeTab, setActiveTab] = React.useState<
    'assets' | 'transactions' | 'securities' | 'analytics'
  >('assets');
  return (
    <RealtorDashboardLayout
      title={
        <Flex alignItems="center" gap="8px">
          <Text fontSize={16} fontWeight={600} color="brand.400">
            Clients
          </Text>
          <BsChevronRight size={15} fontWeight={900} />
          <Text fontSize={16} fontWeight={600} color="brand.800">
            james Brown
          </Text>
        </Flex>
      }
    >
      <Stack spacing="20px">
        <ClientDetailsHeader />
        <NavigationTab
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <Box>
          {activeTab === 'assets' && <AssetsList />}
          {activeTab === 'transactions' && <TransactionsList />}
          {activeTab === 'securities' && <Securities />}
          {activeTab === 'analytics' && <Analytics />}
        </Box>
      </Stack>
    </RealtorDashboardLayout>
  );
};

export default index;
