'use client';

import { Stack, Box } from '@chakra-ui/react';
import React, { useEffect, useState, useCallback } from 'react';
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
  const [filteredProperties, setFilteredProperties] = React.useState([]);
  const [soldProperties, setSoldProperties] = React.useState<any>([]);
  const [filteredSoldProperties, setFilteredSoldProperties] =
    React.useState<any>([]);
  const [instalmentProperties, setInstalmentProperties] = React.useState<any>(
    []
  );
  const [filteredInstalmentProperties, setFilteredInstalmentProperties] =
    useState<any>([]);
  const [activeTab, setActiveTab] = React.useState<
    'available' | 'sold' | 'instalment'
  >('available');
  const [searchQuery, setSearchQuery] = React.useState<string>('');

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
        setFilteredProperties(availableProperties?.data || []);
        setSoldProperties(soldProperties || []);
        setFilteredSoldProperties(soldProperties || []);
        setInstalmentProperties(instalmentProperties || []);
        setFilteredInstalmentProperties(instalmentProperties || []);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchProperties();
  }, []);

  const SearchProperties = useCallback(() => {
    if (searchQuery === '') {
      if (activeTab === 'available') {
        setFilteredProperties(properties);
      } else if (activeTab === 'sold') {
        setFilteredSoldProperties(soldProperties);
      } else {
        setFilteredInstalmentProperties(instalmentProperties);
      }
      return;
    }
    const searchLower = searchQuery.toLowerCase();
    if (activeTab === 'available') {
      const filtered = properties.filter((property: any) =>
        property?.property_name?.toLowerCase().includes(searchLower)
      );
      setFilteredProperties(filtered);
    } else if (activeTab === 'sold') {
      const filtered = soldProperties?.payments?.filter((property: any) =>
        property?.property_name?.toLowerCase().includes(searchLower)
      );
      setFilteredSoldProperties(filtered);
    } else {
      const filtered = instalmentProperties?.data?.instalment_properties?.filter(
        (property: any) =>
          property?.property_name?.toLowerCase().includes(searchLower)
      );
      setFilteredInstalmentProperties(filtered);
    }
  }, [
    searchQuery,
    activeTab,
    properties,
    soldProperties,
    instalmentProperties,
  ]);

  useEffect(() => {
    SearchProperties();
  }, [searchQuery, SearchProperties]);

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
          soldCount={soldProperties?.payments?.length}
          instalmentCount={
            instalmentProperties?.data?.total_instalment_property
          }
        />
        <Box>
          {activeTab === 'available' && (
            <AvailableProperties properties={filteredProperties} />
          )}
          {activeTab === 'sold' && (
            <SoldProperties properties={filteredSoldProperties} />
          )}
          {activeTab === 'instalment' && (
            <InstalmentProperties properties={filteredInstalmentProperties} />
          )}
        </Box>
      </Stack>
    </RealtorDashboardLayout>
  );
};

export default index;
