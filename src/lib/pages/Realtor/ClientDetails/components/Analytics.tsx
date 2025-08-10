import { Box, Flex, Stack, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { ArrowCircleUpIcon } from '~/lib/components/Icons/Icons';

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
          w="275px"
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
                    {percentageChange} <Box as="span" color='brand.400'>{changeDescription}</Box>
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
                    June 12, 2025
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

const Analytics = () => {
  return (
    <Box>
      <Flex
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        gap="16px"
      >
        <AnalyticsCard
          title="Assets Purchased"
          value={3}
          hasPercentage={false}
          lastUpdated="June 12, 2025"
        />
        <AnalyticsCard
          title="Total Asset Value"
          value="₦ 72,000,000"
          hasPercentage={false}
          lastUpdated="June 12, 2025"
        />
        <AnalyticsCard
          title="Active Investments Plan"
          value={1}
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
          value="₦ 72,000,000"
          hasPercentage={false}
          lastUpdated="June 12, 2025"
        />
        <AnalyticsCard
          title="Maturing Securities"
          value={0}
          hasPercentage={true}
          percentageChange="20%"
          changeDescription="compared to last month"
        />
        <AnalyticsCard
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
        />
      </Flex>
    </Box>
  );
};

export default Analytics;
