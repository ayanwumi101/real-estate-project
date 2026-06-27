'use client';

import { Box, Flex, Heading, Button, Badge } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import React, { useEffect, useContext } from 'react';
import { FiEye } from 'react-icons/fi';
import { StatCard, AssetStatCard } from '~/lib/components/Cards';
import {
  ValuationDecrementIcon,
  ValuationIncrementIcon,
} from '~/lib/components/Icons/Icons';
import { AppContext } from '~/lib/layout';
import { FormatAmount } from '~/lib/utils/formatAmount';

const AssetsStatistics = ({
  numberOfAssets,
  assetInNaira,
  totalRemittance,
  totalAssetValuation,
  appreciationMargin,
  appreciationDirection,
  appreciationPercent,
}: {
  numberOfAssets: any;
  assetInNaira: any;
  totalRemittance: any;
  totalAssetValuation: any;
  appreciationMargin: any;
  appreciationPercent: number;
  appreciationDirection: 'increase' | 'decrease';
}) => {
  const [showTotalAsset, setShowTotalAsset] = React.useState<boolean>(
    Cookies.get('assetVisibility') === 'true'
  );
  const { selectedCurrency } = useContext(AppContext);
  return (
    <Box
      py={['20px', '40px']}
      px={['20px', '40px']}
      borderBottom="1px solid #E4E4E4"
      overflow={['auto', 'hidden']}
    >
      <Flex
        alignItems="center"
        gap="16px"
        w="100%"
        flexWrap={['nowrap', 'wrap']}
      >
        <AssetStatCard label="Total Number of Assets">
          <Heading fontWeight={500} fontSize={24} color="#222222">
            {numberOfAssets ? numberOfAssets : 0}
          </Heading>
        </AssetStatCard>
        <AssetStatCard label={`Total Investments in ${selectedCurrency?.code}`}>
          <Flex alignItems={showTotalAsset ? 'center' : 'flex-end'} gap="10px">
            <Heading fontWeight={500} fontSize={24} color="#222222">
              {showTotalAsset
                ? `${assetInNaira ? FormatAmount(Number(assetInNaira), selectedCurrency?.code) : 0.0}`
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
        <AssetStatCard
          label={`Current Asset Valuation in ${selectedCurrency?.code}`}
        >
          <Flex alignItems={showTotalAsset ? 'center' : 'flex-end'} gap="10px">
            <Heading fontWeight={500} fontSize={24} color="#222222">
              {showTotalAsset
                ? `${totalAssetValuation ? FormatAmount(Number(totalAssetValuation), selectedCurrency?.code) : 0.0}`
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
        <AssetStatCard
          label={`Appreciation Margin in ${selectedCurrency?.code}`}
        >
          <Flex alignItems="cnter" gap="16px">
            <Heading fontWeight={500} fontSize={24} color="#222222">
              {appreciationMargin
                ? FormatAmount(
                    Number(appreciationMargin),
                    selectedCurrency?.code
                  )
                : 0.0}
            </Heading>
            <Badge
              color={
                appreciationDirection === 'decrease' ? 'color.600' : 'color.700'
              }
              border="1px solid"
              borderColor={
                appreciationDirection === 'decrease'
                  ? 'color.600'
                  : 'border.300'
              }
              bg={
                appreciationDirection === 'decrease'
                  ? 'border.400'
                  : 'border.500'
              }
              p="4px 10px 0px 10px"
              rounded="20px"
            >
              <Flex alignItems="center" justifyContent="center" gap="3px">
                {appreciationDirection === 'increase' ? (
                  <ValuationIncrementIcon />
                ) : (
                  <ValuationDecrementIcon />
                )}
                ({appreciationPercent}%)
              </Flex>
            </Badge>
          </Flex>
        </AssetStatCard>
        <AssetStatCard label="Total Remittance">
          <Heading fontWeight={500} fontSize={24} color="#222222">
            {totalRemittance
              ? FormatAmount(Number(totalRemittance), selectedCurrency?.code)
              : 0.0}
          </Heading>
        </AssetStatCard>
      </Flex>
    </Box>
  );
};

export default AssetsStatistics;
