'use client';

import { Stack, Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import NavigationTab from './components/NavigationTab';
import AvailableProperties from './components/AvailableProperties';
import SoldProperties from './components/SoldProperties';
import InstalmentProperties from './components/InstalmentProperties';
import RealtorDashboardLayout from '~/lib/layout/components/RealtorDashboardHeader';
import { GetRealtorProperties } from '~/lib/api/services/propertiesService';

const index = () => {
  const tabs = ['available', 'sold', 'instalment'];
  const [properties, setProperties] = React.useState([]);
  const [activeTab, setActiveTab] = React.useState<
    'available' | 'sold' | 'instalment'
  >('available');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await GetRealtorProperties();
        setProperties(data?.data || []);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  const availableProperties = properties?.filter(
    (property: any) => property.status === 'available'
  );
  const soldProperties = properties?.filter(
    (property: any) => property.status === 'sold'
  );
  const instalmentProperties = properties?.filter(
    (property: any) => property.status === 'instalment'
  );

  return (
    <RealtorDashboardLayout title="Properties">
      <Stack spacing="30px">
        <NavigationTab
          tabs={tabs}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          availableCount={availableProperties.length}
          soldCount={soldProperties.length}
          instalmentCount={instalmentProperties.length}
        />
        <Box>
          {activeTab === 'available' && (
            <AvailableProperties properties={availableProperties} />
          )}
          {activeTab === 'sold' && (
            <SoldProperties properties={soldProperties} />
          )}
          {activeTab === 'instalment' && (
            <InstalmentProperties properties={instalmentProperties} />
          )}
        </Box>
      </Stack>
    </RealtorDashboardLayout>
  );
};

export default index;
