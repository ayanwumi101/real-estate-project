'use client';

import { Stack, Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
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

const index = () => {
  const tabs = ['available', 'sold', 'instalment'];
  const [properties, setProperties] = React.useState([]);
  const [soldProperties, setSoldProperties] = React.useState<any>([]);
  const [instalmentProperties, setInstalmentProperties] = React.useState<any>(
    []
  );
  const [activeTab, setActiveTab] = React.useState<
    'available' | 'sold' | 'instalment'
  >('available');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const [availableProperties, soldProperties, instalmentProperties] =
          await Promise.all([
            GetRealtorProperties(),
            GetSoldRealtorProperties(),
            GetInstalmentRealtorProperties(),
          ]);
        setProperties(availableProperties?.data || []);
        setSoldProperties(soldProperties || []);
        setInstalmentProperties(instalmentProperties || []);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchProperties();
  }, []);

  return (
    <RealtorDashboardLayout title="Properties">
      <Stack spacing="30px" px={['20px', 0]}>
        <NavigationTab
          tabs={tabs}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          availableCount={properties.length}
          soldCount={soldProperties?.payments?.length}
          instalmentCount={instalmentProperties?.data?.length}
        />
        <Box>
          {activeTab === 'available' && (
            <AvailableProperties properties={properties} />
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
