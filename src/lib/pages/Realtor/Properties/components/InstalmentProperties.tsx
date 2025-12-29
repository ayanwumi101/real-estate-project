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
import React, { Fragment, useEffect } from 'react';
import {
  VerticalEllipsisIcon,
  ViewpropertyIcon,
  RealtorClientsIcon,
  PaymentHistoryIcon,
  PreviousPageIcon,
  NextPageIcon,
  ChevronDownIcon,
  AddPaymentIcon,
  RegisterSaleIcon,
} from '~/lib/components/Icons/Icons';
import { findClosestPaymentDueDate } from '~/lib/utils/findClosestDueAsset';
import { FormatAmount } from '~/lib/utils/formatAmount';
import useNavigate from '~/lib/utils/useNavigate';
import AddPaymentModal from '../../PropertyDetails/Modals/AddPaymentModal';
import { GetPropertyDueDates } from '~/lib/api/services/propertiesService';
import SkeletonLoader from '~/lib/components/SkeletonLoader';

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
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedProperty, setSelectedProperty] = React.useState<any>(null);
  const [dueDates, setDueDates] = React.useState<any>([]);

  const GetDueDates = async () => {
    if (selectedProperty) {
      try {
        const res = await GetPropertyDueDates(
          selectedProperty?.property_sale_id
        );
        setDueDates(res?.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    GetDueDates();
  }, [selectedProperty]);

  return (
    <Box>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <Fragment>
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
                            `/realtor/properties/${asset?.property_id}?type=instalment`
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
                          {asset?.client_name}
                        </Td>
                        <Td fontWeight={500} fontSize={14} color="#8295AA">
                          {FormatAmount(Number(asset?.sale_price))}
                        </Td>
                        <Td fontWeight={500} fontSize={14} color="#8295AA">
                          {FormatAmount(Number(asset?.total_amount_paid))}
                        </Td>
                        <Td fontWeight={500} fontSize={14} color="#8295AA">
                          {FormatAmount(Number(asset?.commission))}
                        </Td>
                        <Td onClick={(e) => e.stopPropagation()}>
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
                                      `/realtor/properties/${asset?.property_id}?type=instalment`
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
                                  icon={<AddPaymentIcon />}
                                  onClick={() => {
                                    setOpenModal(true);
                                    setSelectedProperty(asset);
                                  }}
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
                                  icon={<RealtorClientsIcon />}
                                  onClick={() =>
                                    navigate(
                                      `/realtor/clients/${asset?.client_id}`
                                    )
                                  }
                                >
                                  View client
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
                                      `/realtor/properties/${asset?.property_id}/register-sale?type=fully_sold`
                                    )
                                  }
                                >
                                  Change property status to fully sold
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
                        prev < Math.ceil(properties.length / limit)
                          ? prev + 1
                          : prev
                      )
                    }
                    isDisabled={page >= Math.ceil(properties.length / limit)}
                  >
                    <NextPageIcon />
                  </Button>
                </Flex>
              </Box>
            )}
          </TableContainer>
          <AddPaymentModal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            instalmentId={selectedProperty?.property_sale_id}
            dueDate={
              selectedProperty?.next_instalment_date ||
              selectedProperty?.first_payment_date
            }
            clientId={selectedProperty?.client_id}
            nextPaymentDate={selectedProperty?.next_instalment_date}
          />
        </Fragment>
      )}
    </Box>
  );
};

const PropertyStats = ({
  totalProperties,
  totalInstalment,
  totalCommission,
  nextDueProperty,
}: {
  totalProperties: number;
  totalInstalment: number;
  totalCommission: number;
  nextDueProperty: any;
}) => {
  return (
    <Box w="full" overflow="auto">
      <Flex
        w="full"
        // alignItems="center"
        justifyContent="space-between"
        gap="10px"
        overflow="auto"
        pb="3"
      >
        {/* first card */}
        <Box
          minW={['357px', '24.5%']}
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
          minW={['357px', '24.5%']}
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
                  Total Instalment
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
                {FormatAmount(totalInstalment)}
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
          minW={['357px', '24.5%']}
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
                {FormatAmount(totalCommission)}
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
        {/* Fourth card */}
        <Box
          minW={['357px', '24.5%']}
          h="auto"
          rounded="5px"
          border="1px solid"
          borderColor="border.100"
        >
          <Stack spacing="16px" px="16px" py="12px">
            <Text fontSize={16} fontWeight={500} color="brand.600">
              Next Due Payment
            </Text>
            <Heading fontSize={24} fontWeight={500}>
              {nextDueProperty?.due_date
                ? moment(nextDueProperty?.due_date).format('ddd,DD MMM YYYY')
                : 'N/A'}
            </Heading>
            <Text fontWeight={500} fontSize={14} color="brand.400">
              <Box as="span" textDecor="underline">
                {nextDueProperty?.client_name || 'N/A'}
              </Box>{' '}
              for{' '}
              <Box as="span" textDecor="underline">
                {nextDueProperty?.property_name || 'N/A'}
              </Box>
            </Text>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

const InstalmentProperties = ({
  properties,
  loading,
}: {
  properties: any;
  loading: boolean;
}) => {
  return (
    <Box>
      <Stack spacing="20px">
        <PropertyStats
          totalProperties={properties?.data?.total_instalment_property || 0}
          totalInstalment={properties?.data?.total_instalment_payments || 0}
          totalCommission={properties?.data?.total_commission || 0}
          nextDueProperty={properties?.data?.next_due_date}
        />
        <PropertyListTable
          properties={properties?.data?.instalment_properties}
          loading={loading}
        />
      </Stack>
    </Box>
  );
};

export default InstalmentProperties;
