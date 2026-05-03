'use client';
import React, { useState } from 'react';
import AccountBalance from './components/AccountBalance';
import Investments from './components/Investments';
import MarketUpdates from './components/MarketUpdates';
import { Box } from '@chakra-ui/react';
import { GetUserAssets } from '~/lib/api/services/assetsService';
import DashboardInfo from './components/DashboardInfo';
import UpcomingPayments from './components/UpcomingPayments';
import DashboardHeader from '~/lib/layout/components/DashboardHeader';

const index = () => {
  const [page, setPage] = useState<number>(1);
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [assets, setAssets] = React.useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const GetAssets = async () => {
    setLoading(true);
    try {
      const res = await GetUserAssets(dataPerPage, page);
      setAssets(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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
    <DashboardHeader title="Dashboard">
      <Box pt={[3, 0]}>
        <AccountBalance
          totalAssets={assets?.length}
          totalInvestment={totalInvestment}
          assetsLoading={loading}
        />
        <UpcomingPayments loading={loading} assets={upcomingPaymentsAssets} />
        {/* <DashboardInfo /> */}
        {/* <Investments />
        <MarketUpdates /> */}
      </Box>
    </DashboardHeader>
  );
};

export default index;
