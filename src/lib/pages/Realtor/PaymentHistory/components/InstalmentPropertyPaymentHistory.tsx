import React from 'react';
import {
  Box,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Badge,
  Stack,
} from '@chakra-ui/react';
import useNavigate from '~/lib/utils/useNavigate';
import moment from 'moment';
import { FormatAmount } from '~/lib/utils/formatAmount';
import { VerticalEllipsisIcon } from '~/lib/components/Icons/Icons';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { ViewPaymentIcon } from '~/lib/components/Icons/Icons';
import { Button } from '@chakra-ui/react';
import { PreviousPageIcon, NextPageIcon } from '~/lib/components/Icons/Icons';
import { Text } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import PaymentReceiptModal from '../../PropertyDetails/Modals/PaymentReceiptModal';
import { Fragment } from 'react';

interface InstalmentpropertyPaymentHistoryProps {
  paymentHistory: any[];
  activeTab: 'completed' | 'pending';
  outstandingBalance: number;
  propertyName: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
}

const InstalmentPropertyPaymentHistory = ({
  paymentHistory,
  activeTab,
  outstandingBalance,
  propertyName,
  clientName,
  clientPhone,
  clientEmail,
}: InstalmentpropertyPaymentHistoryProps) => {
  const newPayments =
    activeTab === 'completed'
      ? paymentHistory?.filter((payment) => payment?.status === 'completed')
      : paymentHistory?.filter((payment) => payment?.status === 'pending');
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(8);
  const assets = Array.from({ length: newPayments?.length }, (_, i) => ({
    id: i + 1,
  }));
  const [openReceiptModal, setOpenReceiptModal] =
    React.useState<boolean>(false);
  const [selectedPayment, setSelectedPayment] = React.useState<any>(null);

  // console.log(paymentHistory);
  
  return (
    <Fragment>
      <TableContainer w="full" border="1px solid #E4E4E4" borderRadius="10px">
        <Table>
          <Thead color="#222222" bg="#F5F5F5" py="22px" h="53px" border="none">
            <Tr border="none">
              <Th
                color="#222222"
                fontWeight={500}
                fontSize={14}
                textTransform="capitalize"
              >
                Sale Type
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
                {activeTab === 'completed' ? 'Amount Paid' : 'Amount'}
              </Th>
              {activeTab === 'completed' && (
                <Th
                  color="#222222"
                  fontWeight={500}
                  fontSize={14}
                  textTransform="capitalize"
                >
                  Commission
                </Th>
              )}
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
            {newPayments
              ?.slice((page - 1) * limit, page * limit)
              ?.map((payment) => {
                return (
                  <Tr
                    key={payment?.id}
                    border="none"
                    cursor="pointer"
                    color="#222222"
                  >
                    <Td
                      fontSize={15}
                      fontWeight={600}
                      textTransform="capitalize"
                    >
                      {payment?.type || 'Instalment'}
                    </Td>
                    <Td fontWeight={500} fontSize={14}>
                      {moment(payment?.date).format('ddd, Do MMMM YYYY')}
                    </Td>
                    <Td fontWeight={500} fontSize={14}>
                      {FormatAmount(Number(payment?.amount))}
                    </Td>
                    {activeTab === 'completed' && (
                      <Td fontWeight={500} fontSize={14}>
                        {FormatAmount(Number(payment?.commission))}
                      </Td>
                    )}
                    <Td
                      fontWeight={500}
                      fontSize={14}
                      textTransform="capitalize"
                    >
                      <Badge
                        bg={
                          payment?.status === 'completed'
                            ? '#E7F5EC'
                            : '#F6EDDF'
                        }
                        color={
                          payment?.status === 'completed'
                            ? '#1BD155'
                            : '#E1A101'
                        }
                        rounded="16px"
                        fontWeight={500}
                        fontSize={14}
                        textTransform="capitalize"
                        px="12px"
                        py="3px"
                      >
                        {payment?.status}
                      </Badge>
                    </Td>
                    <Td>
                      <Menu>
                        <MenuButton as={Button} rounded="5px" bg="bg.200">
                          <VerticalEllipsisIcon />
                        </MenuButton>
                        <MenuList py="10px" rounded="16px">
                          {/* <MenuItem
                        py="12px"
                        px="16px"
                        _hover={{ bg: 'border.100' }}
                        fontSize={14}
                        color="color.100"
                        fontWeight={500}
                        onClick={() =>
                          navigate(
                            `/realtor/properties/${assetId}/payment-history/${payment?.id}`
                          )
                        }
                        icon={<ViewPaymentIcon />}
                      >
                        View payment history
                      </MenuItem> */}
                          <MenuItem
                            py="12px"
                            px="16px"
                            _hover={{ bg: 'border.100' }}
                            fontSize={14}
                            color="color.100"
                            fontWeight={500}
                            onClick={() => {
                              setOpenReceiptModal(true);
                              setSelectedPayment(payment);
                            }}
                            icon={<ViewPaymentIcon />}
                          >
                            View Receipt
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
        {newPayments?.length > 0 && (
          <Box
            w="full"
            bg="white"
            py="10px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            px="16px"
          >
            {/* pagination button */}
            <Flex
              alignItems="center"
              w="full"
              justifyContent="center"
              gap="13px"
            >
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
            {/* Total pending banner */}
            {activeTab === 'pending' && (
              <Box py="8px" px="16px" rounded="10px" bg="bg.200">
                <Stack spacing="2px">
                  <Text fontSize={12} fontWeight={500} color="brand.600">
                    Total Outstanding{' '}
                  </Text>
                  <Text fontWeight={500} fontSize={16}>
                    {FormatAmount(Number(outstandingBalance))}
                  </Text>
                </Stack>
              </Box>
            )}
          </Box>
        )}
      </TableContainer>
      <PaymentReceiptModal
        isOpen={openReceiptModal}
        onClose={() => setOpenReceiptModal(false)}
        selectedPayment={selectedPayment}
        propertyName={propertyName}
        clientName={clientName}
        clientPhone={clientPhone}
        clientEmail={clientEmail}
      />
    </Fragment>
  );
};

export default InstalmentPropertyPaymentHistory;
