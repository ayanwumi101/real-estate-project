'use client';

import React, { useEffect, Fragment } from 'react';
import Notes from './components/Notes';
import Header from './components/Header';
import { Box, Stack, Flex, Text } from '@chakra-ui/react';
import { useParams, useSearchParams } from 'next/navigation';
import useNavigate from '~/lib/utils/useNavigate';
import RealtorDashboardLayout from '~/lib/layout/components/RealtorDashboardHeader';
import { BsChevronRight } from 'react-icons/bs';
import AvailableAssetDetails from './components/AvailableAssetDetails';
import {
  GetAvailablePropertyDetails,
  GetInstalmentPropertyPaymentHistory,
  UpdateProperty,
} from '~/lib/api/services/propertiesService';
import InstalmentPropertyDetails from './components/InstalmentPropertyDetails';
import SalesHistory from './components/SalesHistory';

const index = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const searchParams = useSearchParams();
  const [propertyType, setPropertyType] = React.useState<
    'available' | 'instalment' | 'sold'
  >('available');

  const tabs = ['Details', 'Sales History'];
  const [activeTab, setActiveTab] = React.useState<'Details' | 'Sales History'>(
    'Details'
  );
  const [availablePropertyDetails, setAvailablePropertyDetails] =
    React.useState<any>([]);
  const [propertyPaymentHistory, setPropertyPaymentHistory] =
    React.useState<any>([]);

  const getAvailablePropertyDetails = async () => {
    try {
      const res = await GetAvailablePropertyDetails(id as string);
      setAvailablePropertyDetails(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPropertyPaymentHistory = async () => {
    try {
      const res = await GetInstalmentPropertyPaymentHistory(id as string);
      setPropertyPaymentHistory(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'available' || type === 'instalment' || type === 'sold') {
      setPropertyType(type);
    } else {
      setPropertyType('available');
    }
  }, [id, propertyType]);

  useEffect(() => {
    getAvailablePropertyDetails();
    getPropertyPaymentHistory();
  }, [searchParams, id, propertyType]);

  return (
    <RealtorDashboardLayout
      title={
        <Flex
          alignItems="center"
          gap={['5px', '8px']}
          // flexWrap={['wrap', 'nowrap']}
        >
          <Text fontSize={[15, 16]} fontWeight={600} color="brand.400">
            Properties
          </Text>
          <BsChevronRight size={15} fontWeight={900} />
          <Text
            fontSize={[15, 16]}
            fontWeight={600}
            color="brand.400"
            noOfLines={[1, 2, 3]}
          >
            {propertyType === 'available'
              ? 'Available'
              : propertyType === 'sold'
                ? 'Sold'
                : 'Instalment'}{' '}
            Properties
          </Text>
          <BsChevronRight size={15} fontWeight={900} />
          <Text
            fontSize={[15, 16]}
            fontWeight={600}
            color="brand.800"
            noOfLines={[1, 2, 3]}
          >
            {availablePropertyDetails?.property_name}
          </Text>
        </Flex>
      }
    >
      {/* {propertyType !== 'available' ? (
        <InstalmentPropertyDetails
          totalSalePrice={propertyPaymentHistory?.total_sale_price}
          totalCommission={propertyPaymentHistory?.total_commission_received}
          totalPayment={propertyPaymentHistory?.total_payment}
          payments={propertyPaymentHistory?.sales}
          propertyId={id as string}
        />
      ) : ( */}
      <Stack w="full" spacing="12px">
        <Header
          tabs={tabs}
          noOfSales={propertyPaymentHistory?.number_of_sales ?? 0}
          activeTab={activeTab}
          propertyType={propertyType}
          setActiveTab={setActiveTab}
          propertyName={availablePropertyDetails?.property_name}
          location={`${availablePropertyDetails?.house_number} ${availablePropertyDetails?.street_name} ${availablePropertyDetails?.city_name}`}
        />
        {activeTab === 'Details' && (
          <Box p={['20px', '20px']}>
            <Flex
              // alignItems="flex-start"
              flexWrap={['wrap', 'nowrap']}
              gap="40px"
              w="full"
            >
              {/* {propertyType === 'available' && ( */}
              <AvailableAssetDetails
                propertyDetails={availablePropertyDetails}
              />
              {/* )} */}
              <Notes notes={availablePropertyDetails?.comment} />
            </Flex>
          </Box>
        )}
        {/* <Fragment> */}
        {activeTab === 'Sales History' && (
          <Box>
            <SalesHistory
              payments={propertyPaymentHistory}
              assetId={id as string}
            />
          </Box>
        )}
        {/* </Fragment> */}
      </Stack>
      {/* )} */}
    </RealtorDashboardLayout>
  );
};

export default index;
