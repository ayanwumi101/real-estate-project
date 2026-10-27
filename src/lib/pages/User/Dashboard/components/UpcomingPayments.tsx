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
  Badge,
  Select,
  FormLabel,
  FormControl,
} from '@chakra-ui/react';
import {
  VerticalEllipsisIcon,
  OutgoingInstalmentIcon,
  IncomingRemittanceIcon,
  LocationIcon,
} from '~/lib/components/Icons/Icons';
import moment from 'moment';
import Link from 'next/link';
import { FormatAmount } from '~/lib/utils/formatAmount';
import useNavigate from '~/lib/utils/useNavigate';
import SkeletonLoader from '~/lib/components/SkeletonLoader';
import { AppContext } from '~/lib/layout';
import {
  UpcomingPaymentSummary,
  UpcomingPayment,
} from '~/lib/api/services/dashboardService';

const UpcomingPayments = ({
  payments,
  loading,

  assetType,
  setAssetType,
  paymentType,
  setPaymentType,
  upcomingPayments
}: {
  payments: UpcomingPayment[];
  loading: boolean;
  assetType: 'all' | 'remittance' | 'instalment';
  setAssetType: (asset: 'all' | 'remittance' | 'instalment') => void;
  paymentType: 'all' | 'due' | 'upcoming';
    setPaymentType: (payment: 'all' | 'due' | 'upcoming') => void;
  upcomingPayments: number
}) => {
  const navigate = useNavigate();
  const { selectedCurrency } = useContext(AppContext);
  return (
    <Box py="40px" px={['15px', '40px']}>
      <Stack spacing="20px">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          flexWrap={['wrap', 'nowrap']}
          gap={['8',0]}
        >
          <Heading fontSize={20} color="brand.300">
            Upcoming Payments ({upcomingPayments || 0})
          </Heading>
          <Box w={['full', '40%']}>
            <Flex alignItems="center" gap="12px">
              <FormControl>
                <FormLabel fontSize={14} fontWeight={600}>
                  Asset Type
                </FormLabel>
                <Select
                  value={assetType}
                  onChange={(e) =>
                    setAssetType(
                      e.target.value as 'all' | 'remittance' | 'instalment'
                    )
                  }
                  rounded="24px"
                  placeholder="select asset type"
                >
                  <option value="all">All</option>
                  <option value="remittance">Remittance</option>
                  <option value="instalment">Instalment</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14} fontWeight={600}>
                  Payment Type
                </FormLabel>
                <Select
                  value={paymentType}
                  onChange={(e) =>
                    setPaymentType(e.target.value as 'all' | 'due' | 'upcoming')
                  }
                  rounded="24px"
                  placeholder="select payment type"
                >
                  <option value="all">All</option>
                  <option value="due">Due payment</option>
                  <option value="upcoming">Upcoming Payment</option>
                </Select>
              </FormControl>
            </Flex>
          </Box>
        </Flex>

        <Box>
          {loading ? (
            <SkeletonLoader />
          ) : (
            <Fragment>
              {payments?.length < 1 ? (
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
                        {[
                          'property',
                          'due date',
                          'amount',
                          'payment plan',
                          'source',
                          'payment type',
                          'status',
                          '',
                        ]?.map((item) => (
                          <Th
                            color="#222222"
                            fontWeight={500}
                            fontSize={14}
                            textTransform="capitalize"
                          >
                            {item}
                          </Th>
                        ))}
                      </Tr>
                    </Thead>
                    <Tbody color="#222222">
                      {payments?.map((asset: any) => {
                        return (
                          <Tr
                            key={asset?.id}
                            border="none"
                            _hover={{ bg: '#f5f5f5' }}
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
                                <Flex alignItems="center" gap="5px">
                                  <LocationIcon />
                                  <Text fontSize={12} color="#222222">
                                    {`${asset?.address} `}
                                  </Text>
                                </Flex>
                              </Stack>
                            </Td>
                            <Td fontWeight={500} fontSize={14}>
                              {asset?.payment_due_date
                                ? moment(asset?.payment_due_date).format(
                                    'ddd, Do MMMM YYYY'
                                  )
                                : 'N/A'}
                            </Td>
                            <Td fontWeight={500} fontSize={14}>
                              {selectedCurrency?.code === 'NGN' ? (
                                <>
                                  {' '}
                                  {FormatAmount(
                                    Number(asset?.amount),
                                    selectedCurrency?.code
                                  )}
                                </>
                              ) : (
                                <>
                                  {' '}
                                  {FormatAmount(
                                    Number(asset?.amount?.display_value || 0),
                                    asset?.amount?.display_currency
                                  )}
                                </>
                              )}
                            </Td>
                            <Td fontWeight={500} fontSize={14}>
                              {asset?.cashflow_duration}
                            </Td>
                            <Td
                              fontWeight={500}
                              textTransform="uppercase"
                              fontSize={13}
                              color={
                                asset?.payment_type !== 'cashflow'
                                  ? '#1BD155'
                                  : '#FE3839'
                              }
                            >
                              <Flex
                                alignItems="center"
                                gap="5px"
                                textTransform="capitalize"
                              >
                                <Text> {asset?.payment_type}</Text>
                                {asset?.payment_type !== 'cashflow' ? (
                                  <IncomingRemittanceIcon />
                                ) : (
                                  <OutgoingInstalmentIcon />
                                )}
                              </Flex>
                            </Td>
                            <Td
                              fontWeight={500}
                              textTransform="capitalize"
                              fontSize={13}
                              color={
                                asset?.is_due === false ? '#1BD155' : '#FE3839'
                              }
                            >
                              {asset?.is_due === true
                                ? 'Payment Due'
                                : 'Upcoming Payment'}
                            </Td>
                            <Td>
                              <Badge
                                bg={
                                  asset?.status === 'pending'
                                    ? '#F6EDDF'
                                    : '#E7F5EC'
                                }
                                color={
                                  asset?.status === 'pending'
                                    ? '#E1A101'
                                    : '#1BD155'
                                }
                                p="3px 12px"
                                rounded="16px"
                                fontWeight={500}
                                textTransform="capitalize"
                              >
                                {asset?.status}
                              </Badge>
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
                                      navigate(
                                        `/user/my-assets/${asset?.property_id}`
                                      )
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
                                        `/user/my-assets/${asset?.property_id}/add-payment`
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
                                        `/user/portfolio/${asset?.property_id}/payments`
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
