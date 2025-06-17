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
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import {
  ArrowUpIcon,
  LocationIcon,
  VerticalEllipsisIcon,
} from '~/lib/components/Icons/Icons';
import moment from 'moment';
import Link from 'next/link';
import { FormatAmount } from '~/lib/utils/formatAmount';
import useNavigate from '~/lib/utils/useNavigate';
import SkeletonLoader from '~/lib/components/SkeletonLoader';

const UpcomingPayments = ({
  assets,
  loading,
}: {
  assets: any[];
  loading: boolean;
}) => {
  const navigate = useNavigate();
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
                <TableContainer>
                  <Table border="none" variant="unstyled">
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
                          Payment Interval
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
                              {FormatAmount(Number(asset?.cashflow_amount))}
                            </Td>
                            <Td fontWeight={500} fontSize={14}>
                              {asset?.cashflow_duration}
                            </Td>
                            <Td fontWeight={500} fontSize={14}>
                              {asset?.asset_type === 'cashflow'
                                ? 'Remittance'
                                : 'Instalment'}
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
                                    // onClick={() =>
                                    //   navigate(
                                    //     `/user/my-assets/${asset?.id}/update-details`
                                    //   )
                                    // }
                                  >
                                    Update asset details
                                  </MenuItem>
                                  <MenuItem
                                    py="12px"
                                    px="16px"
                                    _hover={{ bg: 'border.100' }}
                                    fontSize={14}
                                    color="color.100"
                                    fontWeight={500}
                                    // onClick={() => {
                                    //   setIsOpen(true);
                                    //   setSelectedAssetId(asset?.id);
                                    // }}
                                  >
                                    Change asset status
                                  </MenuItem>
                                  <MenuItem
                                    py="12px"
                                    px="16px"
                                    _hover={{ bg: 'border.100' }}
                                    fontSize={14}
                                    color="color.100"
                                    fontWeight={500}
                                    onClick={() => {
                                      //   setIsOpen(true);
                                      //   setSelectedAssetId(asset?.id);
                                    }}
                                  >
                                    Delete asset
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
