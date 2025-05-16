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

  const GetAssets = async () => {
    try {
      const res = await GetUserAssets();
      setAssets(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetAssets();
  }, []);

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
            />
          </Flex>
        </Box>
        <Box px={['10px', '20px']}>
          {activeTab === 'Owned' && (
            <OwnedAssets assets={ownedAssets} setAssets={setAssets} />
          )}
          {activeTab === 'Installment' && (
            <Installment assets={installmentAssets} />
          )}
          {activeTab === 'Cashflow' && (
            <Cashflow assets={cashflowAssets} setAssets={setAssets} />
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default index;
