'use client';

import { Box, Flex, Heading, Button } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { FiEye } from 'react-icons/fi';
import { StatCard, AssetStatCard } from '~/lib/components/Cards';
import { FormatAmount } from '~/lib/utils/formatAmount';


const AssetsStatistics = ({
  numberOfAssets,
  assetInNaira,
  totalRemittance,
}: {
  numberOfAssets: any;
  assetInNaira: any;
  totalRemittance: any;
}) => {
  const [showTotalAsset, setShowTotalAsset] = React.useState<boolean>(true);
  const assetVisibility = Cookies.get('assetVisibility');
  return (
    <Box
      py={['20px', '40px']}
      px={['20px', '40px']}
      borderY="1px solid #E4E4E4"
      overflow={['auto', 'hidden']}
    >
      <Flex alignItems="center" gap="16px" w="100%">
        <AssetStatCard label="Total Number of Assets">
          <Heading fontWeight={500} fontSize={24} color="#222222">
            {numberOfAssets ? numberOfAssets : 0}
          </Heading>
        </AssetStatCard>
        <AssetStatCard label="Total Asset in Naira">
          <Flex
            alignItems={assetVisibility === 'true' ? 'center' : 'flex-end'}
            gap="10px"
          >
            <Heading fontWeight={500} fontSize={24} color="#222222">
              {assetVisibility === 'true'
                ? `${assetInNaira ? FormatAmount(Number(assetInNaira)) : 0.0}`
                : '********'}
            </Heading>
            <Button
              bg="none"
              p="0"
              _hover={{ bg: 'none', p: 0 }}
              onClick={() => {
                const newVisibility = !showTotalAsset;
                setShowTotalAsset(newVisibility);
                Cookies.set('assetVisibility', newVisibility.toString());
              }}
            >
              <FiEye />
            </Button>
          </Flex>
        </AssetStatCard>
        <AssetStatCard label="Total Remittance">
          <Heading fontWeight={500} fontSize={24} color="#222222">
            {totalRemittance ? FormatAmount(Number(totalRemittance)) : 0.0}
          </Heading>
        </AssetStatCard>
      </Flex>
    </Box>
  );
};

export default AssetsStatistics;
