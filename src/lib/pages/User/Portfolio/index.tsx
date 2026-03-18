'use client';

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import { Box, Stack } from '@chakra-ui/react';
import { GetUserAssets } from '~/lib/api/services/assetsService';
import PropertyListTable from './components/PropertyDetails';
import { RemittanceSortAndFilter } from '~/lib/components/PropertyFilter';

const index = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [assets, setAssets] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [order, setOrder] = useState<any>();
  const [sort, setSort] = useState<any>('all');
  const [status, setStatus] = useState<string>('');
  const [duration, setDuration] = useState<string>('');

  const GetAssets = async () => {
    setLoading(true);
    try {
      const res = await GetUserAssets();
      setAssets(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    GetAssets();
  }, []);
  const cashflowAssets = assets?.filter(
    (asset) => asset?.asset_type === 'cashflow'
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDuration(e.target.value);
  };

  const handleSortChange = (value: string | string[]) => {
    setSort(value);
  };

  const handleOrderChange = (value: string | string[]) => {
    setOrder(value);
  };

  return (
    <Box pb="50px">
      <Stack spacing="40px" w="100%" overflow="auto">
        <Header assets={cashflowAssets} />
        <Stack px="10px" spacing="16px">
          <RemittanceSortAndFilter
            searchQuery={searchQuery}
            order={order}
            duration={duration}
            status={status}
            sort={sort}
            handleSearchChange={handleSearchChange}
            handleStatusChange={handleStatusChange}
            handleDurationChange={handleDurationChange}
            handleSortChange={handleSortChange}
            handleOrderChange={handleOrderChange}
          />
          <PropertyListTable assets={cashflowAssets} loading={loading} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default index;
