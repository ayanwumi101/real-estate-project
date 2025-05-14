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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { DeleteAsset, GetUserAssets } from '~/lib/api/services/assetsService';
import {
  LocationIcon,
  ProfitIcon,
  VerticalEllipsisIcon,
} from '~/lib/components/Icons/Icons';
import { FormatAmount } from '~/lib/utils/formatAmount';
import useNavigate from '~/lib/utils/useNavigate';

const OwnedAssets = ({
  assets,
  setAssets,
}: {
  assets: any[];
  setAssets: any;
}) => {
  const toast = useToast();
  const navigate = useNavigate();
  const totalValuation = assets?.reduce((acc, asset) => {
    return acc + Number(asset?.property_cost);
  }, 0);

  const deleteAsset = async (id: string) => {
    try {
      const res = await DeleteAsset(id);
      console.log(res);
      if (res.status) {
        const res = await GetUserAssets();
        setAssets(res.data);
        toast({
          title: 'Asset Deleted',
          description: 'Asset has been deleted successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
    } catch (error) {
      console.error('Error deleting asset:', error);
      toast({
        title: 'Error Deleting Asset',
        description: 'An error occurred while deleting the asset',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };
  return (
    <Box>
      {assets?.length < 1 ? (
        <Box maxW="465px" mx="auto" my="5">
          <Stack spacing="15px" alignItems="center" textAlign="center">
            {' '}
            <Image src="/assets/images/briefcase.png" />
            <Heading fontSize={18}>No Owned Properties Listed!</Heading>
            <Text color="#2E353F">
              Manage and monitor all your properties all in one place. Upload
              ownership details and stay organized.
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
                  Delivery Status
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
              {assets?.map((asset) => {
                return (
                  <Tr key={asset?.id} border="none" cursor="pointer">
                    <Td fontSize={15} color="#222222" fontWeight={600}>
                      <Stack>
                        <Heading color="#2E353F" fontSize={16} fontWeight={600}>
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
                      {FormatAmount(Number(asset?.property_cost))}
                    </Td>
                    <Td fontWeight={500} fontSize={14} color="#8295AA">
                      {asset?.allocation_status}
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
                            onClick={() => deleteAsset(asset?.id)}
                          >
                            Delete asset
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Td>
                  </Tr>
                );
              })}
              <Tr borderBlock="1px solid #C0C0C0">
                <Td color="brand.300" fontWeight={600}>
                  Total Valuation
                </Td>
                <Td></Td>
                <Td color="brand.400" fontWeight={500}>
                  {FormatAmount(Number(totalValuation))}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default OwnedAssets;
