'use client';

import React, { useEffect, useContext } from 'react';
import RealtorDashboardLayout from '~/lib/layout/components/RealtorDashboardHeader';
import { AppContext } from '~/lib/layout';
import SuccessScreen from './components/SuccessScreen';
import AddClientForm from './components/AddClientForm';
import { GetRealtorProperties } from '~/lib/api/services/propertiesService';
import { AddRealtorClient } from '~/lib/api/services/clientsService';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';



const index = () => {
  const toast = useToast();
  const router = useRouter();
    const { GetNotifications } = useContext(AppContext);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [properties, setProperties] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

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

  const handleAddClient = async (values: any) => {
    setLoading(true);
    const formData = {
      firstname: values.firstName,
      lastname: values.lastName,
      email: values.email,
      gender: values.gender,
      phone: values.phone,
      address: values.address,
      property_ids: values.propertyIds,
    };
    try {
      const response = await AddRealtorClient(formData);
      if (response?.data?.id) {
        await GetNotifications();
        setIsSuccess(true);
        toast({
          title: 'Client Added.',
          description: "You've successfully added a new client.",
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        // router.push('/realtor/clients');
      }
    } catch (error: any) {
      const errorMessages = Object.entries(error?.response?.data?.message)
        .map(([key, value]: any) => {
          const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
          return `${formattedKey}: ${value.join(', ')}`;
        })
        .join('\n');
      toast({
        title: 'Error.',
        description:
          errorMessages || 'An error occurred while adding the client.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      console.error('Error adding client:', error);
    }
    setLoading(false);
  };

  return (
    <RealtorDashboardLayout title="Add New Client">
      {isSuccess === true ? (
        <SuccessScreen />
      ) : (
        <AddClientForm
          addClient={handleAddClient}
          properties={properties}
          loading={loading}
        />
      )}
    </RealtorDashboardLayout>
  );
};

export default index;
