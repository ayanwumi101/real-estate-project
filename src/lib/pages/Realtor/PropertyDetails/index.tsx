'use client';

import React, { useEffect } from 'react';
import Notes from './components/Notes';
import Header from './components/Header';
import { Box, Stack, Flex, Text } from '@chakra-ui/react';
import { GetAssetDetails } from '~/lib/api/services/assetsService';
import { useParams } from 'next/navigation';
import useNavigate from '~/lib/utils/useNavigate';
import RealtorDashboardLayout from '~/lib/layout/components/RealtorDashboardHeader';
import { BsChevronRight } from 'react-icons/bs';
import AvailableAssetDetails from './components/AvailableAssetDetails';
import SoldAssetDetails from './components/SoldAssetDetails';
import InstalmentAssetDetails from './components/InstalmentAssetDetails';
import Payments from './components/Payments';

const index = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const tabs = ['Details', 'Payments'];
  const [activeTab, setActiveTab] = React.useState<'Details' | 'Payments'>(
    'Details'
  );
  const [propertyDetails, setPropertyDetails] = React.useState<any>([]);
  const [propertyStatus, setPropertyStatus] =
    React.useState<string>('available');

  const getAssetDetails = async () => {
    try {
      const res = await GetAssetDetails(id);
      const data = await res.data;
      setPropertyDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAssetDetails();
  }, [id]);

  const editComment = () => {
    navigate(`/user/my-assets/${id}/update-details`);
  };

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
          setActiveTab={setActiveTab}
          propertyName={propertyDetails?.property_name}
          location={`${propertyDetails?.house_number || ''}, ${propertyDetails?.street_name || ''}, ${propertyDetails?.state_id || ''} state`}
        />
        {activeTab === 'Details' && (
          <Box p={['20px', '20px']}>
            <Flex
              alignItems="flex-start"
              flexWrap={['wrap', 'nowrap']}
              gap="40px"
              w="full"
            >
              {propertyStatus === 'available' ? (
                <AvailableAssetDetails propertyDetails={propertyDetails} />
              ) : propertyStatus === 'sold' ? (
                <SoldAssetDetails />
              ) : propertyStatus === 'instalment' ? (
                <InstalmentAssetDetails />
              ) : null}
              <Notes
                notes={propertyDetails?.comment}
                editComment={editComment}
              />
            </Flex>
          </Box>
        )}
        {activeTab === 'Payments' && <Payments />}
      </Stack>
    </RealtorDashboardLayout>
  );
};

export default index;
