'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './components/Header';
import { Box, Stack, Divider } from '@chakra-ui/react';
import { GetUserAssetsWithFilter } from '~/lib/api/services/assetsService';
import PropertyListTable from './components/PropertyDetails';
import { RemittanceSortAndFilter } from '~/lib/components/PropertyFilter';
import DashboardHeader from '~/lib/layout/components/DashboardHeader';

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
  const [errorMessages, setErrorMessages] = useState<{
    title: string;
    description: string;
  }>({ title: '', description: '' });

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

  useEffect(() => {
    const errorMessagesMap = {
      search: {
        title: 'No property matches your search query',
        description:
          'Check your spelling or try a different search term to find your property.',
      },
      status: {
        title: 'No property matches your status filter',
        description: 'Try adjusting your filters to find your property.',
      },
      duration: {
        title: 'No property matches the selected duration filter',
        description: 'Try adjusting your filters to find your property.',
      },
      none: {
        title: 'No Remittances Yet',
        description:
          'Cashflow properties will appear here once added, along with their remittance history. Add a cashflow property or update an existing asset to start tracking your income.',
      },
      default: {
        title: 'No property matches the filter criteria',
        description: 'Try adjusting your filters to find your property.',
      },
    };

    const errorMessageKey =
      debouncedSearchQuery && assets?.length < 1
        ? 'search'
        : status && assets?.length < 1
          ? 'status'
          : duration && assets?.length < 1
            ? 'duration'
            : assets?.length < 1
              ? 'none'
              : 'default';

    setErrorMessages(errorMessagesMap[errorMessageKey]);
  }, [order, sort, status, duration, debouncedSearchQuery, assets]);

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
    <DashboardHeader title="Remittance">
      <Box pb="50px" px='5'>
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
            <PropertyListTable
              assets={cashflowAssets}
              loading={loading}
              errorMessages={errorMessages}
            />
          </Stack>
        </Stack>
      </Box>
    </DashboardHeader>
  );
};

export default index;
