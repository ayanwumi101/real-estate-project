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
} from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import {
  VerticalEllipsisIcon,
  ViewpropertyIcon,
  ViewPaymentIcon,
  PreviousPageIcon,
  NextPageIcon,
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
              Type
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
          {payments?.slice((page - 1) * limit, page * limit)?.map((asset) => {
            return (
              <Tr key={asset?.id} border="none" cursor="pointer">
                <Td fontSize={15} color="#222222" fontWeight={600}>
                  Instalment
                </Td>
                <Td fontWeight={500} fontSize={14} color="#8295AA">
                  {moment(asset?.payment_date).format('ddd, Do MMMM YYYY')}
                </Td>
                <Td fontWeight={500} fontSize={14} color="#8295AA">
                  {FormatAmount(Number(asset?.amount_paid))}
                </Td>
                <Td fontWeight={500} fontSize={14} color="#8295AA">
                  {FormatAmount(Number(asset?.commission))}
                </Td>
                <Td fontWeight={500} fontSize={14} color="#8295AA">
                  <Badge
                    colorScheme="green"
                    rounded="50px"
                    textTransform="capitalize"
                    padding="4px 10px"
                    fontSize={12}
                    fontWeight={500}
                    bg="bg.700"
                    color="color.400"
                  >
                    {asset?.status}
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
                        onClick={() =>
                          navigate(`/realtor/properties/hfjrhu4884`)
                        }
                        icon={<ViewPaymentIcon />}
                      >
                        View payment
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
  nextDuePayment,
}: {
  salesPrice?: number;
  totalAmountPaid?: number;
  totalCommission?: number;
  nextDuePayment: any;
}) => {
  return (
    <Box>
      <Flex
        w="full"
        alignItems="center"
        justifyContent="space-between"
        gap="16px"
        overflow="auto"
      >
        {/* first card */}
        <Box
          w="full"
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
          w="full"
          h="auto"
          rounded="5px"
          border="1px solid"
          borderColor="border.100"
        >
          <Box px="16px" py="12px">
            {' '}
            <Text mb="16px" fontSize={16} fontWeight={500} color="brand.600">
              Amount Paid
            </Text>
            <Heading fontSize={24} fontWeight={500}>
              {totalAmountPaid ? FormatAmount(totalAmountPaid) : '₦0.00'}
            </Heading>
          </Box>
        </Box>
        <Box
          w="full"
          h="auto"
          rounded="5px"
          border="1px solid"
          borderColor="border.100"
        >
          <Box px="16px" py="12px">
            {' '}
            <Text mb="16px" fontSize={16} fontWeight={500} color="brand.600">
              Commission Received
            </Text>
            <Heading fontSize={24} fontWeight={500}>
              {totalCommission ? FormatAmount(totalCommission) : '₦0.00'}
            </Heading>
          </Box>
        </Box>

        {/* fourth card */}
        <Box
          w="full"
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
              {moment(nextDuePayment?.due_date).format('ddd, Do MMMM YYYY') ||
                'N/A'}
            </Heading>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

const InstalmentPayments = ({ payments }: { payments: any }) => {
  return (
    <Box py="20px">
      <Stack spacing="20px">
        <PaymentStats
          salesPrice={payments?.data?.instalment_details?.sale_price}
          totalCommission={payments?.data?.instalment_details?.commission}
          totalAmountPaid={payments?.data?.instalment_details?.total_paid}
          nextDuePayment={payments?.data?.next_due_payment}
        />
        <PaymentListTable payments={payments?.data?.payments} />
      </Stack>
    </Box>
  );
};

export default InstalmentPayments;
