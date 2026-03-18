'use client';

import {
  Box,
  Flex,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
} from '@chakra-ui/react';
import React, { Fragment } from 'react';
import SkeletonLoader from '~/lib/components/SkeletonLoader';
import useNavigate from '~/lib/utils/useNavigate';
import { FormatAmount } from '~/lib/utils/formatAmount';
import {
  VerticalEllipsisIcon,
  PreviousPageIcon,
  NextPageIcon,
  EmptyPaymentsIcon,
} from '~/lib/components/Icons/Icons';
import moment from 'moment';

const PendingPayments = ({
  isLoading,
  remittances,
  dueDates,
}: {
  isLoading: boolean;
  remittances: any[];
  dueDates: any[];
}) => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(20);

  const totalDueAmount = remittances?.reduce(
    (acc, remittance) => acc + (Number(remittance?.amount) || 0),
    0
  );
  return (
    <Box>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <Fragment>
          {remittances?.length < 1 ? (
            <Box maxW="465px" mx="auto" my="10">
              <Stack spacing="15px" alignItems="center" textAlign="center">
                {' '}
                <EmptyPaymentsIcon />
                <Heading fontSize={18}>There’s no payment here</Heading>
                <Text color="#2E353F">
                  No payment yet, so there's nothing to show on your statement.
                  It'll be ready when you add a new payment or when a remittance
                  is due.
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
                      Payment Due Date
                    </Th>
                    <Th
                      color="#222222"
                      fontWeight={500}
                      fontSize={14}
                      textTransform="capitalize"
                    >
                      Amount Due
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
                      Payment Status
                    </Th>
                    <Th
                      color="#222222"
                      fontWeight={500}
                      fontSize={14}
                      textTransform="capitalize"
                    ></Th>
                  </Tr>
                </Thead>
                <Tbody color="#222222" maxH="450px" overflow="auto">
                  {remittances
                    ?.slice((page - 1) * limit, page * limit)
                        ?.map((asset: any) => {
                          const paymentDueDate = dueDates?.find(
                            (dueDate) =>
                              dueDate.id === asset?.payment_due_date_id
                          );
                      return (
                        <Tr key={asset?.id} border="none" cursor="pointer">
                          <Td fontWeight={500} fontSize={14} color="#8295AA">
                            {asset?.payment_due_date_id
                              ? moment(paymentDueDate).format(
                                  'ddd, Do MMMM YYYY'
                                )
                              : 'N/A'}
                          </Td>
                          <Td fontWeight={500} fontSize={14} color="#8295AA">
                            {FormatAmount(Number(asset?.amount))}
                          </Td>
                          <Td fontWeight={500} fontSize={14} color="#8295AA">
                            {asset?.payment_date
                              ? moment(asset?.payment_date).format(
                                  'ddd, Do MMMM YYYY'
                                )
                              : 'N/A'}
                          </Td>
                          <Td fontWeight={500} fontSize={14} color="#8295AA">
                            <Badge
                              color="brand.400"
                              fontWeight={500}
                              fontSize="14px"
                              px="15px"
                              textTransform="capitalize"
                              py="4px"
                              rounded="24px"
                              bg="#EEEEEE"
                            >
                              {asset?.status || 'N/A'}
                            </Badge>
                          </Td>
                          <Td>
                            <Menu>
                              <MenuButton as={Button} rounded="5px" bg="bg.200">
                                <VerticalEllipsisIcon />
                              </MenuButton>
                              <MenuList py="10px">
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
                                  View payment details
                                </MenuItem>
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
                                  Update payment info
                                </MenuItem>
                              </MenuList>
                            </Menu>
                          </Td>
                        </Tr>
                      );
                    })}
                </Tbody>
                <Tr borderTop="1px solid #E4E7EC">
                  <Td fontWeight={500}>Total Amount Due</Td>
                  <Td fontWeight={500}>
                    {FormatAmount(Number(totalDueAmount))}
                  </Td>
                </Tr>
              </Table>
            </TableContainer>
          )}
          {remittances?.length > 0 && (
            <Box w="full" bg="white" py="20px" borderY="1px solid #E4E7EC">
              <Flex alignItems="center" justifyContent="center" gap="13px">
                <Button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  isDisabled={page === 1}
                  border="1px solid #E4E4E4"
                  rounded="6px"
                  variant="outline"
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
                  onClick={() =>
                    setPage((prev) =>
                      prev < Math.ceil(remittances.length / limit)
                        ? prev + 1
                        : prev
                    )
                  }
                  isDisabled={page >= Math.ceil(remittances.length / limit)}
                >
                  <NextPageIcon />
                </Button>
              </Flex>
            </Box>
          )}
        </Fragment>
      )}
    </Box>
  );
};

export default PendingPayments;
