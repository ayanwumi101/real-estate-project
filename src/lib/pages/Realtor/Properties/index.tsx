'use client';

import { Stack, Box } from '@chakra-ui/react';
import React from 'react';
import NavigationTab from './components/NavigationTab';
import AvailableProperties from './components/AvailableProperties';
import SoldProperties from './components/SoldProperties';
import InstalmentProperties from './components/InstalmentProperties';
import RealtorDashboardLayout from '~/lib/layout/components/RealtorDashboardHeader';

const index = () => {
  const tabs = ['available', 'sold', 'instalment'];
  const [activeTab, setActiveTab] = React.useState<
    'available' | 'sold' | 'instalment'
  >('available');
  return (
    <RealtorDashboardLayout title="Properties">
      <Stack spacing="30px">
        <NavigationTab
          tabs={tabs}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
        <Box>
          {activeTab === 'available' && <AvailableProperties />}
          {activeTab === 'sold' && <SoldProperties />}
          {activeTab === 'instalment' && <InstalmentProperties />}
        </Box>
      </Stack>
    </RealtorDashboardLayout>
  );
};

export default index;
