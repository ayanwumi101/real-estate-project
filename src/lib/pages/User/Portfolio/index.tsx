'use client';

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import { Box, Stack } from '@chakra-ui/react';
import { GetUserAssets } from '~/lib/api/services/assetsService';
import PropertyListTable from './components/PropertyDetails';

const index = () => {
  const [assets, setAssets] = useState<any[]>([]);

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

  return (
    <Box pb="50px">
      <Stack spacing="40px" w="100%" overflow="auto">
        <Header  assets={cashflowAssets}/>
        <Box px="10px">
          <PropertyListTable assets={cashflowAssets} />
        </Box>
      </Stack>
    </Box>
  );
};

export default index;
