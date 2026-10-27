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
import { GetDashboardUpcomingPayments } from '~/lib/api/services/dashboardService';
import {
  UpcomingPayment,
  UpcomingPaymentSummary,
} from '~/lib/api/services/dashboardService';

const index = () => {
  const { selectedCurrency } = useContext(AppContext);
  const [page, setPage] = useState<number>(1);
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [assets, setAssets] = React.useState<any>(null);
  const [dashboardUpcomingPayments, setDashboardUpcomingPayments] =
    React.useState<UpcomingPayment[]>([]);
  const [
    dashboardUpcomingPaymentsSummary,
    setDashboardUpcomingPaymentsSummary,
  ] = React.useState<UpcomingPaymentSummary>({} as UpcomingPaymentSummary);
  const [assetType, setAssetType] = useState<
    'all' | 'remittance' | 'instalment'
  >('all');
  const [paymentType, setPaymentType] = useState<'all' | 'due' | 'upcoming'>(
    'all'
  );


  const GetDashboardData = async () => {
    setLoading(true);
    try {
      const [res, paymentResponse] = await Promise.all([
        GetUserAssets(dataPerPage, page),
        GetDashboardUpcomingPayments({
          filter: paymentType,
          type: assetType === 'all' ? undefined : assetType,
          page: page,
          per_page: dataPerPage,
        }),
      ]);
      setAssets(res);
      setDashboardUpcomingPayments(paymentResponse.data);
      setDashboardUpcomingPaymentsSummary(paymentResponse.summary);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    GetDashboardData();
  }, [assetType, paymentType, page, dataPerPage]);

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
        <UpcomingPayments
          loading={loading}
          payments={dashboardUpcomingPayments}
          summary={dashboardUpcomingPaymentsSummary}
          assetType={assetType}
          setAssetType={setAssetType}
          paymentType={paymentType}
          setPaymentType={setPaymentType}
        />
      </Box>
    </DashboardHeader>
  );
};

export default index;
