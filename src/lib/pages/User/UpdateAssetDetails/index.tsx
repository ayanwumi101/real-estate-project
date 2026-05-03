'use client';

import React, { useEffect, createContext, useState } from 'react';
import Notes from './components/Notes';
import AssetDetails from './components/AssetDetails';
import Header from './components/Header';
import { Box, Stack, Flex, useToast } from '@chakra-ui/react';
import {
  GetAssetDetails,
  UpdateAssetDetails,
} from '~/lib/api/services/assetsService';
import { useParams } from 'next/navigation';
import useNavigate from '~/lib/utils/useNavigate';
import DashboardHeader from '~/lib/layout/components/DashboardHeader';

export const AssetDetailsContext = createContext<any>({});

const index = () => {
  const toast = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [propertyDetails, setPropertyDetails] = React.useState<any>([]);
  const [propertySize, setPropertySize] = React.useState<string>('');
  const [boughtDate, setBoughtDate] = React.useState<string>('');
  const [propertyCost, setPropertyCost] = React.useState<string>('');
  const [paymentStatus, setPaymentStatus] = React.useState<string>('');
  const [cashflowSource, setCashflowSource] = React.useState<string>('');
  const [isPropertyOccupied, setIsPropertyOccupied] = React.useState<
    'yes' | 'no'
  >();
  const [remittanceAmount, setRemittanceAmount] = React.useState<string>('');
  const [cashflowDuration, setCashflowDuration] = React.useState<string>('');
  const [lastRemittanceDate, setLastRemittanceDate] =
    React.useState<string>('');
  // const [equityOwnership, setEquityOwnership] = React.useState<string>('');
  const [realtorName, setRealtorName] = React.useState<string>('');
  const [realtorPhone, setRealtorPhone] = React.useState<string>('');
  const [allocationStatus, setAllocationStatus] = React.useState<string>('');
  const [documentationStatus, setDocumentationStatus] =
    React.useState<string>('');
  const [handoverStatus, setHandoverStatus] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [comment, setComment] = React.useState<string>('');
  const [nextRemittanceDate, setNextRemittanceDate] =
    React.useState<string>('');

  const getAssetDetails = async () => {
    setLoading(true);
    try {
      const res = await GetAssetDetails(id as string);
      const data = await res.data;
      setPropertyDetails(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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
      // setEquityOwnership(propertyDetails?.equity_ownership);
      setRealtorName(propertyDetails?.realtor_name);
      setRealtorPhone(propertyDetails?.realtor_phone);
      setAllocationStatus(propertyDetails?.allocation_status);
      setDocumentationStatus(propertyDetails?.documentation_status);
      setHandoverStatus(propertyDetails?.handover_status);
      setComment(propertyDetails?.comment);
      setNextRemittanceDate(propertyDetails?.cashflow_payment_due);
    }
  }, [propertyDetails]);

  const UpdateAsset = async () => {
    setIsLoading(true);
    const cashflowData = {
      size: propertySize,
      bought_date: boughtDate,
      property_cost: propertyCost,
      payment_status: paymentStatus,
      cashflow_source: cashflowSource,
      is_occupied: isPropertyOccupied === 'no' ? false : true,
      cashflow_amount: remittanceAmount,
      cashflow_duration: cashflowDuration,
      last_cashflow_date: lastRemittanceDate,
      // equity_ownership: equityOwnership,
      realtor_name: realtorName,
      phone: realtorPhone,
      allocation_status: allocationStatus,
      documentation_status: documentationStatus,
      handover_status: handoverStatus,
      cashflow_payment_due: nextRemittanceDate,
    };
    const data = {
      size: propertySize,
      bought_date: boughtDate,
      property_cost: propertyCost,
      payment_status: paymentStatus,
      cashflow_source: cashflowSource,
      is_occupied: isPropertyOccupied === 'no' ? false : true,
      cashflow_amount: remittanceAmount,
      cashflow_duration: cashflowDuration,
      last_cashflow_date: lastRemittanceDate,
      // equity_ownership: equityOwnership,
      realtor_name: realtorName,
      phone: realtorPhone,
      allocation_status: allocationStatus,
      documentation_status: documentationStatus,
      handover_status: handoverStatus,
      // comment: comment,
    };
    const formData =
      propertyDetails?.asset_type === 'instalment' ? data : cashflowData;
    try {
      const res = await UpdateAssetDetails(id as string, formData);
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
        navigate(`/user/my-assets/${id}`);
      }
    } catch (error: any) {
      toast({
        title: 'Error Updating Asset',
        description: error?.response?.data?.message || error.message,
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
  // console.log(propertyDetails);

  return (
    <DashboardHeader title='Update Asset Details'>
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
          // equityOwnership,
          // setEquityOwnership,
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
          comment,
          setComment,
          nextRemittanceDate,
          setNextRemittanceDate,
        }}
      >
        <Box>
          <Stack>
            <Header
              fetching={loading}
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
                <AssetDetails
                  fetching={loading}
                  propertyDetails={propertyDetails}
                />
                {/* <Notes /> */}
              </Flex>
            </Box>
          </Stack>
        </Box>
      </AssetDetailsContext.Provider>
    </DashboardHeader>
  );
};

export default index;
