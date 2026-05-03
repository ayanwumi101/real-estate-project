'use client';

import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import PaymentsTable from './components/PaymentsTable';
import { Box } from '@chakra-ui/react';
import Stats from './components/Stats';
import { GetAssetDetails } from '~/lib/api/services/assetsService';
import { useParams } from 'next/navigation';
import DashboardHeader from '~/lib/layout/components/DashboardHeader';

const index = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [assetDetails, setAssetDetails] = useState<any[]>([]);

  const getAssetDetails = async () => {
    setLoading(true);
    try {
      const res = await GetAssetDetails(id as string);
      const data = await res.data;
      setAssetDetails(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAssetDetails();
  }, [id]);
  return (
    <DashboardHeader title='Payment History'>
      <Box>
        <Header assetDetails={assetDetails} loading={loading} />
        <Box px="15px" w="full">
          <Stats assetDetails={assetDetails} loading={loading} />
          <PaymentsTable assetDetails={assetDetails} loading={loading} />
        </Box>
      </Box>
    </DashboardHeader>
  );
};

export default index;
