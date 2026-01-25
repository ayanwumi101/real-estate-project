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
import { InstalmentPropertyDetails } from '~/lib/utils/types';

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

const InstalmentAssetDetails = ({
  propertyDetails,
}: {
  propertyDetails: InstalmentPropertyDetails;
}) => {
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
              <AssetDetailsItem
                label="Sales Price"
                labelValue={FormatAmount(
                  Number(propertyDetails?.sale_information?.sale_price || 0.0)
                )}
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
            <Flex alignItems="center" flexWrap="wrap" rowGap="16px">
              <AssetDetailsItem
                label="Payment Plan"
                labelValue={
                  propertyDetails?.sale_information?.payment_plan || 'N/A'
                }
              />
              <AssetDetailsItem
                label="Duration of Payment"
                labelValue={`${propertyDetails?.sale_information?.duration || propertyDetails?.duration_in_months || 0} Months`}
              />
              <AssetDetailsItem
                label="Amount Paid"
                labelValue={FormatAmount(
                  Number(propertyDetails?.payment_details?.total_amount_paid) ||
                    0.0
                )}
              />
              <AssetDetailsItem
                label="Outstanding Balance"
                labelValue={FormatAmount(
                  Number(
                    propertyDetails?.payment_details?.outstanding_balance
                  ) || 0.0
                )}
              />
              <AssetDetailsItem
                label="Instalment Payment"
                labelValue={FormatAmount(
                  Number(
                    propertyDetails?.next_instalment_payment?.amount_due
                  ) || 0.0
                )}
              />
              <AssetDetailsItem
                label="Total Commission Earned"
                labelValue={FormatAmount(
                  Number(
                    propertyDetails?.payment_details?.total_commissioned_earned
                  ) || 0.0
                )}
              />
              <AssetDetailsItem
                label="Last Instalment Payment"
                labelValue={
                  propertyDetails?.last_instalment_payment
                    ? moment(
                        propertyDetails?.last_instalment_payment?.payment_date
                      ).format('ddd, Do MMMM YYYY')
                    : 'N/A'
                }
              />
              <AssetDetailsItem
                label="Next Instalment Payment"
                labelValue={
                  propertyDetails?.next_instalment_payment
                    ? moment(
                        propertyDetails?.next_instalment_payment?.due_date
                      ).format('ddd, Do MMMM YYYY')
                    : 'N/A'
                }
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
                  `${propertyDetails?.client?.firstname} ${propertyDetails?.client?.lastname}` ||
                  'N/A'
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
              <AssetDetailsItem label="Payment Status" labelValue={'Ongoing'} />
              <AssetDetailsItem
                label="Allocation Status"
                labelValue={
                  propertyDetails?.delivery_status?.allocation_status
                    ? propertyDetails?.delivery_status?.allocation_status
                    : 'N/A'
                }
              />
              <AssetDetailsItem
                label="Documentation Status"
                labelValue={
                  propertyDetails?.delivery_status?.documentation_status
                    ? propertyDetails?.delivery_status?.documentation_status
                    : 'N/A'
                }
              />
              <AssetDetailsItem
                label="Handover Status"
                labelValue={
                  propertyDetails?.delivery_status?.handover_status
                    ? propertyDetails?.delivery_status?.handover_status
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

export default InstalmentAssetDetails;
