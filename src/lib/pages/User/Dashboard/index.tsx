'use client';
import React, { useContext, useState } from 'react';
import AccountBalance from './components/AccountBalance';
import Investments from './components/Investments';
import MarketUpdates from './components/MarketUpdates';
import { Box } from '@chakra-ui/react';
import { GetUserAssets } from '~/lib/api/services/assetsService';
import DashboardInfo from './components/DashboardInfo';
import UpcomingPayments from './components/UpcomingPayments';
import DashboardHeader from '~/lib/layout/components/DashboardHeader';
import { AppContext } from '~/lib/layout';
import {
  PropertiesResponse,
  NGNPropertiesResponse,
} from '~/lib/api/services/assetsService';

const index = () => {
  const { selectedCurrency } = useContext(AppContext);
  const [page, setPage] = useState<number>(1);
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [assets, setAssets] = React.useState<any>(null);

  const GetAssets = async () => {
    setLoading(true);
    try {
      const res = await GetUserAssets(dataPerPage, page);
      setAssets(res);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    GetAssets();
  }, []);

  const upcomingPaymentsAssets = assets?.data?.filter(
    (asset: any) => asset?.asset_type !== 'owned'
  );

  return (
    <DashboardHeader title="Dashboard">
      <Box pt={[3, 0]}>
        <AccountBalance
          currency={
            selectedCurrency?.code === 'NGN'
              ? selectedCurrency?.code
              : assets?.summary?.total_investment?.display_currency
          }
          totalAssets={assets?.summary?.total_assets}
          totalInvestment={
            selectedCurrency?.code === 'NGN'
              ? assets?.summary?.total_investment
              : assets?.summary?.total_investment?.display_value
          }
          currentValuation={
            selectedCurrency?.code === 'NGN'
              ? assets?.summary?.total_current_valuation
              : assets?.summary?.total_current_valuation?.display_value
          }
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
