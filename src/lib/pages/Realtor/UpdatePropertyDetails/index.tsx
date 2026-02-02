'use client';

import React, { useEffect } from 'react';
import { Box, Stack, Flex, Text } from '@chakra-ui/react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import RealtorDashboardLayout from '~/lib/layout/components/RealtorDashboardHeader';
import { BsChevronRight } from 'react-icons/bs';
import UpdateSoldPropertyForm from './components/UpdateSoldPropertyForm';
import UpdateInstalmentPropertyForm from './components/UpdateInstalmentPropertyForm';
import UpdateAvailablePropertyForm from './components/UpdateAvailablePropertyForm';
import {
  GetAvailablePropertyDetails,
  GetInstalmentPropertyDetails,
  GetSoldPropertyDetails,
} from '~/lib/api/services/propertiesService';
import { SoldPropertyDetails as SoldPropertyDetailsType } from '~/lib/utils/types';
import { InstalmentPropertyDetails } from '~/lib/utils/types';

const index = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const [propertyType, setPropertyType] = React.useState<
    'available' | 'instalment' | 'sold'
  >();
  const [propertyDetails, setPropertyDetails] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [countries, setCountries] = React.useState<any>([]);
  const [soldPropertyDetails, setSoldPropertyDetails] =
    React.useState<SoldPropertyDetailsType>({} as SoldPropertyDetailsType);
  const [instalmentPropertyDetails, setInstalmentPropertyDetails] =
    React.useState<InstalmentPropertyDetails>({} as InstalmentPropertyDetails);

  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'available' || type === 'instalment' || type === 'sold') {
      setPropertyType(type);
    } else {
      setPropertyType('available');
    }
  }, [id, propertyType]);

  const getAvailablePropertyDetails = async () => {
    try {
      const res = await GetAvailablePropertyDetails(id as string);
      setPropertyDetails(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSoldPropertyDetails = async () => {
    try {
      const res = await GetSoldPropertyDetails(id as string);
      setSoldPropertyDetails(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getInstlamentPropertyDetails = async () => {
    try {
      const res = await GetInstalmentPropertyDetails(id as string);
      setInstalmentPropertyDetails(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (propertyType === null) return;

    switch (propertyType) {
      case 'available':
        getAvailablePropertyDetails();
        break;

      case 'sold':
        getSoldPropertyDetails();
        break;

      case 'instalment':
        getInstlamentPropertyDetails();
        break;

      default:
        break;
    }
  }, [propertyType, id]);

  console.log(id, instalmentPropertyDetails?.property_sale_id);
  

  return (
    <RealtorDashboardLayout
      title={
        <Flex alignItems="center" gap="8px" flexWrap={['wrap', 'nowrap']}>
          <Text fontSize={[15, 16]} fontWeight={600} color="brand.400">
            Properties
          </Text>
          <BsChevronRight size={15} fontWeight={900} />
          <Text fontSize={[15, 16]} fontWeight={600} color="brand.400">
            {propertyType === 'available'
              ? 'Available'
              : propertyType === 'sold'
                ? 'Sold'
                : 'Instalment'}{' '}
            Properties
          </Text>
          <BsChevronRight size={15} fontWeight={900} />
          <Text fontSize={[15, 16]} fontWeight={600} color="brand.800">
            {propertyType === 'available'
              ? propertyDetails?.property_name
              : propertyType === 'sold'
                ? soldPropertyDetails?.property?.property_name
                : instalmentPropertyDetails?.property?.property_name}
          </Text>
        </Flex>
      }
    >
      {propertyType === 'available' && (
        <UpdateAvailablePropertyForm
          id={id as string}
          propertyType={propertyType}
          propertyDetails={propertyDetails}
        />
      )}
      {propertyType === 'sold' && (
        <UpdateSoldPropertyForm
          id={id as string}
          propertyType={propertyType}
          propertyDetails={soldPropertyDetails}
        />
      )}
      {propertyType === 'instalment' && (
        <UpdateInstalmentPropertyForm
          id={id as string}
          propertyType={propertyType}
          propertyDetails={instalmentPropertyDetails}
        />
      )}
    </RealtorDashboardLayout>
  );
};

export default index;
