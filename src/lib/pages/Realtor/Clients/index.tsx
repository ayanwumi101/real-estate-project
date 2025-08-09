'use client'

import { Stack } from '@chakra-ui/react';
import React from 'react'
import RealtorDashboardLayout from '~/lib/layout/components/RealtorDashboardHeader'
import NavigationTab from './components/NavigationTab';
import ClientsList from './components/ClientsList';



const index = () => {
  return (
    <RealtorDashboardLayout title="Clients">
      <Stack spacing="30px">
        <NavigationTab />
        <ClientsList />
      </Stack>
    </RealtorDashboardLayout>
  );
}

export default index