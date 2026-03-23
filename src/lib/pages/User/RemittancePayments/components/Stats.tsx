import { Flex, Box, Text, Heading, Stack } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import { FormatAmount } from '~/lib/utils/formatAmount';


const Stats = ({ assetDetails }: { assetDetails: any }) => {
  return (
    <Box w="full" py="40px" borderBottom="1px solid #E4E4E4">
      <Flex alignItems="center" gap="16px">
        <Box w="20%" p="20px 16px" border="1px solid #E4E4E4" rounded="5px">
          <Stack spacing="12px">
            <Text fontWeight={500} color="brand.600">
              Amount Purchased
            </Text>
            <Heading fontSize={20} fontWeight={500}>
              {FormatAmount(assetDetails?.property_cost || 0)}
            </Heading>
          </Stack>
        </Box>
        <Box w="20%" p="20px 16px" border="1px solid #E4E4E4" rounded="5px">
          <Stack spacing="12px">
            <Text fontWeight={500} color="brand.600">
              Remittance Amount
            </Text>
            <Heading fontSize={20} fontWeight={500}>
              {FormatAmount(assetDetails?.cashflow_amount || 0)}
            </Heading>
          </Stack>
        </Box>
        <Box w="20%" p="20px 16px" border="1px solid #E4E4E4" rounded="5px">
          <Stack spacing="12px">
            <Text fontWeight={500} color="brand.600">
              Total Remittance
            </Text>
            <Heading fontSize={20} fontWeight={500}>
              {FormatAmount(assetDetails?.total_payment_amount || 0)}
            </Heading>
          </Stack>
        </Box>
        <Box w="20%" p="20px 16px" border="1px solid #E4E4E4" rounded="5px">
          <Stack spacing="12px">
            <Text fontWeight={500} color="brand.600">
              Remittance Duration
            </Text>
            <Heading fontSize={20} fontWeight={500}>
              {assetDetails?.cashflow_duration || 'N/A'}
            </Heading>
          </Stack>
        </Box>
        <Box w="20%" p="20px 16px" border="1px solid #E4E4E4" rounded="5px">
          <Stack spacing="12px">
            <Text fontWeight={500} color="brand.600">
              Next Due Payment
            </Text>
            <Heading fontSize={20} fontWeight={500}>
              {assetDetails?.cashflow_payment_due
                ? moment(assetDetails?.cashflow_payment_due).format(
                    'ddd, Do MMM YYYY'
                  )
                : 'N/A'}
            </Heading>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Stats;
