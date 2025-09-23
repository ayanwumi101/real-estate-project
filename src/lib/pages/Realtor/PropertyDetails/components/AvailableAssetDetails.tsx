import {
  Box,
  Stack,
  Text,
  Heading,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import { FormatAmount } from '~/lib/utils/formatAmount';

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

const AvailableAssetDetails = ({
  propertyDetails,
}: {
  propertyDetails: any;
}) => {
  return (
    <Box w={['full', '60%']}>
      <Stack spacing="32px">
        {/* basic details section */}
        <Box
          border="1px solid"
          borderColor="border.100"
          p="32px"
          borderRadius="8px"
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
                label="Property Size"
                labelValue={propertyDetails?.size || 'N/A'}
              />
              <AssetDetailsItem
                label="Property Type"
                labelValue={propertyDetails?.property_type || 'N/A'}
              />
              <AssetDetailsItem
                label="Sale Price"
                labelValue={FormatAmount(propertyDetails?.property_cost || 0.0)}
              />
            </Flex>
          </Box>
        </Box>
        {/* Delivery details */}
        {/* <Box
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
            Delivery Status
          </Heading>

          <Box>
            <Flex alignItems="center" flexWrap="wrap" rowGap="16px">
              <AssetDetailsItem
                label="Payment Status"
                labelValue={
                  propertyDetails?.asset_type === 'instalment'
                    ? 'Ongoing'
                    : propertyDetails?.asset_type === 'owned'
                      ? 'Completed'
                      : 'Completed'
                }
              />
              <AssetDetailsItem
                label="Allocation Status"
                labelValue={
                  propertyDetails?.allocation_status
                    ? propertyDetails?.allocation_status
                    : propertyDetails?.asset_type === 'cashflow'
                      ? 'Completed'
                      : 'N/A'
                }
              />
              <AssetDetailsItem
                label="Documentation Status"
                labelValue={
                  propertyDetails?.documentation_status
                    ? propertyDetails?.documentation_status
                    : propertyDetails?.asset_type === 'cashflow'
                      ? 'Completed'
                      : 'N/A'
                }
              />
              <AssetDetailsItem
                label="Handover Status"
                labelValue={
                  propertyDetails?.handover_status
                    ? propertyDetails?.handover_status
                    : propertyDetails?.asset_type === 'cashflow'
                      ? 'Completed'
                      : 'N/A'
                }
              />
            </Flex>
          </Box>
        </Box> */}
      </Stack>
    </Box>
  );
};

export default AvailableAssetDetails;
