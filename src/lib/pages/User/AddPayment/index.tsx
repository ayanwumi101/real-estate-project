'use client';

import React, { useState, useContext } from 'react';
import PaymentForm from './components/PaymentForm';
import PropertyDetails from './components/PropertyDetails';
import { Box, Button, Flex, Stack } from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeftIcon } from '~/lib/components/Icons/Icons';
import {
  GetAssetDetails,
  GetAssetPaymentDueDates,
} from '~/lib/api/services/assetsService';
import DashboardHeader from '~/lib/layout/components/DashboardHeader';
import { AppContext } from '~/lib/layout';

const index = () => {
  const { id } = useParams();
  const { GetNotifications } = useContext(AppContext);

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [assetDetails, setAssetDetails] = React.useState<any>(null);
  const [paymentDueDates, setPaymentDueDates] = React.useState<any>([]);

  React.useEffect(() => {
    const fetchAssetDetails = async () => {
      setLoading(true);
      try {
        const details = await GetAssetDetails(id as string);
        setAssetDetails(details.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchAssetDetails();
  }, []);

  // React.useEffect(() => {
  //   const fetchPaymentDueDates = async () => {
  //     const dueDates = await GetAssetPaymentDueDates(id as string);
  //     setPaymentDueDates(dueDates.data.payment_due_dates);
  //   };
  //   fetchPaymentDueDates();
  // }, [id]);

  return (
    <DashboardHeader title="Add Payment">
      <Box p={['20px', '40px']}>
        <Stack spacing="40px" alignItems="flex-start">
          {' '}
          <Button
            onClick={() => router.back()}
            variant="ghost"
            leftIcon={<ChevronLeftIcon />}
            p="0"
            _hover={{ bg: 'none' }}
            color="brand.100"
          >
            Back
          </Button>
          <Flex
            alignItems="flex-start"
            gap="45px"
            w="full"
            flexWrap={['wrap', 'nowrap']}
          >
            <PropertyDetails assetDetails={assetDetails} loading={loading} />
            <PaymentForm
              paymentDueDates={paymentDueDates}
              assetId={assetDetails?.id}
              assetType={assetDetails?.asset_type}
              GetNotifications={GetNotifications}
            />
          </Flex>
        </Stack>
      </Box>
    </DashboardHeader>
  );
};

export default index;
