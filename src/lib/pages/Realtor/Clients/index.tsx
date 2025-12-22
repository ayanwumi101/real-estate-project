'use client';

import { Stack } from '@chakra-ui/react';
import React from 'react';
import RealtorDashboardLayout from '~/lib/layout/components/RealtorDashboardHeader';
import NavigationTab from './components/NavigationTab';
import ClientsList from './components/ClientsList';
import { GetRealtorClients } from '~/lib/api/services/clientsService';

const index = () => {
  const [loading, setLoading] = React.useState(false);
  const [clients, setClients] = React.useState([]);

  React.useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        const data = await GetRealtorClients();
        setClients(data?.data || []);
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);
  return (
    <RealtorDashboardLayout title="Clients">
      <Stack spacing="30px" px={['10px', 0]}>
        <NavigationTab />
        <ClientsList loading={loading} clients={clients} />
      </Stack>
    </RealtorDashboardLayout>
  );
};

export default index;
