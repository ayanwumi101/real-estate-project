'use client';

import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import PaymentsTable from './components/PaymentsTable';
import { Box } from '@chakra-ui/react';
import Stats from './components/Stats';
import { GetAssetDetails } from '~/lib/api/services/assetsService';
import { useParams } from 'next/navigation';

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
    <Box>
      <Header assetDetails={assetDetails} />
      <Stats assetDetails={assetDetails} />
      <PaymentsTable assetDetails={assetDetails} loading={loading} />
    </Box>
  );
};

export default index;
