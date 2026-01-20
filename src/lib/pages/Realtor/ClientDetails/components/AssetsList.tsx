import React, { Fragment } from 'react';
import {
  Box,
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
  Flex,
  Heading,
  Text,
  Badge,
} from '@chakra-ui/react';
import {
  VerticalEllipsisIcon,
  PreviousPageIcon,
  NextPageIcon,
  ViewpropertyIcon,
  RegisterSaleIcon,
  PaymentHistoryIcon,
  AddPaymentIcon,
} from '~/lib/components/Icons/Icons';
import useNavigate from '~/lib/utils/useNavigate';
import { FormatAmount } from '~/lib/utils/formatAmount';
import SkeletonLoader from '~/lib/components/SkeletonLoader';




const AssetsList = ({ assets, loading }: { assets: any[], loading: boolean }) => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(8);
  return (
    <Fragment>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <TableContainer border="1px solid #E4E4E4" borderRadius="10px">
          <Table>
            <Thead
              color="#222222"
              bg="#F5F5F5"
              py="22px"
              h="53px"
              border="none"
            >
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
                  Property Address
                </Th>
                <Th
                  color="#222222"
                  fontWeight={500}
                  fontSize={14}
                  textTransform="capitalize"
                >
                  Property Type
                </Th>
                {/* <Th
              color="#222222"
              fontWeight={500}
              fontSize={14}
              textTransform="capitalize"
            >
              Asset Manager
            </Th> */}
                <Th
                  color="#222222"
                  fontWeight={500}
                  fontSize={14}
                  textTransform="capitalize"
                >
                  Price
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
              {assets?.slice((page - 1) * limit, page * limit)?.map((asset) => {
                return (
                  <Tr key={asset} border="none" cursor="pointer">
                    <Td fontSize={15} color="#222222" fontWeight={600}>
                      {asset?.property_name}
                    </Td>
                    <Td fontWeight={500} fontSize={14} color="#8295AA">
                      {asset?.property_address}
                    </Td>
                    <Td fontWeight={500} fontSize={14} color="#8295AA">
                      {asset?.property_type}
                    </Td>
                    {/* <Td fontWeight={500} fontSize={14} color="#8295AA">
                  {asset?.manager}
                </Td> */}
                    <Td fontWeight={500} fontSize={14} color="#8295AA">
                      {FormatAmount(Number(asset?.price))}
                    </Td>
                    <Td>
                      <Badge
                        bg={
                          asset?.status === 'instalment'
                            ? '#F6EDDF'
                            : asset?.status === 'sold'
                              ? '#E7F5EC'
                              : 'bg.200'
                        }
                        color={
                          asset?.status === 'instalment'
                            ? '#E1A101'
                            : asset?.status === 'sold'
                              ? '#1BD155'
                              : 'brand.100'
                        }
                        px="12px"
                        py="4px"
                        fontSize={12}
                        fontWeight={500}
                        textTransform="capitalize"
                        rounded="50px"
                      >
                        {asset?.status}
                      </Badge>
                    </Td>
                    <Td>
                      <Menu>
                        <MenuButton as={Button} rounded="5px" bg="bg.200">
                          <VerticalEllipsisIcon />
                        </MenuButton>
                        <MenuList py="0px">
                          <MenuItem
                            py="12px"
                            px="16px"
                            _hover={{ bg: 'border.100' }}
                            fontSize={14}
                            color="color.100"
                            fontWeight={500}
                            onClick={() =>
                              navigate(
                                `/realtor/properties/${asset?.property_id}`
                              )
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
                            onClick={() =>
                              navigate(
                                `/realtor/properties/payment-history/${asset?.property_sale_id}`
                              )
                            }
                            icon={<PaymentHistoryIcon />}
                          >
                            View payment history
                          </MenuItem>
                          {/* <MenuItem
                            py="12px"
                            px="16px"
                            _hover={{ bg: 'border.100' }}
                            fontSize={14}
                            color="color.100"
                            fontWeight={500}
                            icon={<AddPaymentIcon />}
                            onClick={() =>
                              navigate(
                                `/realtor/properties/57478493/register-sale`
                              )
                            }
                          >
                            Add new payment
                          </MenuItem>
                          <MenuItem
                            py="12px"
                            px="16px"
                            _hover={{ bg: 'border.100' }}
                            fontSize={14}
                            color="color.100"
                            fontWeight={500}
                            icon={<RegisterSaleIcon />}
                            onClick={() =>
                              navigate(
                                `/realtor/properties/57478493/register-sale`
                              )
                            }
                          >
                            Update asset status
                          </MenuItem> */}
                        </MenuList>
                      </Menu>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
          {assets?.length > 0 && (
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
      )}
    </Fragment>
  );
};

export default AssetsList;
