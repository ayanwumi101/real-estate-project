'use client';

import { Flex, Text, Stack } from '@chakra-ui/react';
import React from 'react';
import { BsChevronRight } from 'react-icons/bs';
import RealtorDashboardLayout from '~/lib/layout/components/RealtorDashboardHeader';
import NavigationTab from './components/NavigationTab';
import InvestorsList from './components/InvestorsList';
import ComingSoon from '~/lib/components/ComingSoon';

const index = () => {
  return (
    <RealtorDashboardLayout
      title={
        <Flex alignItems="center" gap="8px">
          <Text fontSize={16} fontWeight={600} color="brand.400">
            Managed Assets
          </Text>
          <BsChevronRight size={15} fontWeight={900} />
          <Text fontSize={16} fontWeight={600} color="brand.800">
            Investor
          </Text>
        </Flex>
      }
    >
      {/* <Stack spacing="20px">
        <NavigationTab />
        <InvestorsList />
      </Stack> */}
      <ComingSoon />
    </RealtorDashboardLayout>
  );
};

export default index;
