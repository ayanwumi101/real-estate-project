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
import { Heading } from '@chakra-ui/react';

const PaymentHistoryTable = ({ payments }: { payments: any[] }) => {
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
              Sale Type
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
              >
                <Td fontSize={15} fontWeight={600} textTransform="capitalize">
                  {payment?.type}
                </Td>
                <Td fontWeight={500} fontSize={14}>
                  {FormatAmount(Number(payment?.amount))}
                </Td>
                <Td fontWeight={500} fontSize={14}>
                  {FormatAmount(Number(payment?.commission))}
                </Td>
                <Td fontWeight={500} fontSize={14}>
                  {moment(payment?.date).format('ddd, Do MMMM YYYY')}
                </Td>
                <Td fontWeight={500} fontSize={14} textTransform="capitalize">
                  {payment?.status}
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
                        onClick={() =>
                          navigate(`/realtor/properties/hfjrhu4884`)
                        }
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
  );
};

export default PaymentHistoryTable;
