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
import InstalmentPropertyPaymentHistory from './components/InstalmentPropertyPaymentHistory';
import {
  findClosestPaymentDueDate,
  getAssetWithEarliestPaymentDue, getPropertyWithEarliestPaymentDue
} from '~/lib/utils/findClosestDueAsset';

const index = () => {
  const { id } = useParams();
  const router = useRouter();
  const navigate = useNavigate();
  const [paymentHistory, setPaymentHistory] = React.useState<any>([]);
  const [activeTab, setActiveTab] = React.useState<'completed' | 'pending'>(
    'completed'
  );

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
  
  const assetWithEarliestPaymentDue = getPropertyWithEarliestPaymentDue(
    paymentHistory?.payment_history
  );


  return (
    <RealtorDashboardLayout
      title={
        <Flex
          alignItems="center"
          gap={['5px', '8px']}
          // flexWrap={['wrap', 'nowrap']}
        >
          <Text fontSize={[15, 16]} fontWeight={600} color="brand.400">
            Clients
          </Text>
          <BsChevronRight size={15} fontWeight={900} />
          <Text
            fontSize={[15, 16]}
            fontWeight={600}
            color="brand.800"
            noOfLines={[1, 2, 3]}
          >
            {paymentHistory?.client_name}
          </Text>
          <BsChevronRight size={15} fontWeight={900} />
          <Text
            fontSize={[15, 16]}
            fontWeight={600}
            color="brand.800"
            noOfLines={[1, 2, 3]}
          >
            {paymentHistory?.property_name}
          </Text>
          <BsChevronRight size={15} fontWeight={900} />
          <Text
            fontSize={[15, 16]}
            fontWeight={600}
            color="brand.800"
            noOfLines={[1, 2, 3]}
          >
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
            propertyType={paymentHistory.payment_type}
            outstandingBalance={paymentHistory?.outstanding_balance}
            nextDueDate={assetWithEarliestPaymentDue?.date}
          />
          {paymentHistory?.payment_type === 'instalment' ? (
            <Box w="full">
              <Stack spacing="20px" w="full">
                {/* navigation tab goes here */}
                <Flex alignItems="center" gap="10px">
                  {[
                    {
                      label: 'Completed Payments',
                      value: 'completed',
                    },
                    {
                      label: 'Pending Payments',
                      value: 'pending',
                    },
                  ].map((tab) => (
                    <Button
                      key={tab.value}
                      onClick={() =>
                        setActiveTab(tab.value as 'completed' | 'pending')
                      }
                      border="none"
                      rounded="50px"
                      h="40px"
                      bg={activeTab === tab.value ? 'brand.500' : 'none'}
                      color={
                        activeTab === tab.value ? 'brand.100' : 'brand.800'
                      }
                      fontSize={15}
                      fontWeight={600}
                      px="22px"
                      py="16px"
                      textTransform={'capitalize'}
                    >
                      {tab.label}
                    </Button>
                  ))}
                </Flex>
                <InstalmentPropertyPaymentHistory
                  paymentHistory={paymentHistory?.payment_history}
                  activeTab={activeTab}
                />
              </Stack>
            </Box>
          ) : (
            <PaymentHistoryTable payments={paymentHistory?.payment_history} />
          )}
        </Stack>
      </Box>
    </RealtorDashboardLayout>
  );
};

export default index;
