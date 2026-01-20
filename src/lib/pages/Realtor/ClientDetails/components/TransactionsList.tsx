import React, { Fragment } from 'react';
import {
  Box,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Heading,
  Text,
  Badge,
} from '@chakra-ui/react';
import {
  VerticalEllipsisIcon,
  PreviousPageIcon,
  NextPageIcon,
  RegisterSaleIcon,
  ViewPaymentIcon,
} from '~/lib/components/Icons/Icons';
import useNavigate from '~/lib/utils/useNavigate';
import { FormatAmount } from '~/lib/utils/formatAmount';
import PaymentDetailsModal from '../Modals/PaymentDetailsModal';
import moment from 'moment';
import SkeletonLoader from '~/lib/components/SkeletonLoader';

const TransactionsList = ({
  transactions,
  loading,
}: {
  transactions: any[];
  loading: boolean;
}) => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(8);
  const assets = Array.from({ length: 10 }, (_, i) => ({ id: i + 1 }));
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  return (
    <Fragment>
      {loading ? (
        <SkeletonLoader />
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
                  Type
                </Th>
                <Th
                  color="#222222"
                  fontWeight={500}
                  fontSize={14}
                  textTransform="capitalize"
                >
                  Related Asset
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
                  Date
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
                  Commission
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
                ></Th>
              </Tr>
            </Thead>
            <Tbody color="#222222" maxH="450px" overflow="auto">
              {transactions
                ?.slice((page - 1) * limit, page * limit)
                ?.map((transaction) => {
                  console.log(transaction);

                  return (
                    <Tr
                      key={transaction?.transaction_id}
                      border="none"
                      cursor="pointer"
                      textTransform="capitalize"
                    >
                      <Td fontSize={15} color="#222222" fontWeight={600}>
                        {transaction?.property_sale_type || 'N/A'}
                      </Td>
                      <Td fontWeight={500} fontSize={14} color="#8295AA">
                        {transaction?.property_name}
                      </Td>
                      <Td fontWeight={500} fontSize={14} color="#8295AA">
                        {transaction?.property_type}
                      </Td>
                      <Td fontWeight={500} fontSize={14} color="#8295AA">
                        {moment(transaction?.date_sold).format(
                          'ddd, Do MMM YYYY'
                        )}
                      </Td>
                      <Td fontWeight={500} fontSize={14} color="#8295AA">
                        {FormatAmount(Number(transaction?.amount_paid || 0))}
                      </Td>
                      <Td fontWeight={500} fontSize={14} color="#8295AA">
                        {FormatAmount(Number(transaction?.commission))}
                      </Td>
                      <Td>
                        <Badge
                          bg={
                            transaction?.payment_status === 'completed'
                              ? 'bg.700'
                              : '#F6EDDF'
                          }
                          px="12px"
                          py="4px"
                          fontSize={12}
                          fontWeight={500}
                          color={
                            transaction?.payment_status === 'completed'
                              ? 'color.400'
                              : '#E1A101'
                          }
                          textTransform="capitalize"
                          rounded="50px"
                        >
                          {transaction?.payment_status}
                        </Badge>
                      </Td>
                      <Td>
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
                              onClick={() => setOpenModal(true)}
                              icon={<ViewPaymentIcon />}
                            >
                              View payment
                            </MenuItem>
                            <MenuItem
                              py="12px"
                              px="16px"
                              _hover={{ bg: 'border.100' }}
                              fontSize={14}
                              color="color.100"
                              fontWeight={500}
                              icon={<RegisterSaleIcon />}
                              onClick={() =>
                                navigate(
                                  `/realtor/properties/57478493/register-sale`
                                )
                              }
                            >
                              Update payment status
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
          {transactions?.length > 0 && (
            <Box w="full" bg="white" py="10px">
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
                      prev < Math.ceil(assets.length / limit) ? prev + 1 : prev
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

      <PaymentDetailsModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </Fragment>
  );
};

export default TransactionsList;
