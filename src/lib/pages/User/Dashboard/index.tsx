'use client';
import React, { useState } from 'react';
import AccountBalance from './components/AccountBalance';
import Investments from './components/Investments';
import MarketUpdates from './components/MarketUpdates';
import { Box } from '@chakra-ui/react';
import { GetUserAssets } from '~/lib/api/services/assetsService';
import DashboardInfo from './components/DashboardInfo';
import UpcomingPayments from './components/UpcomingPayments';

const index = () => {
  const [assets, setAssets] = React.useState<any[]>([]);
  const GetAssets = async () => {
    try {
      const res = await GetUserAssets();
      setAssets(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    GetAssets();
  }, []);

  const totalInvestment = assets?.reduce((acc, asset) => {
    return acc + Number(asset?.property_cost);
  }, 0);

  const upcomingPaymentsAssets = assets?.filter(
    (asset) => asset?.asset_type !== 'owned'
  );

  return (
    <Box pt={[3, 0]}>
      <AccountBalance
        totalAssets={assets?.length}
        totalInvestment={totalInvestment}
      />
      <UpcomingPayments assets={upcomingPaymentsAssets} />
      {/* <DashboardInfo /> */}
      {/* <Investments />
        <MarketUpdates /> */}
    </Box>
  );
};

export default index;
