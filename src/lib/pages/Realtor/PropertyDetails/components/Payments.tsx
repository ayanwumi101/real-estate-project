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
  Badge,
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
  ViewpropertyIcon,
  ViewPaymentIcon,
  PreviousPageIcon,
  NextPageIcon,
  InputSearchIcon,
} from '~/lib/components/Icons/Icons';
import { FormatAmount } from '~/lib/utils/formatAmount';
import useNavigate from '~/lib/utils/useNavigate';

const PaymentListTable = ({
  payments,
  assetId,
}: {
  payments: any[];
  assetId: string;
}) => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(8);
  const assets = Array.from({ length: payments?.length }, (_, i) => ({
    id: i + 1,
  }));
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
              Client
            </Th>
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
              Sale Price
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
              Date Sold
            </Th>
            <Th
              color="#222222"
              fontWeight={500}
              fontSize={14}
              textTransform="capitalize"
            >
              Last Payment
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
              >
                <Td fontWeight={500} fontSize={14} textTransform="capitalize">
                  {payment?.client_name}
                </Td>
                <Td fontSize={15} fontWeight={600} textTransform="capitalize">
                  {payment?.sale_type || 'Instalment'}
                </Td>
                <Td fontWeight={500} fontSize={14}>
                  {FormatAmount(
                    Number(payment?.amount_sold || payment?.sale_price)
                  )}
                </Td>
                <Td fontWeight={500} fontSize={14}>
                  {FormatAmount(
                    Number(
                      payment?.sale_type === 'outright'
                        ? payment?.amount_sold || payment?.sale_price
                        : payment?.amount_paid
                    )
                  )}
                </Td>
                <Td fontWeight={500} fontSize={14}>
                  {FormatAmount(Number(payment?.commission))}
                </Td>
                <Td fontWeight={500} fontSize={14}>
                  {moment(payment?.date_sold).format('ddd, Do MMMM YYYY')}
                </Td>
                <Td fontWeight={500} fontSize={14}>
                  {moment(payment?.last_payment).format('ddd, Do MMMM YYYY')}
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
                        onClick={() =>
                          navigate(
                            `/realtor/properties/payment-history/${payment?.property_sale_id}`
                          )
                        }
                        icon={<ViewPaymentIcon />}
                      >
                        View payment history
                      </MenuItem>
                      <MenuItem
                        py="12px"
                        px="16px"
                        _hover={{ bg: 'border.100' }}
                        fontSize={14}
                        color="color.100"
                        fontWeight={500}
                        onClick={() =>
                          navigate(`/realtor/clients/${payment?.client_id}`)
                        }
                        icon={<ViewPaymentIcon />}
                      >
                        View client profile
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
    </TableContainer>
  );
};

const PaymentStats = ({
  salesPrice,
  totalAmountPaid,
  totalCommission,
  noOfSales,
}: {
  salesPrice?: number;
  totalAmountPaid?: number;
  totalCommission?: number;
  noOfSales?: number;
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
              Total Payments
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
              Number of Sales
            </Text>
            <Heading fontSize={24} fontWeight={500}>
              {noOfSales || 0}
            </Heading>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

const Payments = ({
  payments,
  assetId,
}: {
  payments: any;
  assetId: string;
}) => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [propertySaleFilter, setPropertySaleFilter] = useState<
    'all' | 'outright' | 'instalment'
  >('all');
  const [filteredPayments, setFilteredPayments] = useState<any[]>([]);

  // Filter payments based on search keyword and sale type
  const filterPayments = useCallback(() => {
    if (!payments?.sales) return [];

    return payments.sales.filter((payment: any) => {
      // Filter by sale type
      const matchesSaleType =
        propertySaleFilter === 'all' ||
        payment?.sale_type === propertySaleFilter;

      // Filter by search keyword (client name)
      const matchesSearch =
        !searchKeyword ||
        (payment?.client_name?.toLowerCase() || '').includes(
          searchKeyword.toLowerCase()
        );

      return matchesSaleType && matchesSearch;
    });
  }, [payments?.sales, propertySaleFilter, searchKeyword]);

  // Update filtered payments when filters or search changes
  useEffect(() => {
    const filtered = filterPayments();
    setFilteredPayments(filtered);
  }, [filterPayments]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  // Handle sale type filter change
  const handleSaleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPropertySaleFilter(e.target.value as 'all' | 'outright' | 'instalment');
  };

  return (
    <Box py="20px" px={['20px', '0px']}>
      <Stack spacing="20px">
        <PaymentStats
          salesPrice={payments?.total_sale_price}
          totalCommission={payments?.total_commission_received}
          totalAmountPaid={payments?.total_payment}
          noOfSales={payments?.number_of_sales}
        />
        <Flex
          alignItems="center"
          justifyContent="space-between"
          flexWrap={['wrap', 'nowrap']}
          gap={['20px', '0px']}
          w="full"
        >
          <InputGroup w={['full', '325px']}>
            <InputLeftElement pointerEvents="none">
              <InputSearchIcon />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search client..."
              rounded="50px"
              fontSize={14}
              w="full"
              _placeholder={{ color: 'gray.500' }}
              value={searchKeyword}
              onChange={handleSearchChange}
            />
          </InputGroup>

          <Box w={['full', '250px']}>
            <Flex
              alignItems="center"
              gap={['0px', '5px']}
              flexWrap={['wrap', 'nowrap']}
            >
              <FormLabel fontSize={[15, 16]}>Sale Type:</FormLabel>
              <Select
                value={propertySaleFilter}
                onChange={handleSaleTypeChange}
                w={['full', '140px']}
                fontSize={14}
                rounded="50px"
              >
                <option value="all">All</option>
                <option value="outright">Outright</option>
                <option value="instalment">Instalment</option>
              </Select>
            </Flex>
          </Box>
        </Flex>
        <PaymentListTable assetId={assetId} payments={filteredPayments} />
      </Stack>
    </Box>
  );
};

export default Payments;
