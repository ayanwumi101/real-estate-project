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
import {
  GetClientDetails,
  GetClientTransactions,
  GetClientAnalytics,
} from '~/lib/api/services/clientsService';
import { useParams } from 'next/navigation';

const index = () => {
  const { id } = useParams();
  const tabs = ['assets', 'transactions', 'securities', 'analytics'];
  const [activeTab, setActiveTab] = React.useState<
    'assets' | 'transactions' | 'securities' | 'analytics'
  >('assets');
  const [clientDetails, setClientDetails] = React.useState<any>({} as any);
  const [clientTransactions, setClientTransactions] = React.useState<any>([]);
  const [clientAnalytics, setClientAnalytics] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const GetClientProfileDetails = async () => {
    try {
      setLoading(true);
      const [
        clientDetailsResponse,
        clientTransactionsResponse,
        clientAnalyticsResponse,
      ] = await Promise.all([
        GetClientDetails(id),
        GetClientTransactions(id),
        GetClientAnalytics(id),
      ]);
      setClientDetails(clientDetailsResponse?.data);
      setClientTransactions(clientTransactionsResponse?.data);
      setClientAnalytics(clientAnalyticsResponse?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    GetClientProfileDetails();
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
          assetsCount={clientDetails?.assets?.length || 0}
          transactionsCount={clientTransactions?.transactions?.length || 0}
        />
        <Box>
          {activeTab === 'assets' && (
            <AssetsList loading={loading} assets={clientDetails?.assets} />
          )}
          {activeTab === 'transactions' && (
            <TransactionsList
              loading={loading}
              transactions={clientTransactions?.transactions}
            />
          )}
          {activeTab === 'securities' && <Securities />}
          {activeTab === 'analytics' && (
            <Analytics loading={loading} analytics={clientAnalytics} />
          )}
        </Box>
      </Stack>
    </RealtorDashboardLayout>
  );
};

export default index;
