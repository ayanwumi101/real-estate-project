import { Flex, Box, Text, Heading, Stack, Skeleton } from '@chakra-ui/react';
import moment from 'moment';
import React, { Fragment } from 'react';
import { FormatAmount } from '~/lib/utils/formatAmount';

const Stats = ({
  assetDetails,
  loading,
}: {
  assetDetails: any;
  loading: boolean;
}) => {
  return (
    <Box w="full" py="40px" borderBottom="1px solid #E4E4E4" overflow="auto">
      {loading ? (
        <Flex alignItems="center" gap="16px">
          {[1, 2, 3, 4, 5]?.map((item) => (
            <Skeleton
              key={item}
              w="20%"
              // p="20px 16px"
              border="1px solid #E4E4E4"
              rounded="5px"
              h="98px"
            ></Skeleton>
          ))}
        </Flex>
      ) : (
        <Fragment>
          {assetDetails?.asset_type === 'cashflow' ? (
            <Flex
              w="full"
              alignItems="center"
              gap="14px"
              overflow="auto"
              pb="2"
            >
              <Box
                minW={['270px', '19%']}
                p="20px 16px"
                border="1px solid #E4E4E4"
                rounded="5px"
              >
                <Stack spacing="12px">
                  <Text fontWeight={500} color="brand.600">
                    Amount Purchased
                  </Text>
                  <Heading fontSize={20} fontWeight={500}>
                    {assetDetails?.property_cost?.display_value
                      ? FormatAmount(
                          Number(assetDetails?.property_cost?.display_value),
                          assetDetails?.property_cost?.display_currency
                        )
                      : FormatAmount(Number(assetDetails?.property_cost))}
                  </Heading>
                </Stack>
              </Box>
              <Box
                minW={['270px', '19%']}
                p="20px 16px"
                border="1px solid #E4E4E4"
                rounded="5px"
              >
                <Stack spacing="12px">
                  <Text fontWeight={500} color="brand.600">
                    Remittance Amount
                  </Text>
                  <Heading fontSize={20} fontWeight={500}>
                    {assetDetails?.cashflow_amount?.display_value
                      ? FormatAmount(
                          Number(assetDetails?.cashflow_amount?.display_value),
                          assetDetails?.cashflow_amount?.display_currency
                        )
                      : FormatAmount(Number(assetDetails?.cashflow_amount))}
                  </Heading>
                </Stack>
              </Box>
              <Box
                minW={['270px', '19%']}
                p="20px 16px"
                border="1px solid #E4E4E4"
                rounded="5px"
              >
                <Stack spacing="12px">
                  <Text fontWeight={500} color="brand.600">
                    Total Remittance
                  </Text>
                  <Heading fontSize={20} fontWeight={500}>
                    {assetDetails?.total_payment_amount?.display_value
                      ? FormatAmount(
                          Number(assetDetails?.total_payment_amount?.display_value),
                          assetDetails?.total_payment_amount?.display_currency
                        )
                      : FormatAmount(Number(assetDetails?.total_payment_amount))}
                  </Heading>
                </Stack>
              </Box>
              <Box
                minW={['270px', '19%']}
                p="20px 16px"
                border="1px solid #E4E4E4"
                rounded="5px"
              >
                <Stack spacing="12px">
                  <Text fontWeight={500} color="brand.600">
                    Remittance Duration
                  </Text>
                  <Heading fontSize={20} fontWeight={500}>
                    {assetDetails?.cashflow_duration ||
                      assetDetails?.duration ||
                      'N/A'}
                  </Heading>
                </Stack>
              </Box>
              <Box
                minW={['270px', '19%']}
                p="20px 16px"
                border="1px solid #E4E4E4"
                rounded="5px"
              >
                <Stack spacing="12px">
                  <Text fontWeight={500} color="brand.600">
                    Next Due Payment
                  </Text>
                  <Heading fontSize={20} fontWeight={500}>
                    {assetDetails?.cashflow_payment_due ||
                    assetDetails?.next_due_date
                      ? moment(
                          assetDetails?.cashflow_payment_due ||
                            assetDetails?.next_due_date
                        ).format('ddd, Do MMM YYYY')
                      : 'N/A'}
                  </Heading>
                </Stack>
              </Box>
            </Flex>
          ) : (
            <Flex
              w="full"
              alignItems="center"
              gap="16px"
              overflow="auto"
              pb="2"
            >
              <Box
                minW={['270px', '24%']}
                p="20px 16px"
                border="1px solid #E4E4E4"
                rounded="5px"
              >
                <Stack spacing="12px">
                  <Text fontWeight={500} color="brand.600">
                    Sale Price
                  </Text>
                  <Heading fontSize={20} fontWeight={500}>
                    {assetDetails?.property_cost?.display_value
                      ? FormatAmount(
                          Number(assetDetails?.property_cost?.display_value),
                          assetDetails?.property_cost?.display_currency
                        )
                      : FormatAmount(Number(assetDetails?.property_cost))}
                  </Heading>
                </Stack>
              </Box>
              <Box
                minW={['270px', '24%']}
                p="20px 16px"
                border="1px solid #E4E4E4"
                rounded="5px"
              >
                <Stack spacing="12px">
                  <Text fontWeight={500} color="brand.600">
                    Total Paid
                  </Text>
                  <Heading fontSize={20} fontWeight={500}>
                    {assetDetails?.total_payment_amount?.display_value
                      ? FormatAmount(
                          Number(assetDetails?.total_payment_amount?.display_value),
                          assetDetails?.total_payment_amount?.display_currency
                        )
                      : FormatAmount(Number(assetDetails?.total_payment_amount))}
                  </Heading>
                </Stack>
              </Box>
              <Box
                minW={['270px', '24%']}
                p="20px 16px"
                border="1px solid #E4E4E4"
                rounded="5px"
              >
                <Stack spacing="12px">
                  <Text fontWeight={500} color="brand.600">
                    Outstanding
                  </Text>
                  <Heading fontSize={20} fontWeight={500}>
                    {assetDetails?.amount_left?.display_value
                      ? FormatAmount(
                          Number(assetDetails?.amount_left?.display_value),
                          assetDetails?.amount_left?.display_currency
                        )
                      : FormatAmount(Number(assetDetails?.amount_left))}
                  </Heading>
                </Stack>
              </Box>
              <Box
                minW={['270px', '24%']}
                p="20px 16px"
                border="1px solid #E4E4E4"
                rounded="5px"
              >
                <Stack spacing="12px">
                  <Text fontWeight={500} color="brand.600">
                    Next Due Payment
                  </Text>
                  <Heading fontSize={20} fontWeight={500}>
                    {assetDetails?.next_due_date || assetDetails?.due_date
                      ? moment(
                          assetDetails?.next_due_date || assetDetails?.due_date
                        ).format('ddd, Do MMM YYYY')
                      : 'N/A'}
                  </Heading>
                </Stack>
              </Box>
            </Flex>
          )}
        </Fragment>
      )}
    </Box>
  );
};

export default Stats;
