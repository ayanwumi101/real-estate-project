import React from 'react';
import {
  Box,
  Stack,
  Flex,
  Text,
  Button,
  Heading,
  TableContainer,
  Thead,
  Tr,
  Th,
  Table,
  Td,
  Badge,
  Menu,
  MenuButton,
  MenuItem,
  Tbody,
  MenuList,
} from '@chakra-ui/react';
import {
  ChevronLeftIcon,
  VerticalEllipsisIcon,
  ViewPaymentIcon,
  PreviousPageIcon,
  NextPageIcon,
} from '~/lib/components/Icons/Icons';
import { FormatAmount } from '~/lib/utils/formatAmount';
import useNavigate from '~/lib/utils/useNavigate';
import moment from 'moment';
import PaymentReceiptModal from '../Modals/PaymentReceiptModal';

const InstalmentPropertyDetails = ({
  payments,
  totalSalePrice,
  totalCommission,
  totalPayment,
  propertyId,
}: {
  payments: any[];
  totalSalePrice: number;
  totalCommission: number;
  totalPayment: number;
  propertyId: string;
}) => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(8);
  const assets = Array.from({ length: payments?.length }, (_, i) => ({
    id: i + 1,
  }));
  const [openReceiptModal, setOpenReceiptModal] =
    React.useState<boolean>(false);
  const [selectedPayment, setSelectedPayment] = React.useState<any>(null);
  return (
    <Stack
      w="full"
      alignItems="flex-start"
      justifyContent="flex-start"
      spacing="20px"
      px={['20px', '0px']}
    >
      <Button
        onClick={() => navigate('/realtor/properties')}
        variant="ghost"
        leftIcon={<ChevronLeftIcon />}
        p="0"
        _hover={{ bg: 'none' }}
        color="brand.100"
      >
        Back
      </Button>
      <Box w="full">
        <Flex
          w="full"
          alignItems="center"
          justifyContent="space-between"
          gap="16px"
          overflow="auto"
          pb="2"
        >
          {/* first card */}
          <Box
            w="full"
            h="auto"
            rounded="5px"
            border="1px solid"
            borderColor="border.100"
            minW={['260px', '30%']}
          >
            <Box px="16px" py="12px">
              {' '}
              <Text mb="16px" fontSize={16} fontWeight={500} color="brand.600">
                Sales Price
              </Text>
              <Heading fontSize={24} fontWeight={500}>
                {totalSalePrice ? FormatAmount(totalSalePrice) : '₦0.00'}
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
            minW={['260px', '30%']}
          >
            <Box px="16px" py="12px">
              {' '}
              <Text mb="16px" fontSize={16} fontWeight={500} color="brand.600">
                Amount Paid
              </Text>
              <Heading fontSize={24} fontWeight={500}>
                {totalPayment ? FormatAmount(totalPayment) : '₦0.00'}
              </Heading>
            </Box>
          </Box>
          {/* third card */}
          <Box
            w="full"
            h="auto"
            rounded="5px"
            border="1px solid"
            borderColor="border.100"
            minW={['260px', '30%']}
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
                Client Name
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
            {payments
              ?.slice((page - 1) * limit, page * limit)
              ?.map((payment) => {
                return (
                  <Tr key={payment?.id} border="none" cursor="pointer">
                    <Td fontSize={15} color="#222222" fontWeight={600}>
                      Sale
                    </Td>
                    <Td fontWeight={500} fontSize={14} color="#8295AA">
                      {moment(payment?.payment_date).format(
                        'ddd, Do MMMM YYYY'
                      )}
                    </Td>
                    <Td fontWeight={500} fontSize={14} color="#8295AA">
                      {FormatAmount(
                        Number(payment?.amount_paid || payment?.amount_sold)
                      )}
                    </Td>
                    <Td fontWeight={500} fontSize={14} color="#8295AA">
                      {FormatAmount(Number(payment?.commission))}
                    </Td>
                    <Td fontWeight={500} fontSize={14} color="#8295AA">
                      {payment?.client_name}
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
                        {payment?.status || 'Completed'}
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
      {/* <PaymentReceiptModal
        isOpen={openReceiptModal}
        onClose={() => setOpenReceiptModal(false)}
        selectedPayment={selectedPayment}
      /> */}
    </Stack>
  );
};

export default InstalmentPropertyDetails;
