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

const PropertiesContent = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const tabs = ['available', 'sold', 'instalment'];
  const [loading, setLoading] = React.useState<boolean>(false);
  const [properties, setProperties] = React.useState([]);
  const [filteredProperties, setFilteredProperties] = React.useState([]);
  const [activeTab, setActiveTab] = React.useState<
    'available' | 'sold' | 'instalment'
  >('available');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [soldPropertiesCount, setSoldPropertiesCount] = useState<number>(0);
  const [instalmentPropertiesCount, setInstalmentPropertiesCount] =
    useState<number>(0);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const [availableProperties] = await Promise.all([
          GetRealtorProperties(),
        ]);
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

  const SearchProperties = useCallback(() => {
    if (searchQuery === '') {
      if (activeTab === 'available') {
        setFilteredProperties(properties);
      }
      return;
    }
    const searchLower = searchQuery.toLowerCase();
    if (activeTab === 'available') {
      const filtered = properties.filter((property: any) =>
        property?.property_name?.toLowerCase().includes(searchLower)
      );
      setFilteredProperties(filtered);
    }
  }, [searchQuery, activeTab, properties]);

  useEffect(() => {
    SearchProperties();
  }, [searchQuery, SearchProperties]);

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
          searchProperties={SearchProperties}
          activeTab={activeTab}
          availableCount={properties.length}
          soldCount={soldPropertiesCount}
          instalmentCount={instalmentPropertiesCount}
        />
        <Box>
          {activeTab === 'available' && (
            <AvailableProperties
              loading={loading}
              properties={filteredProperties}
            />
          )}
          {activeTab === 'sold' && (
            <SoldProperties setSoldPropertiesCount={setSoldPropertiesCount} />
          )}
          {activeTab === 'instalment' && (
            <InstalmentProperties
              setInstalmentPropertiesCount={setInstalmentPropertiesCount}
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
