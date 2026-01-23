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
  GetSoldPropertyDetails,
  GetInstalmentPropertyDetails,
} from '~/lib/api/services/propertiesService';
import SalesHistory from './components/SalesHistory';
import InstalmentAssetDetails from './components/InstalmentAssetDetails';
import SoldPropertyDetails from './components/SoldPropertyDetails';
import { SoldPropertyDetails as SoldPropertyDetailsType } from '~/lib/utils/types';
import { InstalmentPropertyDetails } from '~/lib/utils/types';
import SoldPropertyPaymentHistory from './components/SoldPropertyPaymentHistory';
import InstalmentPropertyPaymentHistory from './components/InstalmentPropertyPaymentHistory';

const index = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const searchParams = useSearchParams();
  const [propertyType, setPropertyType] = React.useState<
    'available' | 'instalment' | 'sold'
  >();

  const tabs =
    propertyType !== 'available'
      ? ['Details', 'Payment History']
      : ['Details', 'Sales History'];
  const [activeTab, setActiveTab] = React.useState<
    'Details' | 'Sales History' | 'Payment History'
  >('Details');
  const [availablePropertyDetails, setAvailablePropertyDetails] =
    React.useState<any>([]);
  const [soldPropertyDetails, setSoldPropertyDetails] =
    React.useState<SoldPropertyDetailsType>({} as SoldPropertyDetailsType);
  const [instalmentPropertyDetails, setInstalmentPropertyDetails] =
    React.useState<InstalmentPropertyDetails>({} as InstalmentPropertyDetails);
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
  }, [searchParams]);

  useEffect(() => {
    if (propertyType === null) return;

    switch (propertyType) {
      case 'available':
        getAvailablePropertyDetails();
        getPropertyPaymentHistory();
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

  const propertyAddress =
    propertyType === 'available'
      ? `${availablePropertyDetails?.house_number} ${availablePropertyDetails?.street_name} ${availablePropertyDetails?.city_name}`
      : propertyType === 'sold'
        ? `${soldPropertyDetails?.property?.house_number} ${soldPropertyDetails?.property?.street_name} ${soldPropertyDetails?.property?.city_name}`
        : `${instalmentPropertyDetails?.property?.location}`;

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
            {propertyType === 'available'
              ? availablePropertyDetails?.property_name
              : propertyType === 'sold'
                ? soldPropertyDetails?.property?.property_name
                : instalmentPropertyDetails?.property?.property_name}
          </Text>
        </Flex>
      }
    >
      <Stack w="full" spacing="12px">
        <Header
          tabs={tabs}
          noOfSales={
            propertyType === 'available'
              ? propertyPaymentHistory?.number_of_sales
              : propertyType === 'sold'
                ? soldPropertyDetails?.totals?.total_payments
                : instalmentPropertyDetails?.payment_details
                    ?.instalment_payments?.length
          }
          activeTab={activeTab}
          propertyType={propertyType || 'available'}
          setActiveTab={setActiveTab}
          propertyName={
            propertyType === 'available'
              ? availablePropertyDetails?.property_name
              : propertyType === 'sold'
                ? soldPropertyDetails?.property?.property_name
                : instalmentPropertyDetails?.property?.property_name
          }
          location={propertyAddress}
          selectedProperty={availablePropertyDetails}
        />
        {activeTab === 'Details' && (
          <Box p={['20px', '20px']}>
            <Flex
              flexWrap={['wrap', 'nowrap']}
              gap="40px"
              alignItems="flex-start"
              w="full"
            >
              <Box>
                {propertyType === 'available' ? (
                  <AvailableAssetDetails
                    propertyDetails={availablePropertyDetails}
                  />
                ) : propertyType === 'instalment' ? (
                  <InstalmentAssetDetails
                    propertyDetails={instalmentPropertyDetails}
                  />
                ) : (
                  <SoldPropertyDetails propertyDetails={soldPropertyDetails} />
                )}
              </Box>
              <Notes
                notes={
                  propertyType === 'available'
                    ? availablePropertyDetails?.comment
                    : propertyType === 'sold'
                      ? soldPropertyDetails?.sale_info?.comment
                      : instalmentPropertyDetails?.sale_information?.comment
                }
              />
            </Flex>
          </Box>
        )}
        {activeTab === 'Sales History' && (
          <Box>
            <SalesHistory
              payments={propertyPaymentHistory}
              assetId={id as string}
            />
          </Box>
        )}
        {activeTab === 'Payment History' && propertyType === 'sold' && (
          <Box>
            <SoldPropertyPaymentHistory
              payments={soldPropertyDetails?.payments}
              assetId={id as string}
              salesPrice={soldPropertyDetails?.sale_info?.amount_sold}
              commissionReceived={soldPropertyDetails?.totals?.total_commission}
            />
          </Box>
        )}
        {activeTab === 'Payment History' && propertyType === 'instalment' && (
          <Box>
            <InstalmentPropertyPaymentHistory
              salesPrice={Number(
                instalmentPropertyDetails?.sale_information?.sale_price
              )}
              totalAmountPaid={
                instalmentPropertyDetails?.payment_details?.total_amount_paid
              }
              outstandingBalance={
                instalmentPropertyDetails?.payment_details?.outstanding_balance
              }
              totalCommission={
                instalmentPropertyDetails?.payment_details
                  ?.total_commissioned_earned
              }
              nextDuePaymentDate={
                instalmentPropertyDetails?.next_instalment_payment?.due_date
              }
              payments={
                instalmentPropertyDetails?.payment_details?.instalment_payments
              }
              propertyName={instalmentPropertyDetails?.property?.property_name}
              clientName={`${instalmentPropertyDetails?.client?.firstname} ${instalmentPropertyDetails?.client?.lastname}`}
              clientEmail={instalmentPropertyDetails?.client?.email}
              clientPhone={instalmentPropertyDetails?.client?.phone ?? ''}
              assetId={id as string}
            />
          </Box>
        )}
      </Stack>
    </RealtorDashboardLayout>
  );
};

export default index;
