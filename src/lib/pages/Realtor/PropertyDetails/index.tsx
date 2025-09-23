'use client';

import React, { useEffect } from 'react';
import Notes from './components/Notes';
import Header from './components/Header';
import { Box, Stack, Flex, Text } from '@chakra-ui/react';
import { useParams, useSearchParams } from 'next/navigation';
import useNavigate from '~/lib/utils/useNavigate';
import RealtorDashboardLayout from '~/lib/layout/components/RealtorDashboardHeader';
import { BsChevronRight } from 'react-icons/bs';
import AvailableAssetDetails from './components/AvailableAssetDetails';
import SoldAssetDetails from './components/SoldAssetDetails';
import InstalmentAssetDetails from './components/InstalmentAssetDetails';
import Payments from './components/Payments';
import {
  GetAvailablePropertyDetails,
  GetInstalmentPropertyDetails,
  GetSoldPropertyDetails,
  GetSoldPropertyPayments,
} from '~/lib/api/services/propertiesService';

const index = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const searchParams = useSearchParams();
  const [propertyType, setPropertyType] = React.useState<
    'available' | 'instalment' | 'sold'
  >('available');
  const tabs =
    propertyType === 'available' ? ['Details'] : ['Details', 'Payments'];
  const [activeTab, setActiveTab] = React.useState<'Details' | 'Payments'>(
    'Details'
  );
  const [availablePropertyDetails, setAvailablePropertyDetails] =
    React.useState<any>([]);
  const [instalmentPropertyDetails, setInstalmentPropertyDetails] =
    React.useState<any>([]);
  const [soldPropertyDetails, setSoldPropertyDetails] = React.useState<any>([]);
  const [soldPropertyPayments, setSoldPropertyPayments] = React.useState<any>(
    []
  );

  const getAvailablePropertyDetails = async () => {
    try {
      const res = await GetAvailablePropertyDetails(id as string);
      setAvailablePropertyDetails(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getInstalmentPropertyDetails = async () => {
    try {
      const res = await GetInstalmentPropertyDetails(id as string);
      setInstalmentPropertyDetails(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSoldPropertyDetails = async () => {
    try {
      const res = await GetSoldPropertyDetails(id as string);
      setSoldPropertyDetails(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getSoldPropertyPayments = async () => {
    try {
      const res = await GetSoldPropertyPayments(id as string);
      setSoldPropertyPayments(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'available' || type === 'instalment' || type === 'sold') {
      if (type === 'sold') {
        getSoldPropertyDetails();
        getSoldPropertyPayments();
      } else if (type === 'instalment') {
        getInstalmentPropertyDetails();
      } else {
        getAvailablePropertyDetails();
      }
      setPropertyType(type);
    } else {
      setPropertyType('available');
    }
  }, [searchParams, id, propertyType]);

  return (
    <RealtorDashboardLayout
      title={
        <Flex alignItems="center" gap="8px">
          <Text fontSize={16} fontWeight={600} color="brand.400">
            Properties
          </Text>
          <BsChevronRight size={15} fontWeight={900} />
          <Text fontSize={16} fontWeight={600} color="brand.400">
            Available Properties
          </Text>
          <BsChevronRight size={15} fontWeight={900} />
          <Text fontSize={16} fontWeight={600} color="brand.800">
            Skyline Residences
          </Text>
        </Flex>
      }
    >
      <Stack w="full">
        <Header
          tabs={tabs}
          activeTab={activeTab}
          propertyType={propertyType}
          setActiveTab={setActiveTab}
          propertyName={availablePropertyDetails?.property_name}
          location={
            propertyType === 'available'
              ? `${availablePropertyDetails?.house_number} ${availablePropertyDetails?.street_name} ${availablePropertyDetails?.city_name}`
              : propertyType === 'sold'
                ? `${soldPropertyDetails?.house_number} ${soldPropertyDetails?.street_name} ${soldPropertyDetails?.city_name}`
                : `${instalmentPropertyDetails?.house_number} ${instalmentPropertyDetails?.street_name} ${instalmentPropertyDetails?.city_name}`
          }
        />
        {activeTab === 'Details' && (
          <Box p={['20px', '20px']}>
            <Flex
              alignItems="flex-start"
              flexWrap={['wrap', 'nowrap']}
              gap="40px"
              w="full"
            >
              {propertyType === 'available' ? (
                <AvailableAssetDetails
                  propertyDetails={availablePropertyDetails}
                />
              ) : propertyType === 'sold' ? (
                <SoldAssetDetails propertyDetails={soldPropertyDetails} />
              ) : propertyType === 'instalment' ? (
                <InstalmentAssetDetails
                  propertyDetails={instalmentPropertyDetails}
                />
              ) : null}
              <Notes
                notes={availablePropertyDetails?.comment}
                // editComment={editComment}
              />
            </Flex>
          </Box>
        )}
        {activeTab === 'Payments' && <Payments payments={soldPropertyPayments} />}
      </Stack>
    </RealtorDashboardLayout>
  );
};

export default index;
