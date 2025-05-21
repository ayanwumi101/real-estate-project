'use client';

import React, { useEffect } from 'react';
import Notes from './components/Notes';
import AssetDetails from './components/AssetDetails';
import Header from './components/Header';
import { Box, Stack, Flex } from '@chakra-ui/react';
import { GetAssetDetails } from '~/lib/api/services/assetsService';
import { useParams } from 'next/navigation';
import useNavigate from '~/lib/utils/useNavigate';

const index = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [propertyDetails, setPropertyDetails] = React.useState<any>([]);

  const getAssetDetails = async () => {
    try {
      const res = await GetAssetDetails(id);
      const data = await res.data;
      setPropertyDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAssetDetails();
  }, [id]);

  const editComment = () => {
    navigate(`/user/my-assets/${id}/update-details`);
  };

  return (
    <Box>
      <Stack>
        <Header
          propertyName={propertyDetails?.property_name}
          location={`${propertyDetails?.house_number || ''}, ${propertyDetails?.street_name || ''}, ${propertyDetails?.state_id || ''} state`}
        />
        <Box p={['20px', '40px']}>
          <Flex
            alignItems="flex-start"
            flexWrap={['wrap', 'nowrap']}
            gap="40px"
          >
            <AssetDetails propertyDetails={propertyDetails} />
            <Notes notes={propertyDetails?.comment} editComment={editComment} />
          </Flex>
        </Box>
      </Stack>
    </Box>
  );
};

export default index;
