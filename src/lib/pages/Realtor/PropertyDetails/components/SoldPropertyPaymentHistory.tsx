import {
  Box,
  Flex,
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
  Heading,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import moment from 'moment';
import React, { useState, useEffect, useCallback } from 'react';
import {
  VerticalEllipsisIcon,
  PreviousPageIcon,
  NextPageIcon,
  InputSearchIcon,
  RealtorClientsIcon,
  PaymentHistoryIcon,
  AddPaymentIcon,
} from '~/lib/components/Icons/Icons';
import { FormatAmount } from '~/lib/utils/formatAmount';
import useNavigate from '~/lib/utils/useNavigate';
import AddPaymentModal from '../Modals/AddPaymentModal';
import PropertyFilter from '~/lib/components/PropertyFilter';

const PaymentListTable = ({
  payments,
  assetId,
  clientId,
}: {
  payments: any[];
  assetId: string;
  clientId: string;
}) => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(8);
  const assets = Array.from({ length: payments?.length }, (_, i) => ({
    id: i + 1,
  }));
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [selectedProperty, setSelectedProperty] = React.useState<any>(null);

  return (
    <TableContainer border="1px solid #E4E4E4" borderRadius="10px">
      <Table>
        <Thead color="#222222" bg="#F5F5F5" py="22px" h="53px" border="none">
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
              Date
            </Th>
            <Th
              color="#222222"
              fontWeight={500}
              fontSize={14}
              textTransform="capitalize"
            >
              Amount Paid
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
          {payments?.slice((page - 1) * limit, page * limit)?.map((payment) => {
            return (
              <Tr
                key={payment?.id}
                border="none"
                cursor="pointer"
                color="#222222"
                bg={payment?.sale_type === 'outright' ? '#ededed' : 'none'}
                textTransform="capitalize"
              >
                <Td fontSize={15} fontWeight={600} textTransform="capitalize">
                  {payment?.type || 'Instalment'}
                </Td>
                <Td fontWeight={500} fontSize={14}>
                  {moment(payment?.payment_date).format('ddd, Do MMMM YYYY')}
                </Td>
                <Td fontWeight={500} fontSize={14}>
                  {FormatAmount(
                    Number(payment?.amount || payment?.amount_sold)
                  )}
                </Td>
                <Td fontWeight={500} fontSize={14}>
                  {FormatAmount(Number(payment?.commission))}
                </Td>
                <Td fontWeight={500} fontSize={14}>
                  {payment?.status}
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
                        onClick={() => navigate(`/realtor/clients/${clientId}`)}
                        icon={<RealtorClientsIcon />}
                      >
                        View client profile
                      </MenuItem>
                      <MenuItem
                        py="12px"
                        px="16px"
                        _hover={{ bg: 'border.100' }}
                        fontSize={14}
                        color="color.100"
                        fontWeight={500}
                        onClick={() => {
                          setOpenModal(true);
                          setSelectedProperty(payment);
                        }}
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
      {payments?.length > 0 && (
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
      <AddPaymentModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        instalmentId={selectedProperty?.property_sale_id}
        dueDate={selectedProperty?.last_payment}
        clientId={selectedProperty?.client_id}
        nextPaymentDate={selectedProperty?.next_instalment_date}
      />
    </TableContainer>
  );
};

const PaymentStats = ({
  salesPrice,
  totalCommission,
}: {
  salesPrice?: number;
  totalCommission?: number;
} = {}) => {
  return (
    <Box>
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
          minW={['260px', '50%']}
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
        {/* third card */}
        <Box
          minW={['260px', '50%']}
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
    </Box>
  );
};

const SoldPropertyPaymentHistory = ({
  payments,
  assetId,
  clientId,
  salesPrice,
  commissionReceived,
}: {
  payments: any;
  clientId: string;
  assetId: string;
  salesPrice: string | number;
  commissionReceived: string | number;
}) => {
  const [filteredPayments, setFilteredPayments] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Additional filter states for PropertyFilter component
  const [salesType, setSalesType] = useState<string>('');
  const [handoverStatus, setHandoverStatus] = useState<string>('');
  const [allocationStatus, setAllocationStatus] = useState<string>('');
  const [documentationStatus, setDocumentationStatus] = useState<string>('');

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const propertySearchFilter = payments?.filter((payment: any) => {
      return payment?.client_name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
    setFilteredPayments(propertySearchFilter);
  }, [searchQuery]);

  // Handle filter changes
  const handleSalesTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSalesType(e.target.value);
  };

  useEffect(() => {
    if (salesType === 'all') {
      setFilteredPayments(payments);
      return;
    }
    const filteredPayments = payments?.filter((payment: any) => {
      return payment?.sale_type === salesType;
    });
    setFilteredPayments(filteredPayments);
  }, [salesType]);

  const handleHandoverStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setHandoverStatus(e.target.value);
  };

  useEffect(() => {
    if (handoverStatus === 'all') {
      setFilteredPayments(payments);
      return;
    }
    const filteredPayments = payments?.filter((payment: any) => {
      return payment?.handover_status === handoverStatus;
    });
    setFilteredPayments(filteredPayments);
  }, [handoverStatus]);

  const handleAllocationStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAllocationStatus(e.target.value);
  };

  useEffect(() => {
    if (allocationStatus === 'all') {
      setFilteredPayments(payments);
      return;
    }
    const filteredPayments = payments?.filter((payment: any) => {
      return payment?.allocation_status === allocationStatus;
    });
    setFilteredPayments(filteredPayments);
  }, [allocationStatus]);

  const handleDocumentationStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDocumentationStatus(e.target.value);
  };

  useEffect(() => {
    if (documentationStatus === 'all') {
      setFilteredPayments(payments);
      return;
    }
    const filteredPayments = payments?.filter((payment: any) => {
      return payment?.documentation_status === documentationStatus;
    });
    setFilteredPayments(filteredPayments);
  }, [documentationStatus]);

  useEffect(() => {
    setFilteredPayments(payments);
  }, [payments]);
  return (
    <Box py="20px" px={['20px', '0px']}>
      <Stack spacing="20px">
        <PaymentStats
          salesPrice={Number(salesPrice)}
          totalCommission={Number(commissionReceived)}
        />

        <PropertyFilter
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          salesType={salesType}
          handleSalesTypeChange={handleSalesTypeChange}
          handoverStatus={handoverStatus}
          handleHandoverStatusChange={handleHandoverStatusChange}
          allocationStatus={allocationStatus}
          handleAllocationStatusChange={handleAllocationStatusChange}
          documentationStatus={documentationStatus}
          handleDocumentationStatusChange={handleDocumentationStatusChange}
        />
        <PaymentListTable
          assetId={assetId}
          payments={filteredPayments}
          clientId={clientId}
        />
      </Stack>
    </Box>
  );
};

export default SoldPropertyPaymentHistory;
