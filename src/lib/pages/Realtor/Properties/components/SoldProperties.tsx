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
  Portal,
} from '@chakra-ui/react';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { GetSoldRealtorProperties } from '~/lib/api/services/propertiesService';
import {
  VerticalEllipsisIcon,
  ViewpropertyIcon,
  RealtorClientsIcon,
  PaymentHistoryIcon,
  PreviousPageIcon,
  NextPageIcon,
  ChevronDownIcon,
} from '~/lib/components/Icons/Icons';
import { PropertyFilterWithLocation } from '~/lib/components/PropertyFilter';
import SkeletonLoader from '~/lib/components/SkeletonLoader';
import { FormatAmount } from '~/lib/utils/formatAmount';
import useNavigate from '~/lib/utils/useNavigate';

const PropertyListTable = ({
  properties,
  loading,
}: {
  properties: any[];
  loading: boolean;
}) => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(8);
  const assets = Array.from({ length: 10 }, (_, i) => ({ id: i + 1 }));
  return (
    <Box>
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
              {properties
                ?.slice((page - 1) * limit, page * limit)
                ?.map((asset) => {
                  return (
                    <Tr
                      key={asset}
                      border="none"
                      cursor="pointer"
                      onClick={() =>
                        navigate(
                          `/realtor/properties/${asset?.property_id}?type=sold`
                        )
                      }
                    >
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
                        {moment(asset?.payment_date).format(
                          'ddd, Do MMMM YYYY'
                        )}
                      </Td>
                      <Td fontWeight={500} fontSize={14} color="#8295AA">
                        {FormatAmount(Number(asset?.amount_sold))}
                      </Td>
                      <Td fontWeight={500} fontSize={14} color="#8295AA">
                        {FormatAmount(Number(asset?.commission))}
                      </Td>
                      <Td
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Menu>
                          <MenuButton as={Button} rounded="5px" bg="bg.200">
                            <VerticalEllipsisIcon />
                          </MenuButton>
                          <Portal>
                            <MenuList py="0px" rounded="16px">
                              <MenuItem
                                py="12px"
                                px="16px"
                                _hover={{ bg: 'border.100' }}
                                fontSize={14}
                                color="color.100"
                                fontWeight={500}
                                onClick={() =>
                                  navigate(
                                    `/realtor/properties/${asset?.property_sale_id}?type=sold`
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
                                icon={<PaymentHistoryIcon />}
                                onClick={() =>
                                  navigate(
                                    `/realtor/properties/payment-history/${asset?.property_sale_id}`
                                  )
                                }
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
                                onClick={() =>
                                  navigate(
                                    `/realtor/clients/${asset?.client?.id}`
                                  )
                                }
                              >
                                View client
                              </MenuItem>
                            </MenuList>
                          </Portal>
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
      )}
    </Box>
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
        gap="10px"
        overflow="auto"
        pb="3"
      >
        {/* first card */}
        <Box
          minW={['357px', '33%']}
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
                  {moment(new Date()).format('Do MMMM, YYYY')}
                </Box>
              </Text>
            </Box>
          </Stack>
        </Box>
        {/* second card */}
        <Box
          minW={['357px', '33%']}
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
                  {moment(new Date()).format('Do MMMM, YYYY')}
                </Box>
              </Text>
            </Box>
          </Stack>
        </Box>
        {/* third card */}
        <Box
          minW={['357px', '33%']}
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

const SoldProperties = ({
  loading,
  properties,
  filteredProperties,
  location,
  setLocation,
  setProperties,
  setFilteredProperties,
  allocationStatus,
  setAllocationStatus,
  handoverStatus,
  setHandoverStatus,
  documentationStatus,
  setDocumentationStatus,
  states
}: {
  loading: boolean;
  properties: any;
  filteredProperties: any;
  location: string;
  setLocation: (location: string) => void;
  setProperties: (properties: any) => void;
  setFilteredProperties: (filteredProperties: any) => void;
  allocationStatus: string;
  setAllocationStatus: (allocationStatus: string) => void;
  handoverStatus: string;
  setHandoverStatus: (handoverStatus: string) => void;
  documentationStatus: string;
  setDocumentationStatus: (documentationStatus: string) => void;
  states: {
    id: string;
    name: string;
    state_code: string;
    latitude: string;
    longitude: string;
    type: string;
  }[];
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (searchQuery) {
      const propertySearchFilter = filteredProperties?.items?.filter(
        (property: any) => {
          return property?.property_name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase());
        }
      );
      setFilteredProperties(propertySearchFilter);
    } else {
      setFilteredProperties(properties?.items);
    }
  }, [searchQuery]);

  const handleHandoverStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setHandoverStatus(e.target.value);
  };

  const handleAllocationStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAllocationStatus(e.target.value);
  };

  const handleDocumentationStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDocumentationStatus(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.target.value);
  };

  // useEffect(() => {
  //   setFilteredProperties(properties?.data?.items);
  // }, [properties]);

  return (
    <Box>
      <Stack spacing="20px">
        <PropertyStats
          totalCommission={properties?.total_commission}
          totalProperties={properties?.total_payments}
          totalSoldPrice={properties?.total_sold_price}
        />
        <PropertyFilterWithLocation
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          handoverStatus={handoverStatus}
          handleHandoverStatusChange={handleHandoverStatusChange}
          allocationStatus={allocationStatus}
          handleAllocationStatusChange={handleAllocationStatusChange}
          documentationStatus={documentationStatus}
          handleDocumentationStatusChange={handleDocumentationStatusChange}
          location={location}
          handleLocationChange={handleLocationChange}
          states={states}
        />
        <PropertyListTable
          properties={filteredProperties?.items}
          loading={loading}
        />
      </Stack>
    </Box>
  );
};

export default SoldProperties;
