'use client';

import React, { useState, useContext } from 'react';
import PaymentForm from './components/PaymentForm';
import PropertyDetails from './components/PropertyDetails';
import { Box, Button, Flex, Stack } from '@chakra-ui/react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeftIcon } from '~/lib/components/Icons/Icons';
import {
  GetAssetDetails,
  GetAssetPaymentDueDates,
} from '~/lib/api/services/assetsService';
import DashboardHeader from '~/lib/layout/components/DashboardHeader';
import { AppContext } from '~/lib/layout';
import {
  GetPaymentDetails,
  PaymentDetails,
} from '~/lib/api/services/dashboardService';

const index = () => {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('pid');
  const { GetNotifications } = useContext(AppContext);

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentDetails, setPaymentDetails] = React.useState<PaymentDetails>(
    {} as PaymentDetails
  );

  React.useEffect(() => {
    const fetchAssetDetails = async () => {
      setLoading(true);
      try {
        const details = await GetPaymentDetails(parseInt(paymentId || ''));
        setPaymentDetails(details.data);
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
    <DashboardHeader title="Update Payment">
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
            <PropertyDetails
              paymentDetails={paymentDetails}
              loading={loading}
            />
            <PaymentForm
              paymentDetails={paymentDetails}
              GetNotifications={GetNotifications}
            />
          </Flex>
        </Stack>
      </Box>
    </DashboardHeader>
  );
};

export default index;
