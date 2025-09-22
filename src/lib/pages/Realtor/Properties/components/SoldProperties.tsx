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
} from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import {
  VerticalEllipsisIcon,
  ViewpropertyIcon,
  RealtorClientsIcon,
  PaymentHistoryIcon,
  PreviousPageIcon,
  NextPageIcon,
  ChevronDownIcon,
} from '~/lib/components/Icons/Icons';
import { FormatAmount } from '~/lib/utils/formatAmount';
import useNavigate from '~/lib/utils/useNavigate';

const PropertyListTable = ({ properties }: { properties: any[] }) => {
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
              Property Name
            </Th>
            <Th
              color="#222222"
              fontWeight={500}
              fontSize={14}
              textTransform="capitalize"
            >
              property Type
            </Th>
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
              Date Sold
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
              Commission
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
          {properties?.slice((page - 1) * limit, page * limit)?.map((asset) => {
            console.log(asset);

            return (
              <Tr key={asset} border="none" cursor="pointer">
                <Td fontSize={15} color="#222222" fontWeight={600}>
                  {asset?.property_name}
                </Td>
                <Td fontWeight={500} fontSize={14} color="#8295AA">
                  {asset?.property_type}
                </Td>
                <Td fontWeight={500} fontSize={14} color="#8295AA">
                  {asset?.client?.firstname} {asset?.client?.lastname}
                </Td>
                <Td fontWeight={500} fontSize={14} color="#8295AA">
                  {moment(asset?.payment_history?.[0]?.payment_date).format(
                    'ddd, Do MMMM YYYY'
                  )}
                </Td>
                <Td fontWeight={500} fontSize={14} color="#8295AA">
                  {FormatAmount(Number(asset?.amount_sold))}
                </Td>
                <Td fontWeight={500} fontSize={14} color="#8295AA">
                  {FormatAmount(Number(asset?.commission))}
                </Td>
                <Td>
                  <Menu>
                    <MenuButton as={Button} rounded="5px" bg="bg.200">
                      <VerticalEllipsisIcon />
                    </MenuButton>
                    <MenuList py="0px" rounded="16px">
                      <MenuItem
                        py="12px"
                        px="16px"
                        _hover={{ bg: 'border.100' }}
                        fontSize={14}
                        color="color.100"
                        fontWeight={500}
                        onClick={() =>
                          navigate(`/realtor/properties/hfjrhu4884?type=sold`)
                        }
                        icon={<ViewpropertyIcon />}
                      >
                        View property
                      </MenuItem>
                      <MenuItem
                        py="12px"
                        px="16px"
                        _hover={{ bg: 'border.100' }}
                        fontSize={14}
                        color="color.100"
                        fontWeight={500}
                        icon={<PaymentHistoryIcon />}
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
                        icon={<RealtorClientsIcon />}
                      >
                        View client
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {properties?.length > 0 && (
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

const PropertyStats = ({
  totalCommission,
  totalProperties,
  totalSoldPrice,
}: {
  totalCommission: number;
  totalProperties: number;
  totalSoldPrice: number;
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
          w="357px"
          h="auto"
          rounded="5px"
          border="1px solid"
          borderColor="border.100"
        >
          <Stack>
            <Box px="16px" py="12px">
              {' '}
              <Text mb="16px" fontSize={16} fontWeight={500} color="brand.600">
                Total properties
              </Text>
              <Heading fontSize={24} fontWeight={500}>
                {totalProperties}
              </Heading>
            </Box>
            <Box
              px="16px"
              py="12px"
              borderTop="1px solid"
              borderColor="border.100"
              fontWeight={500}
              fontSize={14}
            >
              <Text>
                Last Updated:{' '}
                <Box as="span" color="brand.100">
                  June 12, 2025
                </Box>
              </Text>
            </Box>
          </Stack>
        </Box>
        {/* second card */}
        <Box
          w="357px"
          h="auto"
          rounded="5px"
          border="1px solid"
          borderColor="border.100"
        >
          <Stack>
            <Box px="16px" py="12px">
              {' '}
              <Flex alignItems="flex-start" justifyContent="space-between">
                <Text
                  mb="16px"
                  fontSize={16}
                  fontWeight={500}
                  color="brand.600"
                >
                  Total Sales
                </Text>
                <Menu>
                  <MenuButton
                    fontSize={14}
                    bg="bg.700"
                    fontWeight={500}
                    color="brand.300"
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    px="14px"
                    h="33px"
                  >
                    This Month
                  </MenuButton>
                  <MenuList border="none" rounded="12px">
                    <MenuItem>This Month</MenuItem>
                    <MenuItem>Last Month</MenuItem>
                    <MenuItem>Last Year</MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
              <Heading fontSize={24} fontWeight={500}>
                ₦ {totalSoldPrice?.toLocaleString()}
              </Heading>
            </Box>
            <Box
              px="16px"
              py="12px"
              borderTop="1px solid"
              borderColor="border.100"
              fontWeight={500}
              fontSize={14}
            >
              <Text>
                Last Updated:{' '}
                <Box as="span" color="brand.100">
                  June 12, 2025
                </Box>
              </Text>
            </Box>
          </Stack>
        </Box>
        {/* third card */}
        <Box
          w="357px"
          h="auto"
          rounded="5px"
          border="1px solid"
          borderColor="border.100"
        >
          <Stack>
            <Box px="16px" py="12px">
              {' '}
              <Flex alignItems="flex-start" justifyContent="space-between">
                <Text
                  mb="16px"
                  fontSize={16}
                  fontWeight={500}
                  color="brand.600"
                >
                  Total Commission
                </Text>
                <Menu>
                  <MenuButton
                    fontSize={14}
                    bg="bg.700"
                    fontWeight={500}
                    color="brand.300"
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    px="14px"
                    h="33px"
                  >
                    This Month
                  </MenuButton>
                  <MenuList>
                    <MenuItem>This Month</MenuItem>
                    <MenuItem>Last Month</MenuItem>
                    <MenuItem>Last Year</MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
              <Heading fontSize={24} fontWeight={500}>
                ₦ {totalCommission?.toLocaleString()}
              </Heading>
            </Box>
            <Box
              px="16px"
              py="12px"
              borderTop="1px solid"
              borderColor="border.100"
              fontWeight={500}
              fontSize={14}
            >
              <Text>2% compared to last month</Text>
            </Box>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

const SoldProperties = ({ properties }: { properties: any }) => {
  return (
    <Box>
      <Stack spacing="20px">
        <PropertyStats
          totalCommission={properties?.totals?.total_commission}
          totalProperties={properties?.totals?.total_properties}
          totalSoldPrice={properties?.totals?.total_sold_price}
        />
        <PropertyListTable properties={properties?.payments} />
      </Stack>
    </Box>
  );
};

export default SoldProperties;
