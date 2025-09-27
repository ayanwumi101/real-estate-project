'use client';

import { Text, Flex } from '@chakra-ui/react';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { BsChevronRight } from 'react-icons/bs';
import RealtorDashboardLayout from '~/lib/layout/components/RealtorDashboardHeader';
import FullySoldProperty from './FullySoldProperty';
import InstalmentPaymentProperty from './InstalmentPaymentProperty';
import { GetRealtorClients } from '~/lib/api/services/clientsService';

const index = () => {
  const { id } = useParams();
  const [paymentType, setPaymentType] = React.useState<
    'fully_sold' | 'instalment'
  >('fully_sold');
  const searchParams = useSearchParams();
  const [clients, setClients] = React.useState([]);

  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'fully_sold' || type === 'instalment') {
      setPaymentType(type);
    } else {
      setPaymentType('fully_sold');
    }
  }, [searchParams, id]);

  React.useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await GetRealtorClients();
        setClients(data?.data || []);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };
    fetchClients();
  }, []);

  return (
    <RealtorDashboardLayout
      title={
        <Flex alignItems="center" gap="8px">
          <Text fontSize={[15,16]} fontWeight={600} color="brand.400">
            Properties
          </Text>
          <BsChevronRight size={15} fontWeight={900} />
          <Text fontSize={[15,16]} fontWeight={600} color="brand.400">
            Available Properties
          </Text>
          <BsChevronRight size={15} fontWeight={900} />
          <Text fontSize={[15,16]} fontWeight={600} color="brand.800">
            Skyline Residences
          </Text>
        </Flex>
      }
    >
      {paymentType === 'fully_sold' ? (
        <FullySoldProperty propertyId={id as string} clients={clients} />
      ) : (
        <InstalmentPaymentProperty
          clients={clients}
          propertyId={id as string}
        />
      )}
    </RealtorDashboardLayout>
  );
};

export default index;
