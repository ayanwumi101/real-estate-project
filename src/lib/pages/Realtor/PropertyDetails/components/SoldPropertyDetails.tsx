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
import { SoldPropertyDetails as SoldPropertiesDetailsType } from '~/lib/utils/types';

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
        <Text fontWeight={500} textTransform="capitalize" color="brand.400">
          {labelValue}
        </Text>
      </Stack>
    </Box>
  );
};

const SoldPropertyDetails = ({
  propertyDetails,
}: {
  propertyDetails: SoldPropertiesDetailsType;
}) => {
  console.log(propertyDetails);
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
                label="Property Size"
                labelValue={propertyDetails?.property?.size || 'N/A'}
              />
              <AssetDetailsItem
                label="Property Type"
                labelValue={propertyDetails?.property?.property_type || 'N/A'}
              />
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
            <Flex alignItems="center" flexWrap="wrap" rowGap="25px">
              <AssetDetailsItem
                label="Date of Sale"
                labelValue={
                  propertyDetails?.sale_info?.date_sold
                    ? moment(propertyDetails?.sale_info?.date_sold).format(
                        'ddd, Do MMMM YYYY'
                      )
                    : 'N/A'
                }
              />
              <AssetDetailsItem
                label="Sales Price"
                labelValue={FormatAmount(
                  Number(
                    propertyDetails?.sale_info?.amount_sold ||
                      propertyDetails?.sale_info?.amount_sold ||
                      0.0
                  )
                )}
              />
              <AssetDetailsItem
                label="Total Commission Earned"
                labelValue={FormatAmount(
                  propertyDetails?.totals?.total_commission || 0.0
                )}
              />
            </Flex>
          </Box>
        </Box>

        {/* Client Details */}
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
            Client Details
          </Heading>

          <Box>
            <Flex alignItems="center" flexWrap="wrap" rowGap="16px">
              <AssetDetailsItem
                label="Client Name"
                labelValue={
                  propertyDetails?.client?.firstname &&
                  propertyDetails?.client?.lastname
                    ? `${propertyDetails?.client?.firstname} ${propertyDetails?.client?.lastname}`
                    : 'N/A'
                }
              />
              <AssetDetailsItem
                label="Phone Number"
                labelValue={
                  propertyDetails?.client?.phone?.startsWith('234')
                    ? `+${propertyDetails?.client?.phone}`
                    : propertyDetails?.client?.phone || 'N/A'
                }
              />
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
            Delivery Status
          </Heading>

          <Box>
            <Flex alignItems="center" flexWrap="wrap" rowGap="16px">
              <AssetDetailsItem
                label="Payment Status"
                labelValue={
                  propertyDetails?.delivery_details?.payment_status || 'N/A'
                }
              />
              <AssetDetailsItem
                label="Allocation Status"
                labelValue={
                  propertyDetails?.delivery_details?.allocation_status
                    ? propertyDetails?.delivery_details?.allocation_status
                    : 'N/A'
                }
              />
              <AssetDetailsItem
                label="Documentation Status"
                labelValue={
                  propertyDetails?.delivery_details?.documentation_status
                    ? propertyDetails?.delivery_details?.documentation_status
                    : 'N/A'
                }
              />
              <AssetDetailsItem
                label="Handover Status"
                labelValue={
                  propertyDetails?.delivery_details?.handover_status
                    ? propertyDetails?.delivery_details?.handover_status
                    : 'N/A'
                }
              />
            </Flex>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default SoldPropertyDetails;
