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
  const [filteredAssets, setFilteredAssets] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [order, setOrder] = useState<any>();
  const [sort, setSort] = useState<any>('all');
  const [status, setStatus] = useState<string>('');
  const [duration, setDuration] = useState<string>('');

  const GetAssets = async () => {
    setLoading(true);
    try {
      const res = await GetUserAssets({
        status: status,
        duration: duration,
        sort_by: sort,
        sort_order: order,
      });
      setAssets(res.data);
      setFilteredAssets(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    GetAssets();
  }, [order, sort, status, duration]);

  const cashflowAssets = filteredAssets?.filter(
    (asset) => asset?.asset_type === 'cashflow'
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const newAssets = assets.filter((asset) =>
      asset?.property_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAssets(newAssets);
  }, [searchQuery]);

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
