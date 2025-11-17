'use client';

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
import { GetClientDetails } from '~/lib/api/services/clientsService';
import { useParams } from 'next/navigation';

const index = () => {
  const { id } = useParams();
  const tabs = ['assets', 'transactions', 'securities', 'analytics'];
  const [activeTab, setActiveTab] = React.useState<
    'assets' | 'transactions' | 'securities' | 'analytics'
  >('assets');
  const [clientDetails, setClientDetails] = React.useState<any>({} as any);

  const getClientDetails = async () => {
    try {
      const response = await GetClientDetails(id);
      setClientDetails(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getClientDetails();
  }, [id]);

  return (
    <RealtorDashboardLayout
      title={
        <Flex alignItems="center" gap="8px">
          <Text fontSize={16} fontWeight={600} color="brand.400">
            Clients
          </Text>
          <BsChevronRight size={15} fontWeight={900} />
          <Text fontSize={16} fontWeight={600} color="brand.800">
            {`${clientDetails?.client?.firstname} ${clientDetails?.client?.lastname}`}
          </Text>
        </Flex>
      }
    >
      <Stack spacing="20px">
        <ClientDetailsHeader client={clientDetails?.client} />
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
