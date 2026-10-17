'use client';

import React, { useEffect, createContext, useState, useContext } from 'react';
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
import { AppContext } from '~/lib/layout';

export const AssetDetailsContext = createContext<any>({});

const index = () => {
  const toast = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const { GetNotifications } = useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [propertyDetails, setPropertyDetails] = React.useState<any>([]);
  const [propertySize, setPropertySize] = React.useState<string>('');
  const [assetType, setAssetType] = React.useState<
    'owned' | 'cashflow' | 'instalment'
  >('owned');
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
  const [amountPaid, setAmountPaid] = React.useState<string>('');
  const [outstandingBalance, setOutstandingBalance] =
    React.useState<string>('');
  const [paymentPlan, setPaymentPlan] = React.useState<string>('');
  const [instalmentPayment, setInstalmentPayment] = React.useState<string>('');
  const [lastPaymentDate, setLastPaymentDate] = React.useState<string>('');
  const [nextPaymentDate, setNextPaymentDate] = React.useState<string>('');
  const [durationOfPayment, setDurationOfPayment] = React.useState<string>('');

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
      setAssetType(propertyDetails?.asset_type);
      setPropertySize(propertyDetails?.size);
      setBoughtDate(propertyDetails?.bought_date);
      setPropertyCost(
        propertyDetails?.property_cost?.display_value
          ? propertyDetails?.property_cost?.display_value
          : propertyDetails?.property_cost
      );
      setPaymentStatus(propertyDetails?.payment_status);
      setCashflowSource(propertyDetails?.cashflow_source);
      setIsPropertyOccupied(propertyDetails?.is_occupied);
      setRemittanceAmount(
        propertyDetails?.cashflow_amount?.display_value
          ? propertyDetails?.cashflow_amount?.display_value
          : propertyDetails?.cashflow_amount
      );
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
      setAmountPaid(
        propertyDetails?.amount_paid?.display_value
          ? propertyDetails?.amount_paid?.display_value
          : propertyDetails?.amount_paid
      );
      setOutstandingBalance(
        propertyDetails?.amount_left?.display_value
          ? propertyDetails?.amount_left?.display_value
          : propertyDetails?.amount_left
      );
      setPaymentPlan(propertyDetails?.payment_plan?.toLowerCase());
      setInstalmentPayment(
        propertyDetails?.instalment_payment ||
          propertyDetails?.cashflow_amount ||
          0
      );
      setLastPaymentDate(propertyDetails?.payment_date);
      setNextPaymentDate(propertyDetails?.due_date);
      setDurationOfPayment(propertyDetails?.duration);
    }
  }, [propertyDetails]);

  const UpdateAsset = async () => {
    setIsLoading(true);
    const cashflowData = {
      size: propertySize,
      asset_type: assetType,
      bought_date: boughtDate,
      property_cost: propertyCost,
      payment_status: paymentStatus,
      cashflow_source: cashflowSource,
      is_occupied: isPropertyOccupied === 'no' ? false : true,
      cashflow_amount: remittanceAmount,
      cashflow_duration: cashflowDuration,
      last_cashflow_date: lastRemittanceDate,
      realtor_name: realtorName,
      phone: realtorPhone,
      allocation_status: allocationStatus,
      documentation_status: documentationStatus,
      handover_status: handoverStatus,
      cashflow_payment_due: nextRemittanceDate,
      comment: comment ?? '',
    };
    const data = {
      size: propertySize,
      asset_type: assetType,
      bought_date: boughtDate,
      property_cost: propertyCost,
      payment_status: paymentStatus,
      cashflow_source: cashflowSource,
      is_occupied: isPropertyOccupied === 'no' ? false : true,
      cashflow_amount: remittanceAmount,
      cashflow_duration: cashflowDuration,
      last_cashflow_date: lastRemittanceDate,
      realtor_name: realtorName,
      phone: realtorPhone,
      allocation_status: allocationStatus,
      documentation_status: documentationStatus,
      handover_status: handoverStatus,
      comment: comment ?? '',
      amount_paid: amountPaid,
      amount_left: outstandingBalance,
      payment_plan: paymentPlan,
      instalment_payment: instalmentPayment,
      last_payment_date: lastPaymentDate,
      next_payment_date: nextPaymentDate,
      duration: durationOfPayment,
    };
    const formData =
      propertyDetails?.asset_type === 'instalment' ? data : cashflowData;
    try {
      const res = await UpdateAssetDetails(id as string, formData);
      if (res.status) {
        await GetNotifications();
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
    <DashboardHeader title="Update Asset Details">
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
          assetType,
          setAssetType,
          amountPaid,
          setAmountPaid,
          outstandingBalance,
          setOutstandingBalance,
          paymentPlan,
          setPaymentPlan,
          instalmentPayment,
          setInstalmentPayment,
          lastPaymentDate,
          setLastPaymentDate,
          nextPaymentDate,
          setNextPaymentDate,
          durationOfPayment,
          setDurationOfPayment,
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
                <Notes />
              </Flex>
            </Box>
          </Stack>
        </Box>
      </AssetDetailsContext.Provider>
    </DashboardHeader>
  );
};

export default index;
