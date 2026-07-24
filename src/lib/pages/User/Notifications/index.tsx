'use client';

import DashboardHeader from '~/lib/layout/components/DashboardHeader';
import Header from './components/Header';
import Notifications from './components/Notifications';
import { Stack } from '@chakra-ui/react';
import EmptyState from './components/EmptyState';

const index = () => {
  return (
    <DashboardHeader title="Notifications">
      <Stack spacing="25px" p="25px 20px">
        <Header />
        <Notifications />
        {/* <EmptyState /> */}
      </Stack>
    </DashboardHeader>
  );
};

export default index;
