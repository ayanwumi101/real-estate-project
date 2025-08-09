'use client';

import { Box, Flex, Stack } from '@chakra-ui/react';
import React, { useContext, createContext } from 'react';
import OwnedAssetFlow from './components/OwnedAssetFlow';

export const CreateAssetContext = createContext<any>({});

const Index = () => {
  const [assetType, setAssetType] = React.useState('');
  const [assetData, setAssetData] = React.useState<any>({});
  return (
    <Box borderTop="1px solid #E4E4E4" py="40px" px={['20px', '55px']}>
      <Stack spacing="24px">
        <CreateAssetContext.Provider
          value={{
            assetType,
            setAssetType,
            assetData,
            setAssetData,
          }}
        >
          <Box w={['100%', '65%', '65%']} mx="auto">
            <OwnedAssetFlow />
          </Box>
        </CreateAssetContext.Provider>
      </Stack>
    </Box>
  );
};

export default Index;
