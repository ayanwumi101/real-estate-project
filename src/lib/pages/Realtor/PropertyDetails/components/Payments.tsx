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

const PaymentListTable = () => {
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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            ?.slice((page - 1) * limit, page * limit)
            ?.map((asset) => {
              return (
                <Tr key={asset} border="none" cursor="pointer">
                  <Td fontSize={15} color="#222222" fontWeight={600}>
                    Sale
                  </Td>
                  <Td fontWeight={500} fontSize={14} color="#8295AA">
                    Thursday, Jan 24, 2020
                  </Td>
                  <Td fontWeight={500} fontSize={14} color="#8295AA">
                    {FormatAmount(Number(500000))}
                  </Td>
                  <Td fontWeight={500} fontSize={14} color="#8295AA">
                    {FormatAmount(Number(500000))}
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
                      Completed
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
      {[1, 2, 3, 4, 5, 6, 7, 8, 10]?.length > 0 && (
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

const PaymentStats = () => {
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
              Sale Price
            </Text>
            <Heading fontSize={24} fontWeight={500}>
              ₦25,005,900
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
              ₦25,005,900
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
        >
          <Box px="16px" py="12px">
            {' '}
            <Text mb="16px" fontSize={16} fontWeight={500} color="brand.600">
              Commision Received
            </Text>
            <Heading fontSize={24} fontWeight={500}>
              ₦25,005,900
            </Heading>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

const Payments = () => {
  return (
    <Box py="20px">
      <Stack spacing="20px">
        <PaymentStats />
        <PaymentListTable />
      </Stack>
    </Box>
  );
};

export default Payments;
