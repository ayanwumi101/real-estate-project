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
import React from 'react';
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

const PaymentListTable = ({ payments }: { payments: any[] }) => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(8);
  const assets = Array.from({ length: 10 }, (_, i) => ({ id: i + 1 }));
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
          {payments?.slice((page - 1) * limit, page * limit)?.map((asset) => {
            return (
              <Tr
                key={asset?.id}
                border="none"
                cursor="pointer"
                color="#222222"
              >
                <Td fontWeight={500} fontSize={14}>
                  {asset?.client_name}
                </Td>
                <Td fontSize={15} fontWeight={600} textTransform="capitalize">
                  {asset?.sale_type}
                </Td>
                <Td fontWeight={500} fontSize={14}>
                  {FormatAmount(Number(asset?.sale_price))}
                </Td>
                <Td fontWeight={500} fontSize={14}>
                  {FormatAmount(Number(asset?.amount_paid))}
                </Td>
                <Td fontWeight={500} fontSize={14}>
                  {FormatAmount(Number(asset?.commission))}
                </Td>
                <Td fontWeight={500} fontSize={14}>
                  {moment(asset?.date_sold).format('ddd, Do MMMM YYYY')}
                </Td>
                <Td fontWeight={500} fontSize={14}>
                  {moment(asset?.last_payment).format('ddd, Do MMMM YYYY')}
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
                          navigate(`/realtor/properties/hfjrhu4884`)
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
                          navigate(`/realtor/properties/hfjrhu4884`)
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

const Payments = ({ payments }: { payments: any }) => {
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
            />
          </InputGroup>
          <Flex
            alignItems="center"
            gap="20px"
            flexWrap={['wrap', 'nowrap']}
            // w="full"
          >
            <Box w={['full', '250px']}>
              <Flex
                alignItems="center"
                gap={['0px', '5px']}
                flexWrap={['wrap', 'nowrap']}
              >
                <FormLabel fontSize={[15, 16]}>Sale Type:</FormLabel>
                <Select w={['full', '140px']} fontSize={14} rounded="50px">
                  <option value="all">All</option>
                  <option value="sale">Sale</option>
                  <option value="instalment">Instalment</option>
                </Select>
              </Flex>
            </Box>
            <Box w={['full', '200px']}>
              <Flex
                alignItems="center"
                gap={['0px', '5px']}
                flexWrap={['wrap', 'nowrap']}
              >
                <FormLabel fontSize={[15, 16]}>Status:</FormLabel>
                <Select w="full" fontSize={14} rounded="50px">
                  <option value="all">All</option>
                  <option value="sale">Pending</option>
                  <option value="instalment">Completed</option>
                </Select>
              </Flex>
            </Box>
          </Flex>
        </Flex>
        <PaymentListTable payments={payments?.sales} />
      </Stack>
    </Box>
  );
};

export default Payments;
