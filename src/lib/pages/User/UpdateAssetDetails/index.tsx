'use client';

import React, { useEffect, createContext } from 'react';
import Notes from './components/Notes';
import AssetDetails from './components/AssetDetails';
import Header from './components/Header';
import { Box, Stack, Flex, useToast } from '@chakra-ui/react';
import {
  GetAssetDetails,
  UpdateAssetDetails,
} from '~/lib/api/services/assetsService';
import { useParams } from 'next/navigation';

export const AssetDetailsContext = createContext<any>({});

const index = () => {
  const toast = useToast();
  const { id } = useParams();
  const [propertyDetails, setPropertyDetails] = React.useState<any>([]);
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

  const UpdateAsset = async () => {
    setIsLoading(true);
    const formData = {
      size: propertySize,
      bought_date: boughtDate,
      property_name: propertyDetails?.property_name,
      property_type: propertyDetails?.property_type,
      house_number: propertyDetails?.house_number,
      street_name: propertyDetails?.street_name,
      state_id: propertyDetails?.state_id,
      asset_type: propertyDetails?.asset_type,
      city_name: propertyDetails?.city_name,
      property_cost: propertyCost,
      payment_status: paymentStatus,
      cashflow_source: cashflowSource,
      is_occupied: isPropertyOccupied,
      cashflow_amount: remittanceAmount,
      cashflow_duration: cashflowDuration,
      last_cashflow_date: lastRemittanceDate,
      equity_ownership: equityOwnership,
      realtor_name: realtorName,
      phone: realtorPhone,
      allocation_status: allocationStatus,
      documentation_status: documentationStatus,
      handover_status: handoverStatus,
    };
    console.log(formData);
    try {
      const res = await UpdateAssetDetails(id, formData);
      if (res.status) {
        getAssetDetails();
        toast({
          title: 'Asset Updated',
          description: 'Asset has been updated successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
    } catch (error) {
      toast({
        title: 'Error Updating Asset',
        description: 'An error occurred while updating the asset',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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
      setRealtorPhone(propertyDetails?.realtor_phone);
      setAllocationStatus(propertyDetails?.allocation_status);
      setDocumentationStatus(propertyDetails?.documentation_status);
      setHandoverStatus(propertyDetails?.handover_status);
    }
  }, [propertyDetails]);
  // console.log(propertyDetails);
  
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
            updateAsset={UpdateAsset}
            loading={isLoading}
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
