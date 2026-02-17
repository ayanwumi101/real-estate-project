'use client';

import { Flex, Text, Stack, Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
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
import Link from 'next/link';
import { PropertyFilterWithLocation } from '~/lib/components/PropertyFilter';

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
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Additional filter states for PropertyFilter component
  const [salesType, setSalesType] = useState<string>('');
  const [handoverStatus, setHandoverStatus] = useState<string>('');
  const [allocationStatus, setAllocationStatus] = useState<string>('');
  const [documentationStatus, setDocumentationStatus] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [locations, setLocations] = useState<string[]>([]);

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

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const propertySearchFilter = clientDetails?.assets?.filter(
      (property: any) => {
        return property?.property_name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());
      }
    );
    setFilteredProperties(propertySearchFilter);
  }, [searchQuery]);

  // Handle filter changes
  const handleSalesTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSalesType(e.target.value);
  };

  useEffect(() => {
    if (salesType === 'all') {
      setFilteredProperties(clientDetails?.assets);
      return;
    }
    const filteredProperties = clientDetails?.assets?.filter(
      (property: any) => {
        return property?.status === salesType;
      }
    );
    setFilteredProperties(filteredProperties);
  }, [salesType]);

  const handleHandoverStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setHandoverStatus(e.target.value);
  };

  useEffect(() => {
    if (handoverStatus === 'all') {
      setFilteredProperties(clientDetails?.assets);
      return;
    }
    const filteredProperties = clientDetails?.assets?.filter(
      (property: any) => {
        return property?.handover_status === handoverStatus;
      }
    );
    setFilteredProperties(filteredProperties);
  }, [handoverStatus]);

  const handleAllocationStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAllocationStatus(e.target.value);
  };

  useEffect(() => {
    if (allocationStatus === 'all') {
      setFilteredProperties(clientDetails?.assets);
      return;
    }
    const filteredProperties = clientDetails?.assets?.filter(
      (property: any) => {
        return property?.allocation_status === allocationStatus;
      }
    );
    setFilteredProperties(filteredProperties);
  }, [allocationStatus]);

  const handleDocumentationStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDocumentationStatus(e.target.value);
  };

  useEffect(() => {
    if (documentationStatus === 'all') {
      setFilteredProperties(clientDetails?.assets);
      return;
    }
    const filteredProperties = clientDetails?.assets?.filter(
      (property: any) => {
        return property?.documentation_status === documentationStatus;
      }
    );
    setFilteredProperties(filteredProperties);
  }, [documentationStatus]);

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.target.value);
  };

  useEffect(() => {
    if (location === 'all') {
      setFilteredProperties(clientDetails?.assets);
      return;
    }
    const filteredProperties = clientDetails?.assets?.filter(
      (property: any) => {
        return property?.property_address === location;
      }
    );
    setFilteredProperties(filteredProperties);
  }, [location]);

  useEffect(() => {
    setFilteredProperties(clientDetails?.assets);
    setLocations(
      clientDetails?.assets?.map((property: any) => property?.property_address)
    );
  }, [clientDetails]);

  return (
    <RealtorDashboardLayout
      title={
        <Link style={{ padding: 0, margin: 0 }} href="/realtor/clients">
          <Flex alignItems="center" gap="8px">
            <Text fontSize={16} fontWeight={600} color="brand.400">
              Clients
            </Text>
            <BsChevronRight size={15} fontWeight={900} />
            <Text fontSize={16} fontWeight={600} color="brand.800">
              {`${clientDetails?.client?.firstname} ${clientDetails?.client?.lastname}`}
            </Text>
          </Flex>
        </Link>
      }
    >
      <Stack spacing="20px" px={['16px', '0']}>
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
            <PropertyFilterWithLocation
              searchQuery={searchQuery}
              handleSearchChange={handleSearchChange}
              salesType={salesType}
              handleSalesTypeChange={handleSalesTypeChange}
              handoverStatus={handoverStatus}
              handleHandoverStatusChange={handleHandoverStatusChange}
              allocationStatus={allocationStatus}
              handleAllocationStatusChange={handleAllocationStatusChange}
              documentationStatus={documentationStatus}
              handleDocumentationStatusChange={handleDocumentationStatusChange}
              location={location}
              handleLocationChange={handleLocationChange}
              locations={locations}
            />
          )}
          {activeTab === 'assets' && (
            <AssetsList loading={loading} assets={filteredProperties} />
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
