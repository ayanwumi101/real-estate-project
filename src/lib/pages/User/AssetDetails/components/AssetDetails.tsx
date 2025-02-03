import { Box, Stack, Text, Heading, Flex } from '@chakra-ui/react';
import React from 'react';

const AssetDetailsItem = ({
  label,
  labelValue,
}: {
  label: string;
  labelValue: string;
}) => {
  return (
    <Box w={['100%', '50%']}>
      <Stack spacing="6px">
        <Text fontWeight={600} color="brand.600">
          {label}
        </Text>
        <Text fontWeight={500} color="brand.400">
          {labelValue}
        </Text>
      </Stack>
    </Box>
  );
};

const AssetDetails = () => {
  return (
    <Box>
      <Stack spacing="32px">
        {/* basic details section */}
        <Box
          border="1px solid"
          borderColor="border.100"
          p="32px"
          borderRadius="8px"
          maxW="645px"
        >
          <Heading
            pb="12px"
            borderBottom="1px solid"
            borderColor="border.100"
            fontSize={16}
            color="brand.400"
            mb="32px"
          >
            Basic Details
          </Heading>
          <Box>
            <Flex alignItems="center" flexWrap="wrap" rowGap="16px">
              <AssetDetailsItem
                label="Amount Purchased"
                labelValue="₦5,000,000"
              />
              <AssetDetailsItem
                label="When was property bought?"
                labelValue="1st of July 2024"
              />
              <AssetDetailsItem
                label="Payment Status:"
                labelValue="Completed"
              />
            </Flex>
          </Box>
        </Box>

        {/* Cashflow details */}
        <Box
          border="1px solid"
          borderColor="border.100"
          p="32px"
          borderRadius="8px"
          maxW="645px"
        >
          <Heading
            pb="12px"
            borderBottom="1px solid"
            borderColor="border.100"
            fontSize={16}
            color="brand.400"
            mb="32px"
          >
            Cashflow Details
          </Heading>
          <Box>
            <Flex alignItems="center" flexWrap="wrap" rowGap="16px">
              <AssetDetailsItem label="Cashflow Source" labelValue="Rent" />
              <AssetDetailsItem
                label="Property Currently Occupied?"
                labelValue="Yes"
              />
              <AssetDetailsItem
                label="Last Cashflow Payment"
                labelValue="10/10/2024"
              />
              <AssetDetailsItem label="Cashflow Duration" labelValue="Yearly" />
              <AssetDetailsItem
                label="Cashflow Amount"
                labelValue="₦1,500,000"
              />
              <AssetDetailsItem label="Equity Ownership" labelValue="100%" />
            </Flex>
          </Box>
        </Box>

        {/* Payment Details */}
        <Box
          border="1px solid"
          borderColor="border.100"
          p="32px"
          borderRadius="8px"
          maxW="645px"
        >
          <Heading
            pb="12px"
            borderBottom="1px solid"
            borderColor="border.100"
            fontSize={16}
            color="brand.400"
            mb="32px"
          >
            Payment Details
          </Heading>
          <Box>
            <Flex alignItems="center" flexWrap="wrap" rowGap="16px">
              <AssetDetailsItem label="Amount Paid" labelValue="₦2,500,000" />
              <AssetDetailsItem
                label="Outstanding Balance"
                labelValue="₦2,500,000"
              />
              <AssetDetailsItem label="Payment plan" labelValue="Monthly" />
              <AssetDetailsItem
                label="Installment payment"
                labelValue="₦250,000"
              />
              <AssetDetailsItem
                label="Last Payment Date"
                labelValue="10/10/2024"
              />
              <AssetDetailsItem
                label="Next Payment Date"
                labelValue="10/10/2024"
              />
              <AssetDetailsItem
                label="Duration of Payment"
                labelValue="20 Months"
              />
            </Flex>
          </Box>
        </Box>

        {/* Realtor Details */}
        <Box
          border="1px solid"
          borderColor="border.100"
          p="32px"
          borderRadius="8px"
          maxW="645px"
        >
          <Heading
            pb="12px"
            borderBottom="1px solid"
            borderColor="border.100"
            fontSize={16}
            color="brand.400"
            mb="32px"
          >
            Realtor Details
          </Heading>
          <Box>
            <Flex alignItems="center" flexWrap="wrap" rowGap="16px">
              <AssetDetailsItem
                label="Realtor Name"
                labelValue="Mr Samson Ajangbadi"
              />
              <AssetDetailsItem label="Phone Number" labelValue="08127671686" />
            </Flex>
          </Box>
        </Box>

        {/* Delivery details */}
        <Box
          border="1px solid"
          borderColor="border.100"
          p="32px"
          borderRadius="8px"
          maxW="645px"
        >
          <Heading
            pb="12px"
            borderBottom="1px solid"
            borderColor="border.100"
            fontSize={16}
            color="brand.400"
            mb="32px"
          >
            Delivery Details
          </Heading>
          <Box>
            <Flex alignItems="center" flexWrap="wrap" rowGap="16px">
              <AssetDetailsItem label="Payment Status" labelValue="Completed" />
              <AssetDetailsItem
                label="Allocation Status"
                labelValue="Completed"
              />
              <AssetDetailsItem
                label="Documentation Status"
                labelValue="Completed"
              />
              <AssetDetailsItem
                label="Handover Status"
                labelValue="Completed"
              />
            </Flex>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default AssetDetails;
