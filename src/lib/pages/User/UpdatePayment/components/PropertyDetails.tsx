import {
  Box,
  Text,
  Heading,
  Stack,
  Flex,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';
import React from 'react';
import { LocationIcon } from '~/lib/components/Icons/Icons';
import { FormatAmount } from '~/lib/utils/formatAmount';
import { PaymentDetails } from '~/lib/api/services/dashboardService';

const PropertyDetails = ({
  paymentDetails,
  loading,
}: {
  paymentDetails: PaymentDetails;
  loading: boolean;
}) => {
  return (
    <Box w={['100%', '50%']}>
      <Stack spacing="32px" w="full">
        <Box w="full">
          {loading ? (
            <Stack spacing="13px" w="full">
              <Text fontWeight={500} color="brand.300">
                {paymentDetails?.payment?.asset_type === 'cashflow'
                  ? 'Remittance for'
                  : 'Instalment for'}
              </Text>
              <Skeleton w="95%" h="30px" rounded="3px" />
              <SkeletonText noOfLines={2} w="85%" h="50px" />
            </Stack>
          ) : (
            <Stack spacing="13px">
              <Text fontWeight={500} color="brand.300">
                {/* {assetDetails?.asset_type === 'cashflow'
                  ? 'Remittance for'
                  : 'Instalment for'} */}
              </Text>
              <Heading fontWeight={500} fontSize={24}>
                {paymentDetails?.payment?.property_name || 'Skyline Residences'}
              </Heading>
              <Flex alignItems="center" gap="10px">
                <LocationIcon />
                <Text fontWeight={500} color="brand.300">
                  {paymentDetails?.payment?.address}
                </Text>
              </Flex>
            </Stack>
          )}
        </Box>
        <Box borderBottom="1px solid" borderColor="border.100" py="20px">
          {loading ? (
            <Flex alignItems="flex-start" justifyContent="space-between">
              <SkeletonText noOfLines={2} w="250px" skeletonHeight={3} />
              <Skeleton w="150px" h="20px" rounded="3px" />
            </Flex>
          ) : (
            <Flex
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
              gap={[4, 0]}
            >
              <Stack>
                <Heading fontWeight={600} fontSize={16} color="brand.600">
                  Payment Amount{' '}
                </Heading>
                <Text fontWeight={500} fontSize={14} color="brand.300">
                  Pending payment, for this property
                </Text>
              </Stack>
              <Text fontWeight={500} color="brand.300">
                {typeof paymentDetails?.payment?.amount === 'object' &&
                paymentDetails?.payment?.amount !== null
                  ? FormatAmount(
                      Number(paymentDetails?.payment?.amount?.display_value),
                      paymentDetails?.payment?.amount?.display_currency
                    )
                  : FormatAmount(Number(paymentDetails?.payment?.amount))}
              </Text>
            </Flex>
          )}
        </Box>
        <Box borderBottom="1px solid" borderColor="border.100" py="20px">
          {loading ? (
            <Flex alignItems="flex-start" justifyContent="space-between">
              <SkeletonText noOfLines={2} w="250px" skeletonHeight={3} />
              <Skeleton w="150px" h="20px" rounded="3px" />
            </Flex>
          ) : (
            <Flex
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
              gap={[4, 0]}
            >
              <Stack>
                <Heading fontWeight={600} fontSize={16} color="brand.600">
                  Payment Type
                </Heading>
                <Text fontWeight={500} fontSize={14} color="brand.300">
                  Payment type for this property
                </Text>
              </Stack>
              <Text
                fontWeight={500}
                color="brand.300"
                textTransform="capitalize"
              >
                {paymentDetails?.payment?.payment_type}
              </Text>
            </Flex>
          )}
        </Box>
        <Box borderBottom="1px solid" borderColor="border.100" py="20px">
          {loading ? (
            <Flex alignItems="flex-start" justifyContent="space-between">
              <SkeletonText noOfLines={2} w="250px" skeletonHeight={3} />
              <Skeleton w="150px" h="20px" rounded="3px" />
            </Flex>
          ) : (
            <Flex
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
              gap={[4, 0]}
            >
              <Stack>
                <Heading fontWeight={600} fontSize={16} color="brand.600">
                  Days Overdue
                </Heading>
                <Text fontWeight={500} fontSize={14} color="brand.300">
                  Number of days overdue for this payment.
                </Text>
              </Stack>
              <Text fontWeight={500} color="brand.300">
                {paymentDetails?.payment?.days_overdue || 0} Days
              </Text>
            </Flex>
          )}
        </Box>
        <Box borderBottom="1px solid" borderColor="border.100" py="20px">
          {loading ? (
            <Flex alignItems="flex-start" justifyContent="space-between">
              <SkeletonText noOfLines={2} w="250px" skeletonHeight={3} />
              <Skeleton w="150px" h="20px" rounded="3px" />
            </Flex>
          ) : (
            <Flex
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
              gap={[4, 0]}
            >
              <Stack>
                <Heading fontWeight={600} fontSize={16} color="brand.600">
                  Payment Due Date
                </Heading>
                <Text fontWeight={500} fontSize={14} color="brand.300">
                  Date when this payment is due.
                </Text>
              </Stack>
              <Text fontWeight={500} color="brand.300">
                  {new Date(paymentDetails?.payment?.payment_due_date || '').toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
              </Text>
            </Flex>
          )}
        </Box>
        <Box borderBottom="1px solid" borderColor="border.100" py="20px">
          {loading ? (
            <Flex alignItems="flex-start" justifyContent="space-between">
              <SkeletonText noOfLines={2} w="250px" skeletonHeight={3} />
              <Skeleton w="150px" h="20px" rounded="3px" />
            </Flex>
          ) : (
            <Flex
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
              gap={[4, 0]}
            >
              <Stack>
                <Heading fontWeight={600} fontSize={16} color="brand.600">
                  Payment Interval
                </Heading>
                <Text fontWeight={500} fontSize={14} color="brand.300">
                  Payment interval for this property.
                </Text>
              </Stack>
              <Text fontWeight={500} color="brand.300" textTransform='capitalize'>
                {paymentDetails?.payment?.payment_interval || 0}
              </Text>
            </Flex>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default PropertyDetails;
