import { Box, Text, Heading, Stack, Flex } from '@chakra-ui/react';
import React from 'react';
import { LocationIcon } from '~/lib/components/Icons/Icons';
import { FormatAmount } from '~/lib/utils/formatAmount';

const PropertyDetails = ({ assetDetails }: { assetDetails: any }) => {
  return (
    <Box w={['100%', '50%']}>
      <Stack spacing="32px">
        <Box>
          <Stack spacing="13px">
            <Text fontWeight={500} color="brand.300">
              {assetDetails?.asset_type === 'cashflow' ? "Remittance for" : "Instalment for"}
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
        </Box>
        <Box borderBottom="1px solid" borderColor="border.100" py="20px">
          <Flex alignItems="center" justifyContent="space-between">
            <Stack>
              <Heading fontWeight={600} fontSize={16} color="brand.600">
                Current {assetDetails?.asset_type === 'cashflow' ? "Remittance" : "Installment"}
              </Heading>
              <Text fontWeight={500} fontSize={14} color="brand.300">
                All payments received in this entry
              </Text>
            </Stack>
            <Text fontWeight={500} color="brand.300">
              {FormatAmount(assetDetails?.cashflow_amount || 0)}
            </Text>
          </Flex>
        </Box>
        <Box borderBottom="1px solid" borderColor="border.100" py="20px">
          <Flex alignItems="center" justifyContent="space-between">
            <Stack>
              <Heading fontWeight={600} fontSize={16} color="brand.600">
                {"Total " + (assetDetails?.asset_type === 'cashflow' ? "remittance" : "installment")}
              </Heading>
              <Text fontWeight={500} fontSize={14} color="brand.300">
                All payments received so far for this property
              </Text>
            </Stack>
            <Text fontWeight={500} color="brand.300">
              {FormatAmount(assetDetails?.total_remittance_amount || 0)}
            </Text>
          </Flex>
        </Box>
        <Box borderBottom="1px solid" borderColor="border.100" py="20px">
          <Flex alignItems="center" justifyContent="space-between">
            <Stack>
              <Heading fontWeight={600} fontSize={16} color="brand.600">
                Number of months paid
              </Heading>
              <Text fontWeight={500} fontSize={14} color="brand.300">
                All of times a payment was received
              </Text>
            </Stack>
            <Text fontWeight={500} color="brand.300">
              {assetDetails?.No_of_payments || 0}
            </Text>
          </Flex>
        </Box>
      </Stack>
    </Box>
  );
};

export default PropertyDetails;
