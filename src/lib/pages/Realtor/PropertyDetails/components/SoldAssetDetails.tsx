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
        <Text fontWeight={500} textTransform="capitalize" color="brand.400">
          {labelValue}
        </Text>
      </Stack>
    </Box>
  );
};

const SoldAssetDetails = ({ propertyDetails }: { propertyDetails: any }) => {
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
                labelValue={propertyDetails?.property_size || 'N/A'}
              />
              <AssetDetailsItem
                label="Property Type"
                labelValue={propertyDetails?.property_type || 'N/A'}
              />
              <AssetDetailsItem
                label="Sales Price"
                labelValue={FormatAmount(propertyDetails?.sale_price || 0.0)}
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
                labelValue={propertyDetails?.payment_plan}
              />
              <AssetDetailsItem
                label="Duration of Payment"
                labelValue={`${propertyDetails?.payment_duration ? propertyDetails?.payment_duration : 0} Months`}
              />
              <AssetDetailsItem
                label="Amount Paid"
                labelValue={FormatAmount(
                  Number(propertyDetails?.amount_paid_total) || 0.0
                )}
              />
              <AssetDetailsItem
                label="Outstanding Balance"
                labelValue={FormatAmount(
                  Number(propertyDetails?.outstanding_balance) || 0.0
                )}
              />
              <AssetDetailsItem
                label="Instalment Payment"
                labelValue={propertyDetails?.instalment_payment || 'N/A'}
              />
              <AssetDetailsItem
                label="Total Commission Earned"
                labelValue={FormatAmount(
                  Number(propertyDetails?.total_commission) || 0.0
                )}
              />
              <AssetDetailsItem
                label="Last Instalment Payment"
                labelValue={
                  propertyDetails?.last_instalment_payment
                    ? moment(propertyDetails?.last_instalment_payment).format(
                        'ddd, Do MMMM YYYY'
                      )
                    : 'N/A'
                }
              />
              <AssetDetailsItem
                label="Next Instalment Payment"
                labelValue={
                  propertyDetails?.next_instalment_payment
                    ? moment(propertyDetails?.next_instalment_payment).format(
                        'ddd, Do MMMM YYYY'
                      )
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
                labelValue={propertyDetails?.client_name || 'N/A'}
              />
              <AssetDetailsItem
                label="Phone Number"
                labelValue={
                  propertyDetails?.client_phone?.startsWith('234')
                    ? `+${propertyDetails?.client_phone}`
                    : propertyDetails?.client_phone || 'N/A'
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
              <AssetDetailsItem label="Payment Status" labelValue={'Ongoing'} />
              <AssetDetailsItem
                label="Allocation Status"
                labelValue={
                  propertyDetails?.allocation_status
                    ? propertyDetails?.allocation_status
                    : 'N/A'
                }
              />
              <AssetDetailsItem
                label="Documentation Status"
                labelValue={
                  propertyDetails?.documentation_status
                    ? propertyDetails?.documentation_status
                    : 'N/A'
                }
              />
              <AssetDetailsItem
                label="Handover Status"
                labelValue={
                  propertyDetails?.handover_status
                    ? propertyDetails?.handover_status
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

export default SoldAssetDetails;
