'use client';

import { Box, Stack } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { GetPropertyPaymentHistory } from '~/lib/api/services/propertiesService';
import PaymentStats from './components/PaymentStats';
import PaymentHistoryTable from './components/PaymentHistoryTable';
import RealtorDashboardLayout from '~/lib/layout/components/RealtorDashboardHeader';
import { BsChevronRight } from 'react-icons/bs';
import { Text, Flex, Button } from '@chakra-ui/react';
import useNavigate from '~/lib/utils/useNavigate';
import { ChevronLeftIcon } from '~/lib/components/Icons/Icons';
import { useRouter } from 'next/navigation';

const index = () => {
  const { id } = useParams();
  const router = useRouter();
  const navigate = useNavigate();
  const [paymentHistory, setPaymentHistory] = React.useState<any>([]);

  const getPaymentHistory = async () => {
    try {
      const res = await GetPropertyPaymentHistory(id as string);
      setPaymentHistory(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPaymentHistory();
  }, [id]);
  return (
    <RealtorDashboardLayout
      title={
        <Flex alignItems="center" gap="8px" flexWrap={['wrap', 'nowrap']}>
          <Text fontSize={[15, 16]} fontWeight={600} color="brand.400">
            Properties
          </Text>
          <BsChevronRight size={15} fontWeight={900} />
          {/* <Text fontSize={[15, 16]} fontWeight={600} color="brand.400">
            {propertyType === 'available'
              ? 'Available'
              : propertyType === 'sold'
                ? 'Sold'
                : 'Instalment'}{' '}
            Properties
          </Text>
          <BsChevronRight size={15} fontWeight={900} /> */}
          <Text fontSize={[15, 16]} fontWeight={600} color="brand.800">
            Payment History
          </Text>
        </Flex>
      }
    >
      <Box py="20px" px={['20px', '0px']} w="full">
        <Stack w="full" spacing="20px" alignItems="flex-start">
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
          <PaymentStats
            salesPrice={paymentHistory?.total_sale_price}
            totalCommission={paymentHistory?.total_commission_received}
            totalAmountPaid={paymentHistory?.total_amount_paid}
            noOfSales={paymentHistory?.number_of_sales}
          />
          <PaymentHistoryTable payments={paymentHistory?.payment_history} />
        </Stack>
      </Box>
    </RealtorDashboardLayout>
  );
};

export default index;
