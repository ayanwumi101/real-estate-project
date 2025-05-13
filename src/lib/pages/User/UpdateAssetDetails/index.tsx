'use client';

import React, { useEffect, createContext } from 'react';
import Notes from './components/Notes';
import AssetDetails from './components/AssetDetails';
import Header from './components/Header';
import { Box, Stack, Flex } from '@chakra-ui/react';
import { GetAssetDetails } from '~/lib/api/services/assetsService';
import { useParams } from 'next/navigation';

export const AssetDetailsContext = createContext<any>({});

const index = () => {
  const [propertyDetails, setPropertyDetails] = React.useState<any>([]);
  const { id } = useParams();
  const [propertySize, setPropertySize] = React.useState<string>('');
  const [boughtDate, setBoughtDate] = React.useState<string>('');
  const [propertyCost, setPropertyCost] = React.useState<string>('');
  const [paymentStatus, setPaymentStatus] = React.useState<string>('');
  const [cashflowSource, setCashflowSource] = React.useState<string>('');
  const [isPropertyOccupied, setIsPropertyOccupied] = React.useState<boolean>();
  const [remittanceAmount, setRemittanceAmount] = React.useState<string>('');
  const [cashflowDuration, setCashflowDuration] = React.useState<string>('');
  const [lastRemittanceDate, setLastRemittanceDate] =
    React.useState<string>('');
  const [equityOwnership, setEquityOwnership] = React.useState<string>('');
  const [realtorName, setRealtorName] = React.useState<string>('');
  const [realtorPhone, setRealtorPhone] = React.useState<string>('');
  const [allocationStatus, setAllocationStatus] = React.useState<string>('');
  const [documentationStatus, setDocumentationStatus] =
    React.useState<string>('');
  const [handoverStatus, setHandoverStatus] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

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

  useEffect(() => {
    if (propertyDetails?.id) {
      setPropertySize(propertyDetails?.size);
      setBoughtDate(propertyDetails?.bought_date);
      setPropertyCost(propertyDetails?.property_cost);
      setPaymentStatus(propertyDetails?.payment_status);
      setCashflowSource(propertyDetails?.cashflow_source);
      setIsPropertyOccupied(propertyDetails?.is_occupied);
      setRemittanceAmount(propertyDetails?.cashflow_amount);
      setCashflowDuration(propertyDetails?.cashflow_duration);
      setLastRemittanceDate(propertyDetails?.last_cashflow_date);
      setEquityOwnership(propertyDetails?.equity_ownership);
      setRealtorName(propertyDetails?.realtor_name);
      setRealtorPhone(propertyDetails?.phone);
      setAllocationStatus(propertyDetails?.allocation_status);
      setDocumentationStatus(propertyDetails?.documentation_status);
      setHandoverStatus(propertyDetails?.handover_status);
    }
  }, [propertyDetails]);

  const EditAssetDetails = async () => {};

  return (
    <AssetDetailsContext.Provider
      value={{
        propertySize,
        setPropertySize,
        boughtDate,
        setBoughtDate,
        propertyCost,
        setPropertyCost,
        paymentStatus,
        setPaymentStatus,
        cashflowSource,
        setCashflowSource,
        isPropertyOccupied,
        setIsPropertyOccupied,
        remittanceAmount,
        setRemittanceAmount,
        cashflowDuration,
        setCashflowDuration,
        lastRemittanceDate,
        setLastRemittanceDate,
        equityOwnership,
        setEquityOwnership,
        realtorName,
        setRealtorName,
        realtorPhone,
        setRealtorPhone,
        allocationStatus,
        setAllocationStatus,
        documentationStatus,
        setDocumentationStatus,
        handoverStatus,
        setHandoverStatus,
      }}
    >
      <Box>
        <Stack>
          <Header
            loading={isLoading}
            editAssetDetails={EditAssetDetails}
            propertyName={propertyDetails?.property_name}
            location={`${propertyDetails?.house_number || ''}, ${propertyDetails?.street_name || ''}, ${propertyDetails?.state_id || ''} state`}
          />
          <Box p={['20px', '40px']}>
            <Flex
              alignItems="flex-start"
              flexWrap={['wrap', 'nowrap']}
              gap="40px"
            >
              <AssetDetails propertyDetails={propertyDetails} />
              {/* <Notes notes={propertyDetails?.comment} /> */}
            </Flex>
          </Box>
        </Stack>
      </Box>
    </AssetDetailsContext.Provider>
  );
};

export default index;
