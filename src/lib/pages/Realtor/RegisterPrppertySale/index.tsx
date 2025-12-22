'use client';

import { Text, Flex } from '@chakra-ui/react';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { BsChevronRight } from 'react-icons/bs';
import RealtorDashboardLayout from '~/lib/layout/components/RealtorDashboardHeader';
import FullySoldProperty from './FullySoldProperty';
import InstalmentPaymentProperty from './InstalmentPaymentProperty';
import { GetRealtorClients } from '~/lib/api/services/clientsService';
import { GetAvailablePropertyDetails } from '~/lib/api/services/propertiesService';

const index = () => {
  const { id } = useParams();
  const [paymentType, setPaymentType] = React.useState<
    'fully_sold' | 'instalment'
  >('fully_sold');
  const searchParams = useSearchParams();
  const [clients, setClients] = React.useState([]);
  const [availablePropertyDetails, setAvailablePropertyDetails] =
    React.useState<any>([]);

  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'fully_sold' || type === 'instalment') {
      setPaymentType(type);
    } else {
      setPaymentType('fully_sold');
    }
  }, [searchParams, id]);

  const fetchClients = async () => {
    try {
      const data = await GetRealtorClients();
      setClients(data?.data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  React.useEffect(() => {
    fetchClients();
  }, []);

  const getAvailablePropertyDetails = async () => {
    try {
      const res = await GetAvailablePropertyDetails(id as string);
      setAvailablePropertyDetails(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getAvailablePropertyDetails();
  }, [id]);

  return (
    <RealtorDashboardLayout
      title={
        <Flex alignItems="center" gap="8px">
          <Text fontSize={[15, 16]} fontWeight={600} color="brand.400">
            Properties
          </Text>
          <BsChevronRight size={15} fontWeight={900} />
          <Text fontSize={[15, 16]} fontWeight={600} color="brand.400">
            Available Properties
          </Text>
          <BsChevronRight size={15} fontWeight={900} />
          <Text fontSize={[15, 16]} fontWeight={600} color="brand.800">
            {availablePropertyDetails?.property_name}
          </Text>
        </Flex>
      }
    >
      {paymentType === 'fully_sold' ? (
        <FullySoldProperty
          fetchClients={fetchClients}
          propertyId={id as string}
          clients={clients}
        />
      ) : (
        <InstalmentPaymentProperty
          clients={clients}
          propertyId={id as string}
          fetchClients={fetchClients}
        />
      )}
    </RealtorDashboardLayout>
  );
};

export default index;
