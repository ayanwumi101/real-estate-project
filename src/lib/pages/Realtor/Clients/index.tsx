'use client';

import { Stack, useStatStyles } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import RealtorDashboardLayout from '~/lib/layout/components/RealtorDashboardHeader';
import NavigationTab from './components/NavigationTab';
import ClientsList from './components/ClientsList';
import { GetRealtorClients } from '~/lib/api/services/clientsService';

const index = () => {
  const [loading, setLoading] = React.useState(false);
  const [clients, setClients] = React.useState<any>([]);
  const [filteredClients, setFilteredClients] = React.useState<any>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  React.useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        const data = await GetRealtorClients();
        setClients(data?.data || []);
        setFilteredClients(data?.data || []);
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  useEffect(() => {
    if (searchQuery !== '') {
      const filtered = clients.filter((client: any) => {
        return (
          client?.firstname
            ?.toLowerCase()
            ?.includes(searchQuery?.toLowerCase()) ||
          client?.lastname
            ?.toLowerCase()
            .includes(searchQuery?.toLowerCase()) ||
          client?.email?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
          client?.phone?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
          client?.address?.toLowerCase().includes(searchQuery?.toLowerCase())
        );
      });
      setFilteredClients(filtered);
    } else {
      setFilteredClients(clients);
    }
  }, [searchQuery]);
  return (
    <RealtorDashboardLayout title="Clients">
      <Stack spacing="30px" px={['10px', 0]}>
        <NavigationTab
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <ClientsList loading={loading} clients={filteredClients} />
      </Stack>
    </RealtorDashboardLayout>
  );
};

export default index;
