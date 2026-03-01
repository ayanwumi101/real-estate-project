'use client';

import { Stack, Box } from '@chakra-ui/react';
import React, { useEffect, useState, useCallback, Suspense } from 'react';
import NavigationTab from './components/NavigationTab';
import AvailableProperties from './components/AvailableProperties';
import SoldProperties from './components/SoldProperties';
import InstalmentProperties from './components/InstalmentProperties';
import RealtorDashboardLayout from '~/lib/layout/components/RealtorDashboardHeader';
import {
  GetRealtorProperties,
  GetSoldRealtorProperties,
  GetInstalmentRealtorProperties,
} from '~/lib/api/services/propertiesService';
import { useSearchParams } from 'next/navigation';
import { GetCountryStates } from '~/lib/api/services/locationService';

const PropertiesContent = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const tabs = ['available', 'sold', 'instalment'];
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [soldPropertiesLoading, setSoldPropertiesLoading] =
    React.useState<boolean>(false);
  const [instalmentPropertiesLoading, setInstalmentPropertiesLoading] =
    React.useState<boolean>(false);
  const [properties, setProperties] = React.useState([]);
  const [filteredProperties, setFilteredProperties] = React.useState([]);
  const [soldProperties, setSoldProperties] = React.useState<any>();
  const [filteredSoldProperties, setFilteredSoldProperties] = React.useState();
  const [instalmentProperties, setInstalmentProperties] = React.useState<any>();
  const [filteredInstalmentProperties, setFilteredInstalmentProperties] =
    React.useState();
  const [activeTab, setActiveTab] = React.useState<
    'available' | 'sold' | 'instalment'
  >('available');
  const [soldPropertiesHandoverStatus, setSoldPropertiesHandoverStatus] =
    useState<string>('');
  const [soldPropertiesAllocationStatus, setSoldPropertiesAllocationStatus] =
    useState<string>('');
  const [
    soldPropertiesDocumentationStatus,
    setSoldPropertiesDocumentationStatus,
  ] = useState<string>('');
  const [soldPropertiesLocation, setSoldPropertiesLocation] =
    useState<string>('');
  const [
    instalmentPropertiesHandoverStatus,
    setInstalmentPropertiesHandoverStatus,
  ] = useState<string>('');
  const [
    instalmentPropertiesAllocationStatus,
    setInstalmentPropertiesAllocationStatus,
  ] = useState<string>('');
  const [
    instalmentPropertiesDocumentationStatus,
    setInstalmentPropertiesDocumentationStatus,
  ] = useState<string>('');
  const [instalmentPropertiesLocation, setInstalmentPropertiesLocation] =
    useState<string>('');
  const [states, setStates] = useState<
    {
      id: string;
      name: string;
      state_code: string;
      latitude: string;
      longitude: string;
      type: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const availableProperties = await GetRealtorProperties();
        setProperties(availableProperties?.data?.items || []);
        setFilteredProperties(availableProperties?.data?.items || []);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      setSoldPropertiesLoading(true);
      try {
        const soldPropertiesData = await GetSoldRealtorProperties({
          location: soldPropertiesLocation,
          handover_status: soldPropertiesHandoverStatus,
          allocation_status: soldPropertiesAllocationStatus,
          documentation_status: soldPropertiesDocumentationStatus,
        });
        setSoldProperties(soldPropertiesData?.data || []);
        setFilteredSoldProperties(soldPropertiesData?.data || []);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setSoldPropertiesLoading(false);
      }
    };
    fetchProperties();
  }, [
    soldPropertiesLocation,
    soldPropertiesHandoverStatus,
    soldPropertiesAllocationStatus,
    soldPropertiesDocumentationStatus,
  ]);

  useEffect(() => {
    const fetchProperties = async () => {
      setInstalmentPropertiesLoading(true);
      try {
        const instalmentPropertiesData = await GetInstalmentRealtorProperties({
          location: instalmentPropertiesLocation,
          handover_status: instalmentPropertiesHandoverStatus,
          allocation_status: instalmentPropertiesAllocationStatus,
          documentation_status: instalmentPropertiesDocumentationStatus,
        });
        setInstalmentProperties(instalmentPropertiesData?.data || []);
        setFilteredInstalmentProperties(instalmentPropertiesData?.data || []);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setInstalmentPropertiesLoading(false);
      }
    };
    fetchProperties();
  }, [
    instalmentPropertiesLocation,
    instalmentPropertiesHandoverStatus,
    instalmentPropertiesAllocationStatus,
    instalmentPropertiesDocumentationStatus,
  ]);

  useEffect(() => {
    const getCountryStates = async () => {
      try {
        const response = await GetCountryStates(
          'da4e88a4-4c55-4724-8727-098b50731b96'
        );
        setStates(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCountryStates();
  }, []);

  // const SearchProperties = useCallback(() => {
  //   if (searchQuery === '') {
  //     if (activeTab === 'available') {
  //       setFilteredProperties(properties);
  //     }
  //     return;
  //   }
  //   const searchLower = searchQuery.toLowerCase();
  //   if (activeTab === 'available') {
  //     const filtered = properties.filter((property: any) =>
  //       property?.property_name?.toLowerCase().includes(searchLower)
  //     );
  //     setFilteredProperties(filtered);
  //   }
  // }, [searchQuery, activeTab, properties]);

  // useEffect(() => {
  //   SearchProperties();
  // }, [searchQuery, SearchProperties]);

  useEffect(() => {
    if (tab && tabs.includes(tab as string)) {
      setActiveTab(tab as 'available' | 'sold' | 'instalment');
    } else {
      setActiveTab('available');
    }
  }, [tab, tabs]);

  return (
    <RealtorDashboardLayout title="Properties">
      <Stack spacing="30px" px={['10px', 0]}>
        <NavigationTab
          tabs={tabs}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setActiveTab={setActiveTab}
          // searchProperties={SearchProperties}
          activeTab={activeTab}
          availableCount={properties.length}
          soldCount={soldProperties?.items?.length || 0}
          instalmentCount={instalmentProperties?.items?.length || 0}
        />
        <Box>
          {activeTab === 'available' && (
            <AvailableProperties
              loading={loading}
              properties={filteredProperties}
            />
          )}
          {activeTab === 'sold' && (
            <SoldProperties
              states={states}
              loading={soldPropertiesLoading}
              properties={soldProperties}
              filteredProperties={filteredSoldProperties}
              location={soldPropertiesLocation}
              allocationStatus={soldPropertiesAllocationStatus}
              handoverStatus={soldPropertiesHandoverStatus}
              documentationStatus={soldPropertiesDocumentationStatus}
              setLocation={setSoldPropertiesLocation}
              setProperties={setSoldProperties}
              setFilteredProperties={setFilteredProperties}
              setAllocationStatus={setSoldPropertiesAllocationStatus}
              setHandoverStatus={setSoldPropertiesHandoverStatus}
              setDocumentationStatus={setSoldPropertiesDocumentationStatus}
            />
          )}
          {activeTab === 'instalment' && (
            <InstalmentProperties
              states={states}
              loading={instalmentPropertiesLoading}
              properties={instalmentProperties}
              filteredProperties={filteredInstalmentProperties}
              location={instalmentPropertiesLocation}
              allocationStatus={instalmentPropertiesAllocationStatus}
              handoverStatus={instalmentPropertiesHandoverStatus}
              documentationStatus={instalmentPropertiesDocumentationStatus}
              setLocation={setInstalmentPropertiesLocation}
              setProperties={setInstalmentProperties}
              setFilteredProperties={setFilteredInstalmentProperties}
              setAllocationStatus={setInstalmentPropertiesAllocationStatus}
              setHandoverStatus={setInstalmentPropertiesHandoverStatus}
              setDocumentationStatus={
                setInstalmentPropertiesDocumentationStatus
              }
            />
          )}
        </Box>
      </Stack>
    </RealtorDashboardLayout>
  );
};

const Index = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PropertiesContent />
    </Suspense>
  );
};

export default Index;
