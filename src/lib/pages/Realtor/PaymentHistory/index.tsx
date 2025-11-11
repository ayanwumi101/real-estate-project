'use client';

import { Box, Stack } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { GetPropertyPaymentHistory } from '~/lib/api/services/propertiesService';
import PaymentStats from './components/PaymentStats';
import PaymentHistoryTable from './components/PaymentHistoryTable';
import RealtorDashboardLayout from '~/lib/layout/components/RealtorDashboardHeader';
import { BsChevronRight } from 'react-icons/bs';
import { Text, Flex } from '@chakra-ui/react';

const index = () => {
  const { id } = useParams();
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
      <Box py="20px" px={['20px', '0px']}>
        <Stack spacing="20px">
          <PaymentStats
            salesPrice={paymentHistory?.total_sale_price}
            totalCommission={paymentHistory?.total_commission_received}
            totalAmountPaid={paymentHistory?.total_amount_paid}
            noOfSales={paymentHistory?.number_of_sales}
          />
          {/* <Flex
          alignItems="center"
          justifyContent="space-between"
          flexWrap={['wrap', 'nowrap']}
          gap={['20px', '0px']}
          w="full"
        >
          <InputGroup w={['full', '325px']}>
            <InputLeftElement pointerEvents="none">
              <InputSearchIcon />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search client..."
              rounded="50px"
              fontSize={14}
              w="full"
              _placeholder={{ color: 'gray.500' }}
            />
          </InputGroup>
          <Flex
            alignItems="center"
            gap="20px"
            flexWrap={['wrap', 'nowrap']}
            // w="full"
          >
            <Box w={['full', '250px']}>
              <Flex
                alignItems="center"
                gap={['0px', '5px']}
                flexWrap={['wrap', 'nowrap']}
              >
                <FormLabel fontSize={[15, 16]}>Sale Type:</FormLabel>
                <Select w={['full', '140px']} fontSize={14} rounded="50px">
                  <option value="all">All</option>
                  <option value="sale">Sale</option>
                  <option value="instalment">Instalment</option>
                </Select>
              </Flex>
            </Box>
            <Box w={['full', '200px']}>
              <Flex
                alignItems="center"
                gap={['0px', '5px']}
                flexWrap={['wrap', 'nowrap']}
              >
                <FormLabel fontSize={[15, 16]}>Status:</FormLabel>
                <Select w="full" fontSize={14} rounded="50px">
                  <option value="all">All</option>
                  <option value="sale">Pending</option>
                  <option value="instalment">Completed</option>
                </Select>
              </Flex>
            </Box>
          </Flex>
        </Flex> */}
          <PaymentHistoryTable payments={paymentHistory?.payment_history} />
        </Stack>
      </Box>
    </RealtorDashboardLayout>
  );
};

export default index;
