import {
  Box,
  Flex,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack,
  Heading,
  Image,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { Fragment, useContext } from 'react';
import { DeleteAsset, GetUserAssets } from '~/lib/api/services/assetsService';
import {
  LocationIcon,
  ProfitIcon,
  VerticalEllipsisIcon,
  PreviousPageIcon,
  NextPageIcon,
  EmptyAssetIcon,
} from '~/lib/components/Icons/Icons';
import SkeletonLoader from '~/lib/components/SkeletonLoader';
import { FormatAmount } from '~/lib/utils/formatAmount';
import useNavigate from '~/lib/utils/useNavigate';
import DeleteAssetConfirmationModal from '../Modals/DeleteAssetConfirmationModal';
import { AppContext } from '~/lib/layout';

const Cashflow = ({
  assets,
  setAssets,
  loading,
  page,
  setPage,
  hasNextPage,
  dataPerPage,
}: {
  assets: any[];
  setAssets: any;
  loading: boolean;
  page: number;
  setPage: (page: number) => void;
  hasNextPage: boolean;
  dataPerPage: number;
}) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedAssetId, setSelectedAssetId] = React.useState<string>('');
  const { selectedCurrency } = useContext(AppContext);

  const deleteAsset = async () => {
    setIsLoading(true);
    try {
      const res = await DeleteAsset(selectedAssetId);
      if (res.status) {
        const res = await GetUserAssets(dataPerPage, page);
        setAssets(res.data);
        setIsLoading(false);
        setIsOpen(false);
        toast({
          title: 'Asset Deleted',
          description: 'Asset has been deleted successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
    } catch (error: any) {
      console.error('Error deleting asset:', error);
      setIsLoading(false);
      toast({
        title: 'Error Deleting Asset',
        description: error?.response?.data?.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <Box>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <Fragment>
          {assets?.length < 1 ? (
            <Box maxW="465px" mx="auto" my="5">
              <Stack spacing="15px" alignItems="center" textAlign="center">
                {' '}
                <EmptyAssetIcon />
                <Heading fontSize={18}>No Cash Flow Properties Yet!</Heading>
                <Text color="#2E353F">
                  You haven’t added any cash-flowing assets. Track rental
                  income, monitor returns, and manage payments effortlessly.
                </Text>
              </Stack>
            </Box>
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
                      Property
                    </Th>
                    <Th
                      color="#222222"
                      fontWeight={500}
                      fontSize={14}
                      textTransform="capitalize"
                    >
                      Property Type
                    </Th>
                    <Th
                      color="#222222"
                      fontWeight={500}
                      fontSize={14}
                      textTransform="capitalize"
                    >
                      Amount Purchased
                    </Th>
                    <Th
                      color="#222222"
                      fontWeight={500}
                      fontSize={14}
                      textTransform="capitalize"
                    >
                      Current asset value
                    </Th>
                    <Th
                      color="#222222"
                      fontWeight={500}
                      fontSize={14}
                      textTransform="capitalize"
                    >
                      Duration
                    </Th>
                    <Th
                      color="#222222"
                      fontWeight={500}
                      fontSize={14}
                      textTransform="capitalize"
                    >
                      Remittance amount
                    </Th>
                    <Th
                      color="#222222"
                      fontWeight={500}
                      fontSize={14}
                      textTransform="capitalize"
                    >
                      No of Payments
                    </Th>

                    <Th
                      color="#222222"
                      fontWeight={500}
                      fontSize={14}
                      textTransform="capitalize"
                    >
                      Next Due Remittance
                    </Th>
                    <Th
                      color="#222222"
                      fontWeight={500}
                      fontSize={14}
                      textTransform="capitalize"
                    ></Th>
                  </Tr>
                </Thead>
                <Tbody color="#222222" maxH="250px" overflow="auto">
                  {assets?.map((asset) => {
                    return (
                      <Tr
                        border="none"
                        _hover={{ bg: '#f5f5f5' }}
                        cursor="pointer"
                      >
                        <Td fontSize={15} color="#222222" fontWeight={600}>
                          <Stack>
                            <Heading
                              color="#2E353F"
                              fontSize={16}
                              fontWeight={600}
                            >
                              {asset?.property_name}
                            </Heading>
                            <Flex alignItems="center" gap="10px">
                              <LocationIcon />
                              <Text fontSize={12} color="#222222">
                                {asset?.city_name}
                              </Text>
                            </Flex>
                          </Stack>
                        </Td>
                        <Td fontWeight={500} fontSize={14} color="#8295AA">
                          {asset?.property_type}
                        </Td>
                        <Td fontWeight={500} fontSize={14} color="#8295AA">
                          {asset?.property_cost?.display_value
                            ? FormatAmount(
                                Number(asset?.property_cost?.display_value),
                                asset?.property_cost?.display_currency
                              )
                            : FormatAmount(Number(asset?.property_cost))}
                        </Td>
                        <Td fontWeight={500} fontSize={14} color="#8295AA">
                          {selectedCurrency?.code !== 'NGN' ? (
                            <>
                              {asset?.current_valuation?.value?.display_value
                                ? FormatAmount(
                                    Number(
                                      asset?.current_valuation?.value
                                        ?.display_value
                                    ),
                                    asset?.current_valuation?.value
                                      ?.display_currency
                                  )
                                : FormatAmount(
                                    Number(asset?.current_valuation)
                                  )}
                            </>
                          ) : (
                            <>
                              {asset?.current_valuation?.value
                                ? FormatAmount(
                                    Number(asset?.current_valuation?.value),
                                    selectedCurrency?.code
                                  )
                                : FormatAmount(
                                    Number(asset?.current_valuation)
                                  )}
                            </>
                          )}
                        </Td>
                        <Td fontWeight={500} fontSize={14} color="#8295AA">
                          {asset?.cashflow_duration
                            ? `${asset?.cashflow_duration}`
                            : 'N/A'}
                        </Td>
                        <Td fontWeight={500} fontSize={14} color="#8295AA">
                          {asset?.cashflow_amount?.display_value
                            ? FormatAmount(
                                Number(asset?.cashflow_amount?.display_value),
                                asset?.cashflow_amount?.display_currency
                              )
                            : FormatAmount(Number(asset?.cashflow_amount))}
                        </Td>
                        <Td fontWeight={500} fontSize={14} color="#8295AA">
                          {asset?.no_of_payments
                            ? `${asset?.no_of_payments}`
                            : 0}
                        </Td>
                        <Td fontWeight={500} fontSize={14} color="#8295AA">
                          {asset?.cashflow_payment_due
                            ? moment(asset?.cashflow_payment_due).format(
                                'ddd, Do MMMM YYYY'
                              )
                            : 'N/A'}
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
                                  navigate(`/user/my-assets/${asset?.id}`)
                                }
                              >
                                View asset
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
                                    `/user/my-assets/${asset?.id}/update-details`
                                  )
                                }
                              >
                                Update asset details
                              </MenuItem>
                              <MenuItem
                                py="12px"
                                px="16px"
                                _hover={{ bg: 'border.100' }}
                                fontSize={14}
                                color="color.100"
                                fontWeight={500}
                                onClick={() => {
                                  setIsOpen(true);
                                  setSelectedAssetId(asset?.id);
                                }}
                              >
                                Update asset value
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
                                    `/user/portfolio/${asset?.id}/payments`
                                  )
                                }
                              >
                                View payments
                              </MenuItem>
                              <MenuItem
                                py="12px"
                                px="16px"
                                _hover={{ bg: 'border.100' }}
                                fontSize={14}
                                color="color.100"
                                fontWeight={500}
                                onClick={() => {
                                  setIsOpen(true);
                                  setSelectedAssetId(asset?.id);
                                }}
                              >
                                Delete asset
                              </MenuItem>
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
                      onClick={() => setPage(page - 1)}
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
                      onClick={() => setPage(page + 1)}
                      isDisabled={!hasNextPage}
                    >
                      <NextPageIcon />
                    </Button>
                  </Flex>
                </Box>
              )}
            </TableContainer>
          )}
        </Fragment>
      )}
      <DeleteAssetConfirmationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        loading={isLoading}
        deleteAsset={deleteAsset}
      />
    </Box>
  );
};

export default Cashflow;
