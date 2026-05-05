'use client';
import React, { Fragment, useContext } from 'react';
import {
  Box,
  Stack,
  Flex,
  Button,
  Text,
  Table,
  TableContainer,
  Thead,
  Image,
  Tr,
  Th,
  Tbody,
  Heading,
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import {
  ArrowUpIcon,
  LocationIcon,
  VerticalEllipsisIcon,
  OutgoingInstalmentIcon,
  IncomingRemittanceIcon,
} from '~/lib/components/Icons/Icons';
import moment from 'moment';
import Link from 'next/link';
import { FormatAmount } from '~/lib/utils/formatAmount';
import useNavigate from '~/lib/utils/useNavigate';
import SkeletonLoader from '~/lib/components/SkeletonLoader';
import { AppContext } from '~/lib/layout';

const UpcomingPayments = ({
  assets,
  loading,
}: {
  assets: any[];
  loading: boolean;
}) => {
  const navigate = useNavigate();
  const { selectedCurrency } = useContext(AppContext);
  return (
    <Box py="40px" px={['15px', '40px']}>
      <Stack spacing="30px">
        <Heading fontSize={20} color="brand.300">
          Upcoming Payments
        </Heading>
        <Box>
          {loading ? (
            <SkeletonLoader />
          ) : (
            <Fragment>
              {assets?.length < 1 ? (
                <Box maxW="465px" mx="auto" my="5">
                  <Stack spacing="15px" alignItems="center" textAlign="center">
                    {' '}
                    <Image src="/assets/images/briefcase.png" />
                    <Heading fontSize={18}>
                      You don't have any upcoming payments for now.
                    </Heading>
                    <Text color="#2E353F">
                      Easily{' '}
                      <Link
                        href="/user/my-assets/add-assets"
                        style={{
                          color: '#000080',
                          textDecoration: 'underline',
                        }}
                      >
                        add new asset
                      </Link>{' '}
                      and monitor all your properties in one place. Managing
                      your portfolio has never been smoother!
                    </Text>
                  </Stack>
                </Box>
              ) : (
                <TableContainer border="1px solid #E4E4E4" borderRadius="10px">
                  <Table>
                    <Thead
                      color="#222222"
                      bg="#F5F5F5"
                      py="22px"
                      h="53px"
                      border="none"
                    >
                      <Tr border="none">
                        <Th
                          color="#222222"
                          fontWeight={500}
                          fontSize={14}
                          textTransform="capitalize"
                        >
                          Property
                        </Th>
                        <Th
                          color="#222222"
                          fontWeight={500}
                          fontSize={14}
                          textTransform="capitalize"
                        >
                          Due Date
                        </Th>
                        <Th
                          color="#222222"
                          fontWeight={500}
                          fontSize={14}
                          textTransform="capitalize"
                        >
                          Amount
                        </Th>
                        <Th
                          color="#222222"
                          fontWeight={500}
                          fontSize={14}
                          textTransform="capitalize"
                        >
                          Payment Duration
                        </Th>
                        <Th
                          color="#222222"
                          fontWeight={500}
                          fontSize={14}
                          textTransform="capitalize"
                        >
                          Source
                        </Th>
                        <Th
                          color="#222222"
                          fontWeight={500}
                          fontSize={14}
                          textTransform="capitalize"
                        ></Th>
                      </Tr>
                    </Thead>
                    <Tbody color="#222222">
                      {assets?.map((asset: any) => {
                        return (
                          <Tr
                            key={asset?.id}
                            border="none"
                            // _hover={{ bg: '#f5f5f5' }}
                            cursor="pointer"
                          >
                            <Td fontSize={15} color="#222222" fontWeight={600}>
                              <Stack>
                                <Heading
                                  color="#2E353F"
                                  fontSize={16}
                                  fontWeight={600}
                                >
                                  {asset?.property_name}
                                </Heading>
                                <Flex alignItems="center" gap="10px">
                                  <LocationIcon />
                                  <Text fontSize={12} color="#222222">
                                    {`${asset?.city_name}, ${asset?.street_name}`}
                                  </Text>
                                </Flex>
                              </Stack>
                            </Td>
                            <Td fontWeight={500} fontSize={14}>
                              {asset?.next_remittance_due_date ||
                              asset?.cashflow_payment_due ||
                              asset?.due_date
                                ? moment(
                                    asset?.next_remittance_due_date ||
                                      asset?.cashflow_payment_due ||
                                      asset?.due_date
                                  ).format('ddd, Do MMMM YYYY')
                                : 'N/A'}
                            </Td>
                            <Td fontWeight={500} fontSize={14}>
                              {selectedCurrency?.code === 'NGN' ? (
                                <>
                                  {' '}
                                  {FormatAmount(
                                    Number(
                                      asset?.cashflow_amount ||
                                        asset?.amount_left
                                    ),
                                    asset?.cashflow_amount?.display_currency ||
                                      asset?.amount_left?.display_currency
                                  )}
                                </>
                              ) : (
                                <>
                                  {' '}
                                  {FormatAmount(
                                    Number(
                                      asset?.cashflow_amount?.display_value ||
                                        asset?.amount_left?.display_value ||
                                        0
                                    ),
                                    asset?.cashflow_amount?.display_currency ||
                                      asset?.amount_left?.display_currency
                                  )}
                                </>
                              )}
                            </Td>
                            <Td fontWeight={500} fontSize={14}>
                              {asset?.cashflow_duration || asset?.payment_plan}
                            </Td>
                            <Td
                              fontWeight={500}
                              textTransform="uppercase"
                              fontSize={13}
                              color={
                                asset?.asset_type === 'cashflow'
                                  ? '#1BD155'
                                  : '#FE3839'
                              }
                            >
                              <Flex alignItems="center" gap="5px">
                                <Text>
                                  {' '}
                                  {asset?.asset_type === 'cashflow'
                                    ? 'Remittance'
                                    : 'Instalment'}
                                </Text>
                                {asset?.asset_type === 'cashflow' ? (
                                  <IncomingRemittanceIcon />
                                ) : (
                                  <OutgoingInstalmentIcon />
                                )}
                              </Flex>
                            </Td>
                            <Td fontWeight={500} fontSize={14}>
                              <Menu>
                                <MenuButton
                                  as={Button}
                                  rounded="5px"
                                  bg="bg.200"
                                >
                                  <VerticalEllipsisIcon />
                                </MenuButton>
                                <MenuList py="0px">
                                  <MenuItem
                                    py="12px"
                                    px="16px"
                                    _hover={{ bg: 'border.100' }}
                                    fontSize={14}
                                    color="color.100"
                                    fontWeight={500}
                                    onClick={() =>
                                      navigate(`/user/my-assets/${asset?.id}`)
                                    }
                                  >
                                    View asset
                                  </MenuItem>
                                  <MenuItem
                                    py="12px"
                                    px="16px"
                                    _hover={{ bg: 'border.100' }}
                                    fontSize={14}
                                    color="color.100"
                                    fontWeight={500}
                                    onClick={() =>
                                      navigate(
                                        `/user/my-assets/${asset?.id}/add-payment`
                                      )
                                    }
                                  >
                                    Add payment
                                  </MenuItem>
                                  <MenuItem
                                    py="12px"
                                    px="16px"
                                    _hover={{ bg: 'border.100' }}
                                    fontSize={14}
                                    color="color.100"
                                    fontWeight={500}
                                    onClick={() => {
                                      navigate(
                                        `/user/portfolio/${asset?.id}/payments`
                                      );
                                    }}
                                  >
                                    View payment history
                                  </MenuItem>
                                </MenuList>
                              </Menu>
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              )}
            </Fragment>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default UpcomingPayments;
