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
import React, { Fragment } from 'react';
import { DeleteAsset, GetUserAssets } from '~/lib/api/services/assetsService';
import {
  LocationIcon,
  ProfitIcon,
  VerticalEllipsisIcon,
  PreviousPageIcon,
  NextPageIcon,
} from '~/lib/components/Icons/Icons';
import SkeletonLoader from '~/lib/components/SkeletonLoader';
import { FormatAmount } from '~/lib/utils/formatAmount';
import useNavigate from '~/lib/utils/useNavigate';
import DeleteAssetConfirmationModal from '../Modals/DeleteAssetConfirmationModal';


const Cashflow = ({
  assets,
  setAssets,
  loading,
}: {
  assets: any[];
  setAssets: any;
  loading: boolean;
}) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(20);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedAssetId, setSelectedAssetId] = React.useState<string>('');

   const deleteAsset = async () => {
     setIsLoading(true);
     try {
       const res = await DeleteAsset(selectedAssetId);
       if (res.status) {
         const res = await GetUserAssets();
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
                <Image src="/assets/images/briefcase.png" />
                <Heading fontSize={18}>No Cash Flow Properties Yet!</Heading>
                <Text color="#2E353F">
                  You haven’t added any cash-flowing assets. Track rental
                  income, monitor returns, and manage payments effortlessly.
                </Text>
              </Stack>
            </Box>
          ) : (
            <TableContainer>
              <Table border="none" variant="unstyled">
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
                      Status
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
                  {assets
                    ?.slice((page - 1) * limit, page * limit)
                    ?.map((asset) => {
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
                            {asset?.property_cost
                              ? `${FormatAmount(Number(asset?.property_cost))}`
                              : 'N/A'}
                          </Td>
                          <Td fontWeight={500} fontSize={14} color="#8295AA">
                            Completed
                          </Td>
                          <Td fontWeight={500} fontSize={14} color="#8295AA">
                            {asset?.cashflow_amount
                              ? `${FormatAmount(Number(asset?.cashflow_amount))}`
                              : 'N/A'}
                          </Td>
                          <Td fontWeight={500} fontSize={14} color="#8295AA">
                            {asset?.payment_count ? asset?.payment_count : 0}
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
            </TableContainer>
          )}
          {assets?.length > 0 && (
            <Box w="full" bg="white" py="20px" borderY="1px solid #E4E7EC">
              <Flex alignItems="center" justifyContent="center" gap="13px">
                <Button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  isDisabled={page === 1}
                  border="1px solid #E4E4E4"
                  rounded="6px"
                  variant="outline"
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
