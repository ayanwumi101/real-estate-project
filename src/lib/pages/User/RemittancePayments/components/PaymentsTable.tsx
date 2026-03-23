import {
  Box,
  Image,
  Heading,
  Text,
  Stack,
  Link,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Flex,
  Tbody,
  Button,
  Badge,
} from '@chakra-ui/react';
import moment from 'moment';
import React, { Fragment, useState } from 'react';
import { NextPageIcon, PreviousPageIcon } from '~/lib/components/Icons/Icons';
import SkeletonLoader from '~/lib/components/SkeletonLoader';
import { FormatAmount } from '~/lib/utils/formatAmount';

const PaymentsTable = ({
  assetDetails,
  loading,
}: {
  assetDetails: any;
  loading: boolean;
}) => {
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(8);
  const [activeTab, setActiveTab] = useState<string>('pending');
  const pendingPayments = assetDetails?.payments?.filter(
    (payment: any) => payment.status === 'pending'
  );
  const completedPayments = assetDetails?.payments?.filter(
    (payment: any) => payment.status === 'completed'
  );

  const payments =
    activeTab === 'pending' ? pendingPayments : completedPayments;
  return (
    <Fragment>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <Box>
          {assetDetails?.payments?.length < 1 ? (
            <Box maxW="465px" mx="auto" my="5">
              <Stack spacing="15px" alignItems="center" textAlign="center">
                {' '}
                <Image src="/assets/images/briefcase.png" />
                <Heading fontSize={18}>Your Payment list is empty</Heading>
                <Text color="#2E353F">
                  Easily{' '}
                  <Link
                    href={`/user/my-assets/${assetDetails?.id}/add-payment`}
                    style={{ color: '#000080', textDecoration: 'underline' }}
                  >
                    add new payment
                  </Link>{' '}
                  and monitor all your properties in one place. Managing your
                  portfolio has never been smoother!
                </Text>
              </Stack>
            </Box>
          ) : (
            <TableContainer
              // border="1px solid #E4E4E4"
              borderBottom="none"
              borderTop="none"
              py="16px"
              border="1px solid #E4E4E4"
              rounded="10px"
              my="5"
            >
              <Flex px="10px" mb="10px" alignItems="center" gap="12px">
                {['pending', 'completed']?.map((tab) => (
                  <Button
                    textTransform="capitalize"
                    onClick={() => setActiveTab(tab)}
                    fontWeight={600}
                    fontSize={14}
                    bg={activeTab === tab ? '#EDEDFF' : 'none'}
                    color={activeTab === tab ? '#4040A0' : '#8295AA'}
                    p="12px 23px"
                  >
                    {tab}
                  </Button>
                ))}
              </Flex>
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
                      Due Date
                    </Th>
                    <Th
                      color="#222222"
                      fontWeight={500}
                      fontSize={14}
                      textTransform="capitalize"
                    >
                      Payment Date
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
                      Status
                    </Th>
                    {/* <Th
                      color="#222222"
                      fontWeight={500}
                      fontSize={14}
                      textTransform="capitalize"
                    ></Th> */}
                  </Tr>
                </Thead>
                <Tbody color="#222222">
                  {payments?.map((asset: any) => {
                    return (
                      <Tr
                        border="none"
                        _hover={{ bg: '#f5f5f5' }}
                        cursor="pointer"
                      >
                        <Td fontWeight={500} fontSize={14} color="#8295AA">
                          {assetDetails?.cashflow_payment_due
                            ? moment(assetDetails?.cashflow_payment_due).format(
                                'ddd, Do MMMM YYYY'
                              )
                            : 'N/A'}
                        </Td>
                        <Td fontWeight={500} fontSize={14} color="#8295AA">
                          {asset?.payment_date
                            ? moment(asset?.payment_date).format(
                                'ddd, Do MMMM YYYY'
                              )
                            : 'N/A'}
                        </Td>
                        <Td fontWeight={500} fontSize={14} color="#8295AA">
                          {asset?.amount
                            ? `${FormatAmount(Number(asset?.amount))}`
                            : 'N/A'}
                        </Td>
                        <Td
                          fontWeight={500}
                          fontSize={14}
                          textTransform="capitalize"
                        >
                          <Badge
                            color={
                              asset?.status === 'completed'
                                ? '#1BD155'
                                : '#E1A101'
                            }
                            bg={
                              asset?.status === 'completed'
                                ? '#E7F5EC'
                                : '#F6EDDF'
                            }
                            textTransform="capitalize"
                            rounded="24px"
                            padding="4px 12px"
                            fontWeight={500}
                          >
                            {' '}
                            {asset?.status}
                          </Badge>
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
                        {/* <Td fontWeight={400} fontSize={13} color="#8295AA">
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
                          </Menu>
                        </Td> */}
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
              {assetDetails?.payments?.length > 0 && (
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
                          prev <
                          Math.ceil(assetDetails?.payments?.length / limit)
                            ? prev + 1
                            : prev
                        )
                      }
                      isDisabled={
                        page >=
                        Math.ceil(assetDetails?.payments?.length / limit)
                      }
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

export default PaymentsTable;
