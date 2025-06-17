'use client';

import React from 'react';
import PaymentForm from './components/PaymentForm';
import PropertyDetails from './components/PropertyDetails';
import { Box, Button, Flex, Stack } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { ChevronLeftIcon } from '~/lib/components/Icons/Icons';
import useNavigate from '~/lib/utils/useNavigate';
import { GetAssetDetails } from '~/lib/api/services/assetsService';

const index = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assetDetails, setAssetDetails] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchAssetDetails = async () => {
      const details = await GetAssetDetails(id);
      setAssetDetails(details.data);
    };
    fetchAssetDetails();
  }, []);

  return (
    <Box p={['20px', '40px']} borderTop="1px solid" borderColor="border.100">
      <Stack spacing="40px" alignItems="flex-start">
        {' '}
        <Button
          onClick={() => navigate('/user/my-assets')}
          variant="ghost"
          leftIcon={<ChevronLeftIcon />}
          p="0"
          _hover={{ bg: 'none' }}
          color="brand.100"
        >
          Back
        </Button>
        <Flex
          alignItems="flex-start"
          gap="45px"
          w="full"
          flexWrap={['wrap', 'nowrap']}
        >
          <PropertyDetails assetDetails={assetDetails} />
          <PaymentForm assetId={assetDetails?.id} assetType={assetDetails?.asset_type} />
        </Flex>
      </Stack>
    </Box>
  );
};

export default index;
