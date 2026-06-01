'use client';

import { Box, Stack, Flex, Button, Text } from '@chakra-ui/react';
import React, { Suspense, useContext, useEffect, useState } from 'react';
import AssetsStatistics from './components/AssetsStatistics';
import NavigationTab from './components/NavigationTab';
import { HiPlus } from 'react-icons/hi2';
import OwnedAssets from './components/OwnedAssets';
import Cashflow from './components/Cashflow';
import Installment from './components/Installment';
import Link from 'next/link';
import { GetUserAssets } from '~/lib/api/services/assetsService';
import { useRouter, useSearchParams } from 'next/navigation';
import DashboardHeader from '~/lib/layout/components/DashboardHeader';
import { AppContext } from '~/lib/layout';

const MyAssets = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const tabs = ['Owned', 'Cashflow', 'Installment'];
  const [activeTab, setActiveTab] = React.useState<
    'Owned' | 'Cashflow' | 'Installment'
  >('Owned');
  const [assets, setAssets] = useState<any[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [dataPerPage, setDataPerPage] = useState<number>(20);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const { selectedCurrency } = useContext(AppContext);

  const GetAssets = async () => {
    setLoading(true);
    try {
      const res = await GetUserAssets(dataPerPage, page);
      setAssets(res?.data);
      setHasNextPage(res?.meta?.last_page > 1);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setAssets([]);
      console.log(error);
    }
  };

  useEffect(() => {
    GetAssets();
  }, [page]);

  const cashflowAssets = assets?.filter(
    (asset) => asset?.asset_type === 'cashflow'
  );
  const installmentAssets = assets?.filter(
    (asset) => asset?.asset_type === 'instalment'
  );
  const ownedAssets = assets?.filter((asset) => asset?.asset_type === 'owned');

  const totalAssetsInNaira =
    selectedCurrency?.code === 'NGN'
      ? assets?.reduce((acc, asset) => {
          return acc + Number(asset?.property_cost);
        }, 0)
      : assets?.reduce((acc, asset) => {
          return acc + Number(asset?.property_cost?.display_value);
        }, 0);

  const totalRemittance = cashflowAssets?.reduce((acc, asset) => {
    return selectedCurrency?.code === 'NGN'
      ? acc + Number(asset?.cashflow_amount)
      : acc + Number(asset?.cashflow_amount?.display_value);
  }, 0);

  const totalOwnedValuation = ownedAssets?.reduce((acc, asset) => {
    return selectedCurrency?.code === 'NGN'
      ? acc + Number(asset?.property_cost)
      : acc + Number(asset?.property_cost?.display_value);
  }, 0);

  const totalCashflowValuation = cashflowAssets?.reduce((acc, asset) => {
    return selectedCurrency?.code === 'NGN'
      ? acc + Number(asset?.property_cost)
      : acc + Number(asset?.property_cost?.display_value);
  }, 0);

  const totalInstallmentValuation = installmentAssets?.reduce((acc, asset) => {
    return selectedCurrency?.code === 'NGN'
      ? acc + Number(asset?.property_cost)
      : acc + Number(asset?.property_cost?.display_value);
  }, 0);

  useEffect(() => {
    if (tab && tabs.includes(tab as string)) {
      setActiveTab(tab as 'Owned' | 'Cashflow' | 'Installment');
    } else {
      setActiveTab('Owned');
    }
  }, [tab, tabs]);

  return (
    <DashboardHeader title="My Assets">
      <Box pb="40px" overflow="auto">
        <Stack w="100%">
          <AssetsStatistics
            numberOfAssets={assets?.length}
            assetInNaira={totalAssetsInNaira}
            totalRemittance={totalRemittance}
          />
          <Box px={['10px', '30px']} mb={[5, 0]}>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              flexWrap={['wrap', 'nowrap']}
            >
              <NavigationTab
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                ownedAssetsCount={ownedAssets?.length}
                cashflowAssetsCount={cashflowAssets?.length}
                installmentAssetsCount={installmentAssets?.length}
                totalOwnedValuation={totalOwnedValuation}
                totalCashflowValuation={totalCashflowValuation}
                totalInstallmentValuation={totalInstallmentValuation}
              />
            </Flex>
          </Box>
          <Box px={['10px', '20px']}>
            {activeTab === 'Owned' && (
              <OwnedAssets
                assets={ownedAssets}
                setAssets={setAssets}
                loading={loading}
                page={page}
                setPage={setPage}
                dataPerPage={dataPerPage}
                hasNextPage={hasNextPage}
              />
            )}
            {activeTab === 'Cashflow' && (
              <Cashflow
                assets={cashflowAssets}
                setAssets={setAssets}
                loading={loading}
                page={page}
                setPage={setPage}
                hasNextPage={hasNextPage}
                dataPerPage={dataPerPage}
              />
            )}
            {activeTab === 'Installment' && (
              <Installment
                assets={installmentAssets}
                setAssets={setAssets}
                loading={loading}
                page={page}
                setPage={setPage}
                hasNextPage={hasNextPage}
                dataPerPage={dataPerPage}
              />
            )}
          </Box>
        </Stack>
      </Box>
    </DashboardHeader>
  );
};

const Index = () => {
  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <MyAssets />
    </Suspense>
  );
};

export default Index;
