'use client';

import { Box, Stack, Flex, Button, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import AssetsStatistics from './components/AssetsStatistics';
import NavigationTab from './components/NavigationTab';
import { HiPlus } from 'react-icons/hi2';
import OwnedAssets from './components/OwnedAssets';
import Cashflow from './components/Cashflow';
import Installment from './components/Installment';
import Link from 'next/link';
import { GetUserAssets } from '~/lib/api/services/assetsService';
import { useRouter } from 'next/navigation';

const index = () => {
  const [activeTab, setActiveTab] = useState<string>('Owned');
  const [assets, setAssets] = useState<any[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [dataPerPage, setDataPerPage] = useState<number>(20);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

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

  const totalAssetsInNaira = assets?.reduce((acc, asset) => {
    return acc + Number(asset?.property_cost);
  }, 0);

  const totalRemittance = assets?.reduce((acc, asset) => {
    return acc + Number(asset?.cashflow_amount);
  }, 0);

  const totalOwnedValuation = ownedAssets?.reduce((acc, asset) => {
    return acc + Number(asset?.property_cost);
  }, 0);

  const totalCashflowValuation = cashflowAssets?.reduce((acc, asset) => {
    return acc + Number(asset?.property_cost);
  }, 0);

  const totalInstallmentValuation = installmentAssets?.reduce((acc, asset) => {
    return acc + Number(asset?.property_cost);
  }, 0);

  return (
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
              tabs={['Owned', 'Cashflow', 'Installment']}
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
  );
};

export default index;
