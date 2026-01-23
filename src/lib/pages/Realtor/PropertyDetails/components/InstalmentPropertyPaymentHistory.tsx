import {
  Stack,
  Box,
  Button,
  Flex,
  Text,
  Heading,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Badge,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import moment from 'moment';
import React, { Fragment } from 'react';
import { FormatAmount } from '~/lib/utils/formatAmount';
import PaymentReceiptModal from '../Modals/PaymentReceiptModal';
import {
  ViewPaymentIcon,
  VerticalEllipsisIcon,
  PreviousPageIcon,
  NextPageIcon,
} from '~/lib/components/Icons/Icons';

interface InstalmentpropertyPaymentHistoryProps {
  paymentHistory: any[];
  activeTab: 'completed' | 'pending';
  outstandingBalance: number;
  propertyName: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
}

const InstalmentPropertyPaymentHistoryTable = ({
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

const PaymentStats = ({
  salesPrice,
  totalAmountPaid,
  totalCommission,
  noOfSales,
  propertyType,
  outstandingBalance,
  nextDueDate,
}: {
  salesPrice?: number;
  totalAmountPaid?: number;
  totalCommission?: number;
  noOfSales?: number;
  propertyType: string;
  outstandingBalance: number;
  nextDueDate?: string | Date;
}) => {
  return (
    <Box w="full">
      {propertyType === 'instalment' ? (
        <Flex
          w="full"
          alignItems="center"
          justifyContent="space-between"
          gap="10px"
          overflow="auto"
          pb="2"
          // flexWrap="wrap"
        >
          {/* first card */}
          <Box
            minW={['260px', '24%']}
            h="auto"
            rounded="5px"
            border="1px solid"
            borderColor="border.100"
          >
            <Box px="16px" py="12px">
              {' '}
              <Text mb="16px" fontSize={16} fontWeight={500} color="brand.600">
                Sales Price
              </Text>
              <Heading fontSize={24} fontWeight={500}>
                {salesPrice ? FormatAmount(salesPrice) : '₦0.00'}
              </Heading>
            </Box>
          </Box>
          {/* second card */}
          <Box
            minW={['260px', '24%']}
            h="auto"
            rounded="5px"
            border="1px solid"
            borderColor="border.100"
          >
            <Box px="16px" py="12px">
              {' '}
              <Text mb="16px" fontSize={16} fontWeight={500} color="brand.600">
                Total Paid
              </Text>
              <Heading fontSize={24} fontWeight={500}>
                {totalAmountPaid ? FormatAmount(totalAmountPaid) : '₦0.00'}
              </Heading>
            </Box>
          </Box>
          {/* third card */}
          <Box
            minW={['260px', '24%']}
            h="auto"
            rounded="5px"
            border="1px solid"
            borderColor="border.100"
          >
            <Box px="16px" py="12px">
              {' '}
              <Text mb="16px" fontSize={16} fontWeight={500} color="brand.600">
                Outstanding
              </Text>
              <Heading fontSize={24} fontWeight={500}>
                {totalCommission ? FormatAmount(outstandingBalance) : '₦0.00'}
              </Heading>
            </Box>
          </Box>
          {/* third card */}
          <Box
            minW={['260px', '24%']}
            h="auto"
            rounded="5px"
            border="1px solid"
            borderColor="border.100"
          >
            <Box px="16px" py="12px">
              {' '}
              <Text mb="16px" fontSize={16} fontWeight={500} color="brand.600">
                Commision Received
              </Text>
              <Heading fontSize={24} fontWeight={500}>
                {totalCommission ? FormatAmount(totalCommission) : '₦0.00'}
              </Heading>
            </Box>
          </Box>
          <Box
            minW={['260px', '24%']}
            h="auto"
            rounded="5px"
            border="1px solid"
            borderColor="border.100"
          >
            <Box px="16px" py="12px">
              {' '}
              <Text mb="16px" fontSize={16} fontWeight={500} color="brand.600">
                Next Due Payment
              </Text>
              <Heading fontSize={24} fontWeight={500}>
                {nextDueDate
                  ? moment(nextDueDate).format('ddd, DD MMM YYYY')
                  : 'N/A'}
              </Heading>
            </Box>
          </Box>
        </Flex>
      ) : (
        <Flex
          w="full"
          alignItems="center"
          justifyContent="space-between"
          gap="10px"
          overflow="auto"
          pb="2"
        >
          {/* first card */}
          <Box
            minW={['260px', '33%']}
            h="auto"
            rounded="5px"
            border="1px solid"
            borderColor="border.100"
          >
            <Box px="16px" py="12px">
              {' '}
              <Text mb="16px" fontSize={16} fontWeight={500} color="brand.600">
                Sales Price
              </Text>
              <Heading fontSize={24} fontWeight={500}>
                {salesPrice ? FormatAmount(salesPrice) : '₦0.00'}
              </Heading>
            </Box>
          </Box>
          {/* second card */}
          <Box
            minW={['260px', '33%']}
            h="auto"
            rounded="5px"
            border="1px solid"
            borderColor="border.100"
          >
            <Box px="16px" py="12px">
              {' '}
              <Text mb="16px" fontSize={16} fontWeight={500} color="brand.600">
                Total Payments
              </Text>
              <Heading fontSize={24} fontWeight={500}>
                {totalAmountPaid ? FormatAmount(totalAmountPaid) : '₦0.00'}
              </Heading>
            </Box>
          </Box>
          {/* third card */}
          <Box
            minW={['260px', '33%']}
            h="auto"
            rounded="5px"
            border="1px solid"
            borderColor="border.100"
          >
            <Box px="16px" py="12px">
              {' '}
              <Text mb="16px" fontSize={16} fontWeight={500} color="brand.600">
                Commision Received
              </Text>
              <Heading fontSize={24} fontWeight={500}>
                {totalCommission ? FormatAmount(totalCommission) : '₦0.00'}
              </Heading>
            </Box>
          </Box>
        </Flex>
      )}
    </Box>
  );
};

const InstalmentPropertyPaymentHistory = ({
  salesPrice,
  totalAmountPaid,
  totalCommission,
  outstandingBalance,
  nextDuePaymentDate,
  payments,
  assetId,
  propertyName,
  clientEmail,
  clientName,
  clientPhone,
}: {
  salesPrice: number;
  totalAmountPaid: number;
  outstandingBalance: number;
  totalCommission: number;
  nextDuePaymentDate: string | Date;
  payments: {
    id: number;
    amount: string;
    payment_date: string;
    commission: string;
    type: string;
    status: string;
    schedule_id: string;
  }[];
  assetId: string;
  clientName: string;
  propertyName: string;
  clientEmail: string;
  clientPhone: string;
}) => {
  const [activeTab, setActiveTab] = React.useState<'completed' | 'pending'>(
    'completed'
  );
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  return (
    <Box py="20px" px={['20px', '0px']} w="full">
      <Stack w="full" spacing="20px" alignItems="flex-start">
        <PaymentStats
          salesPrice={salesPrice}
          totalCommission={totalCommission}
          totalAmountPaid={totalAmountPaid}
          noOfSales={payments?.length}
          propertyType="instalment"
          outstandingBalance={outstandingBalance}
          nextDueDate={nextDuePaymentDate}
        />
        <Box w="full">
          <Stack spacing="20px" w="full">
            {/* navigation tab goes here */}
            <Flex
              alignItems="center"
              justifyContent="space-between"
              flexDirection={['column', 'row']}
              gap={['20px', 0]}
            >
              <Flex alignItems="center" gap="10px">
                {[
                  {
                    label: 'Completed Payments',
                    value: 'completed',
                  },
                  {
                    label: 'Pending Payments',
                    value: 'pending',
                  },
                ].map((tab) => (
                  <Button
                    key={tab.value}
                    onClick={() =>
                      setActiveTab(tab.value as 'completed' | 'pending')
                    }
                    border="none"
                    rounded="50px"
                    h="40px"
                    bg={activeTab === tab.value ? 'brand.500' : 'none'}
                    color={activeTab === tab.value ? 'brand.100' : 'brand.800'}
                    fontSize={15}
                    fontWeight={600}
                    px="22px"
                    py="16px"
                    textTransform={'capitalize'}
                  >
                    {tab.label}
                  </Button>
                ))}
              </Flex>
              <Button
                bg="brand.100"
                color="brand.200"
                fontWeight={500}
                fontSize={15}
                onClick={() => setOpenModal(true)}
                w={['full', 'auto']}
              >
                Add new payment
              </Button>
            </Flex>
            <InstalmentPropertyPaymentHistoryTable
              paymentHistory={payments}
              activeTab={activeTab}
              outstandingBalance={outstandingBalance}
              propertyName={propertyName}
              clientName={clientName}
              clientPhone={clientPhone}
              clientEmail={clientEmail}
            />
          </Stack>
        </Box>
      </Stack>
      {/* <AddPaymentModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        instalmentId={paymentHistory?.property_sale_id}
        dueDate={
          paymentHistory?.next_instalment_date ||
          paymentHistory?.first_payment_date
        }
        clientId={paymentHistory?.client_id}
        nextPaymentDate={paymentHistory?.next_instalment_date}
      /> */}
    </Box>
  );
};

export default InstalmentPropertyPaymentHistory;
