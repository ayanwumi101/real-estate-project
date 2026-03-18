'use client';
import React, { Fragment } from 'react';
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
  MenuItem,
  MenuList,
  MenuButton,
} from '@chakra-ui/react';
import {
  ArrowUpIcon,
  LocationIcon,
  VerticalEllipsisIcon,
  ViewRemittanceHistoryIcon,
  AddPaymentIcon,
} from '~/lib/components/Icons/Icons';
import moment from 'moment';
import Link from 'next/link';
import { FormatAmount } from '~/lib/utils/formatAmount';
import SkeletonLoader from '~/lib/components/SkeletonLoader';
import useNavigate from '~/lib/utils/useNavigate';

const PropertyListTable = ({
  assets,
  loading,
}: {
  assets: any[];
  loading: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <Fragment>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <Box>
          {assets?.length < 1 ? (
            <Box maxW="465px" mx="auto" my="5">
              <Stack spacing="15px" alignItems="center" textAlign="center">
                {' '}
                <Image src="/assets/images/briefcase.png" />
                <Heading fontSize={18}>Your Asset list is empty</Heading>
                <Text color="#2E353F">
                  Easily{' '}
                  <Link
                    href="/user/my-assets/add-assets"
                    style={{ color: '#000080', textDecoration: 'underline' }}
                  >
                    add new asset
                  </Link>{' '}
                  and monitor all your properties in one place. Managing your
                  portfolio has never been smoother!
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
                      Property Type
                    </Th>
                    <Th
                      color="#222222"
                      fontWeight={500}
                      fontSize={14}
                      textTransform="capitalize"
                    >
                      Amount Purchased
                    </Th>
                    <Th
                      color="#222222"
                      fontWeight={500}
                      fontSize={14}
                      textTransform="capitalize"
                    >
                      Status
                    </Th>
                    <Th
                      color="#222222"
                      fontWeight={500}
                      fontSize={14}
                      textTransform="none"
                    >
                      No of Payment
                    </Th>
                    <Th
                      color="#222222"
                      fontWeight={500}
                      fontSize={14}
                      textTransform="capitalize"
                    >
                      Remittance Amount
                    </Th>
                    <Th
                      color="#222222"
                      fontWeight={500}
                      fontSize={14}
                      textTransform="capitalize"
                    >
                      <Flex alignItems="center" gap="5px">
                        <Text> Next Due Remittance</Text>
                        <ArrowUpIcon />
                      </Flex>
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
                        border="none"
                        _hover={{ bg: '#f5f5f5' }}
                        cursor="pointer"
                      >
                        <Td fontSize={18} fontWeight={700}>
                          <Flex alignItems="center" gap="10px">
                            <Stack spacing="3px">
                              <Heading
                                color="#2E353F"
                                fontWeight={500}
                                fontSize={16}
                              >
                                {asset?.property_name}
                              </Heading>
                              <Flex alignItems="center" gap="3px">
                                <LocationIcon />
                                <Text
                                  color="#2E353F"
                                  fontWeight={400}
                                  fontSize={12}
                                >
                                  {asset?.city_name}
                                </Text>
                              </Flex>
                            </Stack>
                          </Flex>
                        </Td>
                        <Td fontWeight={500} fontSize={14} color="#8295AA">
                          {asset?.property_type}
                        </Td>
                        <Td fontWeight={500} fontSize={14} color="#8295AA">
                          {asset?.property_cost
                            ? `${FormatAmount(Number(asset?.property_cost))}`
                            : 'N/A'}
                        </Td>
                        <Td
                          fontWeight={500}
                          fontSize={13}
                          px="0"
                          color="#8295AA"
                        >
                          {asset?.is_occupied === true
                            ? 'Occupied'
                            : 'Not Occupied'}
                        </Td>
                        <Td
                          fontWeight={500}
                          fontSize={13}
                          px="0"
                          textAlign="center"
                          color="#8295AA"
                        >
                          {asset?.no_of_payments}
                        </Td>
                        <Td fontWeight={500} fontSize={14} color="#8295AA">
                          {asset?.cashflow_amount
                            ? `${FormatAmount(Number(asset?.cashflow_amount))}`
                            : 'N/A'}
                        </Td>
                        <Td fontWeight={500} fontSize={14} color="#8295AA">
                          {asset?.cashflow_payment_due
                            ? moment(asset?.cashflow_payment_due).format(
                                'ddd, Do MMMM YYYY'
                              )
                            : 'N/A'}
                        </Td>
                        <Td fontWeight={400} fontSize={13} color="#8295AA">
                          <Menu>
                            <MenuButton as={Button} rounded="5px" bg="bg.200">
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
                                    `/user/my-assets/${asset?.id}/payments`
                                  )
                                }
                                icon={<ViewRemittanceHistoryIcon />}
                              >
                                View remittance history
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
                                icon={<AddPaymentIcon />}
                              >
                                Add new payment
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
        </Box>
      )}
    </Fragment>
  );
};

export default PropertyListTable;
