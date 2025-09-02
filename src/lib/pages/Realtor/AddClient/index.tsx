'use client';

import React from 'react';
import RealtorDashboardLayout from '~/lib/layout/components/RealtorDashboardHeader';
import SuccessScreen from './components/SuccessScreen';
import AddClientForm from './components/AddClientForm';

const index = () => {
  const [isSuccess, setIsSuccess] = React.useState(false);
  return (
    <RealtorDashboardLayout title="Add New Client">
      {isSuccess ? <SuccessScreen /> : <AddClientForm />}
    </RealtorDashboardLayout>
  );
};

export default index;
