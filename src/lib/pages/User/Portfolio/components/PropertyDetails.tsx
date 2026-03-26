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
  Portal,
} from '@chakra-ui/react';
import {
  ArrowUpIcon,
  LocationIcon,
  VerticalEllipsisIcon,
  ViewRemittanceHistoryIcon,
  AddPaymentIcon,
  PreviousPageIcon,
  NextPageIcon,
  EmptyRemittanceIcon,
} from '~/lib/components/Icons/Icons';
import moment from 'moment';
import Link from 'next/link';
import { FormatAmount } from '~/lib/utils/formatAmount';
import SkeletonLoader from '~/lib/components/SkeletonLoader';
import useNavigate from '~/lib/utils/useNavigate';
import { GoLocation } from 'react-icons/go';

const PropertyListTable = ({
  assets,
  loading,
}: {
  assets: any[];
  loading: boolean;
}) => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(8);
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
                <EmptyRemittanceIcon />
                <Heading fontSize={17}>No Remittances Yet</Heading>
                <Text color="#2E353F" fontSize={15}>
                  Cashflow properties will appear here once added, along with
                  their remittance history. Add a cashflow property or update an
                  existing asset to start tracking your income.
                </Text>
                <Link href={`/user/my-assets/add-assets`}>
                  <Button
                    bg="brand.100"
                    fontWeight={500}
                    fontSize={14}
                    color="brand.200"
                  >
                    Add New Asset
                  </Button>
                </Link>
              </Stack>
            </Box>
          ) : (
            <TableContainer
              // border="1px solid #E4E4E4"
              borderBottom="none"
              borderTop="none"
            >
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
                      Amount Purchased
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
                      Duration
                    </Th>
                    <Th
                      color="#222222"
                      fontWeight={500}
                      fontSize={14}
                      textTransform="none"
                    >
                      No of Payments
                    </Th>
                    <Th
                      color="#222222"
                      fontWeight={500}
                      fontSize={14}
                      textTransform="capitalize"
                    >
                      Total Remittance
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
                            <Stack spacing="5px">
                              <Heading
                                color="#2E353F"
                                fontWeight={500}
                                fontSize={16}
                              >
                                {asset?.property_name}
                              </Heading>
                              <Flex alignItems="center" gap="6px">
                                <GoLocation size={13} />
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
                          {asset?.property_cost
                            ? `${FormatAmount(Number(asset?.property_cost))}`
                            : 'N/A'}
                        </Td>
                        <Td fontWeight={500} fontSize={14} color="#8295AA">
                          {asset?.cashflow_amount
                            ? `${FormatAmount(Number(asset?.cashflow_amount))}`
                            : 'N/A'}
                        </Td>
                        <Td fontWeight={500} fontSize={14} color="#8295AA">
                          {asset?.cashflow_duration}
                        </Td>
                        <Td fontWeight={500} fontSize={14} color="#8295AA">
                          {asset?.payments?.length}
                        </Td>
                        <Td fontWeight={500} fontSize={14} color="#8295AA">
                          {asset?.total_payment_amount
                            ? `${FormatAmount(Number(asset?.total_payment_amount))}`
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
                          // px="0"
                          // textAlign="center"
                          color="#8295AA"
                        >
                          {asset?.cashflow_payment_due
                            ? moment(asset?.cashflow_payment_due).format(
                                'ddd, Do MMMM YYYY'
                              )
                            : 'N/A'}
                        </Td>
                        {/* <Td fontWeight={500} fontSize={14} color="#8295AA">
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
                        </Td> */}
                        <Td fontWeight={400} fontSize={13} color="#8295AA">
                          <Menu>
                            <MenuButton as={Button} rounded="5px" bg="bg.200">
                              <VerticalEllipsisIcon />
                            </MenuButton>
                            <Portal>
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
                                      `/user/portfolio/${asset?.id}/payments`
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
                            </Portal>
                          </Menu>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
              {assets?.length > 0 && (
                <Box w="full" bg="white" pt="10px">
                  <Flex alignItems="center" justifyContent="center" gap="13px">
                    <Button
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                      isDisabled={page === 1}
                      border="1px solid #E4E4E4"
                      rounded="6px"
                      variant="outline"
                      p="8px"
                    >
                      <PreviousPageIcon />
                    </Button>
                    <Text fontWeight={600} fontSize={17}>
                      {page}
                    </Text>
                    <Button
                      border="1px solid #E4E4E4"
                      rounded="6px"
                      variant="outline"
                      p="8px"
                      onClick={() =>
                        setPage((prev) =>
                          prev < Math.ceil(assets.length / limit)
                            ? prev + 1
                            : prev
                        )
                      }
                      isDisabled={page >= Math.ceil(assets.length / limit)}
                    >
                      <NextPageIcon />
                    </Button>
                  </Flex>
                </Box>
              )}
            </TableContainer>
          )}
        </Box>
      )}
    </Fragment>
  );
};

export default PropertyListTable;
