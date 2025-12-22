'use client';

import React from 'react';
import ComingSoon from '~/lib/components/ComingSoon';
import RealtorDashboardLayout from '~/lib/layout/components/RealtorDashboardHeader';

const index = () => {
  return (
    <RealtorDashboardLayout title="Team">
      <ComingSoon />
    </RealtorDashboardLayout>
  );
};

export default index;
