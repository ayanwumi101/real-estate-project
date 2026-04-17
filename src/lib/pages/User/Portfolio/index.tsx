'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './components/Header';
import { Box, Stack, Divider } from '@chakra-ui/react';
import { GetUserAssetsWithFilter } from '~/lib/api/services/assetsService';
import PropertyListTable from './components/PropertyDetails';
import { RemittanceSortAndFilter } from '~/lib/components/PropertyFilter';

const index = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [assets, setAssets] = useState<any[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('');
  const [order, setOrder] = useState<any>();
  const [sort, setSort] = useState<any>('');
  const [status, setStatus] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const GetAssets = async () => {
    setLoading(true);
    try {
      const res = await GetUserAssetsWithFilter({
        search: debouncedSearchQuery,
        status: status === '' ? '' : status === 'occupied' ? true : false,
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
  }, [order, sort, status, duration, debouncedSearchQuery]);

  // Debounce effect for search query
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 1000);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  // Initialize debounced search query on mount
  useEffect(() => {
    setDebouncedSearchQuery(searchQuery);
  }, []);

  const cashflowAssets = filteredAssets?.filter(
    (asset) => asset?.asset_type !== 'owned'
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
      <Stack spacing="40px" w="100%" overflow="auto" px={['16px', 0]}>
        <Header assets={cashflowAssets} />
        <Stack
          // px="10px"
          py="16px"
          spacing="13px"
          border="1px solid #E4E4E4"
          rounded="10px"
        >
          <Box px="10px">
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
          </Box>
          <Divider />
          <PropertyListTable assets={cashflowAssets} loading={loading} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default index;
