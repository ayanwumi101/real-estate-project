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
  Skeleton,
  SkeletonText,
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
      <Stack spacing="8px">
        <Text fontWeight={600} color="brand.600" fontSize={15}>
          {label}
        </Text>
        <Text fontWeight={500} color="brand.400" fontSize={15}>
          {labelValue}
        </Text>
      </Stack>
    </Box>
  );
};

const AssetDetails = ({
  propertyDetails,
  loading,
}: {
  propertyDetails: any;
  loading: boolean;
}) => {
  return (
    <Box w={['full', '65%']}>
      {loading ? (
        <Stack w="full" spacing="32px">
          <Skeleton rounded="8px" w="full" h="270px"></Skeleton>
          <Skeleton rounded="8px" w="full" h="270px"></Skeleton>
          <Skeleton rounded="8px" w="full" h="270px"></Skeleton>
        </Stack>
      ) : (
        <Stack spacing="32px" w="full">
          {/* basic details section */}
          <Box
            border="1px solid"
            borderColor="border.100"
            p="32px"
            borderRadius="8px"
            maxW="full"
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
              <Flex alignItems="center" flexWrap="wrap" rowGap="20px">
                <AssetDetailsItem
                  label="Property Size"
                  labelValue={
                    propertyDetails?.size ? propertyDetails?.size : 'N/A'
                  }
                />
                <AssetDetailsItem
                  label="Property Type"
                  labelValue={propertyDetails?.asset_type || 'N/A'}
                />
                <AssetDetailsItem
                  label="When was property bought?"
                  labelValue={
                    propertyDetails?.bought_date
                      ? moment(propertyDetails?.bought_date).format(
                          'ddd, Do MMMM YYYY'
                        )
                      : 'N/A'
                  }
                />
                <AssetDetailsItem
                  label="Amount Purchased"
                  labelValue={FormatAmount(
                    propertyDetails?.property_cost || 0.0
                  )}
                />
              </Flex>
            </Box>
          </Box>

          {/* Cashflow details */}
          {propertyDetails?.asset_type === 'cashflow' && (
            <Box
              border="1px solid"
              borderColor="border.100"
              p="32px"
              borderRadius="8px"
              w="full"
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
                <Flex alignItems="center" flexWrap="wrap" rowGap="20px">
                  <AssetDetailsItem
                    label="Cashflow Source"
                    labelValue={propertyDetails?.cashflow_source || 'N/A'}
                  />
                  <AssetDetailsItem
                    label="Property Currently Occupied?"
                    labelValue={propertyDetails?.is_occupied ? 'Yes' : 'No'}
                  />
                  <AssetDetailsItem
                    label="Remittance Value"
                    labelValue={FormatAmount(
                      propertyDetails?.cashflow_amount || 0.0
                    )}
                  />
                  <AssetDetailsItem
                    label="Cashflow Duration of Yield"
                    labelValue={propertyDetails?.cashflow_duration || 'N/A'}
                  />
                  <AssetDetailsItem
                    label="Last Remittance Payment"
                    labelValue={
                      propertyDetails?.last_cashflow_date
                        ? moment(propertyDetails?.last_cashflow_date).format(
                            'ddd, Do MMMM YYYY'
                          )
                        : 'Never Collected'
                    }
                  />
                  <AssetDetailsItem
                    label="Next Remittance Due"
                    labelValue={
                      propertyDetails?.last_cashflow_date
                        ? moment(propertyDetails?.cashflow_payment_due).format(
                            'ddd, Do MMMM YYYY'
                          )
                        : 'Never Collected'
                    }
                  />
                </Flex>
              </Box>
            </Box>
          )}

          {/* Payment Details */}
          {propertyDetails?.asset_type === 'instalment' && (
            <Box
              border="1px solid"
              borderColor="border.100"
              p="32px"
              borderRadius="8px"
              w="full"
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
                    label="Amount Paid"
                    labelValue={FormatAmount(
                      Number(propertyDetails?.amount_paid || 0.0)
                    )}
                  />
                  <AssetDetailsItem
                    label="Outstanding Balance"
                    labelValue={FormatAmount(
                      Number(propertyDetails?.amount_left || 0.0)
                    )}
                  />
                  <AssetDetailsItem
                    label="Payment plan"
                    labelValue={propertyDetails?.payment_plan || 'N/A'}
                  />
                  <AssetDetailsItem
                    label="Installment payment"
                    labelValue={FormatAmount(
                      Number(propertyDetails?.amount_paid) || 0.0
                    )}
                  />
                  <AssetDetailsItem
                    label="Last Payment Date"
                    labelValue={
                      propertyDetails?.payment_date
                        ? moment(propertyDetails?.payment_date).format(
                            'ddd, Do MMMM YYYY'
                          )
                        : 'N/A'
                    }
                  />
                  <AssetDetailsItem
                    label={
                      propertyDetails?.asset_type === 'cashflow'
                        ? 'Next Payment Date'
                        : 'Next Instalment Payment'
                    }
                    labelValue={
                      propertyDetails?.due_date
                        ? moment(propertyDetails?.due_date).format(
                            'ddd, Do MMMM YYYY'
                          )
                        : 'N/A'
                    }
                  />
                  <AssetDetailsItem
                    label="Duration of Payment"
                    labelValue={propertyDetails?.duration || 'N/A'}
                  />
                </Flex>
              </Box>
            </Box>
          )}

          {/* Realtor Details */}
          <Box
            border="1px solid"
            borderColor="border.100"
            p="32px"
            borderRadius="8px"
            w="full"
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
                  labelValue={propertyDetails?.realtor_name || 'N/A'}
                />
                <AssetDetailsItem
                  label="Phone Number"
                  labelValue={
                    propertyDetails?.realtor_phone?.startsWith('234')
                      ? `+${propertyDetails?.realtor_phone}`
                      : propertyDetails?.realtor_phone
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
            w="full"
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
                        : 'Ongoing'
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
          </Box>
        </Stack>
      )}
    </Box>
  );
};

export default AssetDetails;
