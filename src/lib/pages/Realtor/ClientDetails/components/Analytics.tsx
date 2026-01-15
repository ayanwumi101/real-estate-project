import { Box, Flex, Stack, Heading, Text } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import { ArrowCircleUpIcon } from '~/lib/components/Icons/Icons';
import SkeletonLoader from '~/lib/components/SkeletonLoader';
import { FormatAmount, formatCurrency } from '~/lib/utils/formatAmount';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  lastUpdated?: string;
  hasPercentage: boolean;
  percentageChange?: string;
  changeDescription?: string;
}

const AnalyticsCard = ({
  title,
  value,
  lastUpdated,
  hasPercentage,
  percentageChange,
  changeDescription,
}: AnalyticsCardProps) => {
  return (
    <Box>
      <Flex
        w="full"
        alignItems="center"
        justifyContent="space-between"
        gap="16px"
        overflow="auto"
      >
        {/* first card */}
        <Box
          w="290px"
          h="auto"
          rounded="5px"
          border="1px solid"
          borderColor="border.100"
        >
          <Stack>
            <Box px="16px" py="12px">
              {' '}
              <Text mb="16px" fontSize={16} fontWeight={500} color="brand.600">
                {title}
              </Text>
              <Heading fontSize={24} fontWeight={500}>
                {value}
              </Heading>
            </Box>
            {hasPercentage ? (
              <Box
                px="16px"
                py="12px"
                borderTop="1px solid"
                borderColor="border.100"
                fontWeight={500}
                fontSize={14}
              >
                <Flex alignItems="center" gap="6px">
                  <ArrowCircleUpIcon />
                  <Text fontSize={14} fontWeight={500} color="brand.100">
                    {percentageChange}{' '}
                    <Box as="span" color="brand.400">
                      {changeDescription}
                    </Box>
                  </Text>
                </Flex>
              </Box>
            ) : (
              <Box
                px="16px"
                py="12px"
                borderTop="1px solid"
                borderColor="border.100"
                fontWeight={500}
                fontSize={14}
              >
                <Text>
                  Last Updated:{' '}
                  <Box as="span" color="brand.100">
                    {lastUpdated}
                  </Box>
                </Text>
              </Box>
            )}
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

const Analytics = ({
  analytics,
  loading,
}: {
  analytics: any;
  loading: boolean;
}) => {
  return (
    <Box>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <Flex
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap="20px"
        >
          <AnalyticsCard
            title="Assets Purchased"
            value={analytics?.total_assets_purchased || 0}
            hasPercentage={false}
            lastUpdated={moment(new Date().toISOString()).format('LL')}
          />
          <AnalyticsCard
            title="Total Asset Value"
            value={FormatAmount(analytics?.total_asset_value || 0)}
            hasPercentage={false}
            lastUpdated={moment(new Date().toISOString()).format('LL')}
          />
          <AnalyticsCard
            title="Active Investments Plan"
            value={analytics?.active_instalment_plans || 0}
            hasPercentage={true}
            percentageChange="5%"
            changeDescription="compared to last month"
          />
          <AnalyticsCard
            title="maturing Securities"
            value={0}
            hasPercentage={true}
            percentageChange="20%"
            changeDescription="compared to last month"
          />
          <AnalyticsCard
            title="Total Commission Generated"
            value={FormatAmount(
              Number(analytics?.total_commission_generated || 0)
            )}
            hasPercentage={false}
            lastUpdated="June 12, 2025"
          />
          {/* <AnalyticsCard
          title="Maturing Securities"
          value={0}
          hasPercentage={true}
          percentageChange="20%"
          changeDescription="compared to last month"
        /> */}
          {/* <AnalyticsCard
          title="Assets Purchased"
          value={3}
          hasPercentage={false}
          lastUpdated="June 12, 2025"
        />
        <AnalyticsCard
          title="Maturing Securities"
          value={0}
          hasPercentage={true}
          percentageChange="20%"
          changeDescription="compared to last month"
        /> */}
        </Flex>
      )}
    </Box>
  );
};

export default Analytics;
