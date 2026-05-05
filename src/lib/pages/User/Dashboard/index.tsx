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

const index = () => {
  const [page, setPage] = useState<number>(1);
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [assets, setAssets] = React.useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { selectedCurrency } = useContext(AppContext);

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

  const totalInvestment =
    selectedCurrency?.code === 'NGN'
      ? assets?.reduce(
          (acc, asset) =>
            acc + (asset?.property_cost ? Number(asset?.property_cost) : 0),
          0
        )
      : assets?.reduce(
          (acc, asset) =>
            acc +
            (asset?.property_cost?.display_value
              ? Number(asset?.property_cost?.display_value)
              : 0),
          0
        );

  const upcomingPaymentsAssets = assets?.filter(
    (asset) => asset?.asset_type !== 'owned'
  );

  return (
    <DashboardHeader title="Dashboard">
      <Box pt={[3, 0]}>
        <AccountBalance
          currency={assets[0]?.currency_meta?.display_currency}
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
