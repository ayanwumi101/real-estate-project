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

const PropertyDetails = ({
  assetDetails,
  loading,
}: {
  assetDetails: any;
  loading: boolean;
}) => {
  return (
    <Box w={['100%', '50%']}>
      <Stack spacing="32px" w="full">
        <Box w="full">
          {loading ? (
            <Stack spacing="13px" w="full">
              <Text fontWeight={500} color="brand.300">
                {assetDetails?.asset_type === 'cashflow'
                  ? 'Remittance for'
                  : 'Instalment for'}
              </Text>
              <Skeleton w="95%" h="30px" rounded="3px" />
              <SkeletonText noOfLines={2} w="85%" h="50px" />
            </Stack>
          ) : (
            <Stack spacing="13px">
              <Text fontWeight={500} color="brand.300">
                {assetDetails?.asset_type === 'cashflow'
                  ? 'Remittance for'
                  : 'Instalment for'}
              </Text>
              <Heading fontWeight={500} fontSize={24}>
                {assetDetails?.property_name || 'Skyline Residences'}
              </Heading>
              <Flex alignItems="center" gap="10px">
                <LocationIcon />
                <Text fontWeight={500} color="brand.300">
                  {`${assetDetails?.house_number}, ${assetDetails?.street_name}, ${assetDetails?.city_name}, ${assetDetails?.state_id} state.`}
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
            <Flex alignItems="center" justifyContent="space-between">
              <Stack>
                <Heading fontWeight={600} fontSize={16} color="brand.600">
                  Current{' '}
                  {assetDetails?.asset_type === 'cashflow'
                    ? 'Remittance'
                    : 'Installment'}
                </Heading>
                <Text fontWeight={500} fontSize={14} color="brand.300">
                  Each payment received for this property
                </Text>
              </Stack>
              <Text fontWeight={500} color="brand.300">
                {FormatAmount(assetDetails?.cashflow_amount || 0)}
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
            <Flex alignItems="center" justifyContent="space-between">
              <Stack>
                <Heading fontWeight={600} fontSize={16} color="brand.600">
                  {'Total ' +
                    (assetDetails?.asset_type === 'cashflow'
                      ? 'remittance'
                      : 'installment')}
                </Heading>
                <Text fontWeight={500} fontSize={14} color="brand.300">
                  All payments recieved so far for this property
                </Text>
              </Stack>
              <Text fontWeight={500} color="brand.300">
                {FormatAmount(assetDetails?.total_payment_amount || 0)}
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
            <Flex alignItems="center" justifyContent="space-between">
              <Stack>
                <Heading fontWeight={600} fontSize={16} color="brand.600">
                  Number of remittance paid
                </Heading>
                <Text fontWeight={500} fontSize={14} color="brand.300">
                  Number of times a payment was received.
                </Text>
              </Stack>
              <Text fontWeight={500} color="brand.300">
                {assetDetails?.no_of_payments || 0}
              </Text>
            </Flex>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default PropertyDetails;
