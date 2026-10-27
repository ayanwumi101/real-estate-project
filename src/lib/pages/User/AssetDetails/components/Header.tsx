import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
  LocationIcon,
  ChevronLeftIcon,
  AddIcon,
  UpdateAssetDetailsIcon,
  VerticalEllipsisIcon,
} from '~/lib/components/Icons/Icons';
import useNavigate from '~/lib/utils/useNavigate';
import DeleteAssetConfirmationModal from '../../MyAssets/Modals/DeleteAssetConfirmationModal';
import {
  ChangeAssetStatus as ChangeAssetStatusApi,
  DeleteAsset,
} from '~/lib/api/services/assetsService';
import ChangeAssetStatusModal from '../Modals/ChangeAssetStatusModal';
import UpdateAssetValueModal from '../../MyAssets/Modals/UpdateAssetValueModal';

interface Headerprops {
  propertyName: string;
  location: string;
  loading: boolean;
  assetType: string;
}

const Header = ({
  propertyName,
  location,
  loading,
  assetType,
}: Headerprops) => {
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isChanging, setIsChanging] = useState<boolean>(false);
  const [assetStatus, setAssetStatus] = useState<string>('');
  const [openValuationModal, setOpenValuationModal] = useState(false);

  const ChangeAssetStatus = async () => {
    setIsChanging(true);
    try {
      await ChangeAssetStatusApi(id as string, {
        is_occupied: assetStatus === 'occupied' ? true : false,
      });
      toast({
        title: 'Asset Status Changed',
        description: 'Asset status has been changed successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      setOpenModal(false);
      window.location.reload();
    } catch (error: any) {
      toast({
        title: 'Error',
        description:
          error?.response?.data?.error?.message ||
          'Failed to change asset status',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
    setIsChanging(false);
  };

  const deleteAsset = async () => {
    setIsLoading(true);
    try {
      const res = await DeleteAsset(id as string);
      if (res.status) {
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
        navigate('/user/my-assets');
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
    <Box
      py="30px"
      px={['20px', '40px']}
      borderBottom="1px solid #E4E4E4"
      w="full"
    >
      <Stack spacing="30px" alignItems="flex-start" w="full">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          leftIcon={<ChevronLeftIcon />}
          p="0"
          _hover={{ bg: 'none' }}
          color="brand.100"
        >
          Back
        </Button>
        <Flex
          alignItems="flex-start"
          justifyContent="space-between"
          gap={['20px', 0]}
          flexWrap={['wrap', 'wrap', 'nowrap']}
          w="full"
        >
          <Box w="full">
            {loading ? (
              <Stack spacing="10px" w="full">
                <Skeleton w="50%" h="30px"></Skeleton>
                <SkeletonText
                  noOfLines={2}
                  skeletonHeight={3}
                  w="60%"
                ></SkeletonText>
              </Stack>
            ) : (
              <Stack spacing="10px">
                <Heading fontSize={[20, 24]} fontWeight={500} color="#222222">
                  {propertyName ? propertyName : 'Property Name'}
                </Heading>
                <Flex alignItems="center" gap="10px">
                  <LocationIcon />
                  <Text color="#2E353F" fontWeight={500}>
                    {location ? location : 'Location'}
                    {/* Plot 10, Adewunmi Layout, Iju Ishaga, Lagos */}
                  </Text>
                </Flex>
              </Stack>
            )}
          </Box>
          <Box>
            {loading ? (
              <Flex alignItems="center" gap="10px">
                <Skeleton w="180px" rounded="60px" h="45px"></Skeleton>
                <Skeleton w="45px" h="45px" rounded="10px"></Skeleton>
              </Flex>
            ) : (
              <Flex alignItems="center" gap="10px">
                <Button
                  bg="#000080"
                  _hover={{ bg: '#000080' }}
                  color="#ffffff"
                  fontWeight={500}
                  fontSize={14}
                  leftIcon={<UpdateAssetDetailsIcon />}
                  h="42px"
                  onClick={() =>
                    navigate(`/user/my-assets/${id}/update-details`)
                  }
                >
                  Update Details
                </Button>
                <Menu>
                  <MenuButton as={Button} rounded="5px" bg="bg.200">
                    <VerticalEllipsisIcon />
                  </MenuButton>
                  <MenuList py="0px">
                    {assetType === 'cashflow' && (
                      <MenuItem
                        py="12px"
                        px="16px"
                        _hover={{ bg: 'border.100' }}
                        fontSize={14}
                        color="color.100"
                        fontWeight={500}
                        onClick={() => setOpenModal(true)}
                      >
                        Change asset status
                      </MenuItem>
                    )}
                    {assetType !== 'owned' && (
                      <MenuItem
                        py="12px"
                        px="16px"
                        _hover={{ bg: 'border.100' }}
                        fontSize={14}
                        color="color.100"
                        fontWeight={500}
                        onClick={() =>
                          navigate(`/user/my-assets/${id}/add-payment`)
                        }
                      >
                        Add payment
                      </MenuItem>
                    )}
                    {assetType !== 'owned' && (
                      <MenuItem
                        py="12px"
                        px="16px"
                        _hover={{ bg: 'border.100' }}
                        fontSize={14}
                        color="color.100"
                        fontWeight={500}
                        onClick={() =>
                          navigate(`/user/portfolio/${id}/payments`)
                        }
                      >
                        View payment history
                      </MenuItem>
                    )}
                    <MenuItem
                      py="12px"
                      px="16px"
                      _hover={{ bg: 'border.100' }}
                      fontSize={14}
                      color="color.100"
                      fontWeight={500}
                      onClick={() => setOpenValuationModal(true)}
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
                      onClick={() => {
                        setIsOpen(true);
                      }}
                    >
                      Delete asset
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            )}
          </Box>
        </Flex>
      </Stack>
      <DeleteAssetConfirmationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        loading={isLoading}
        deleteAsset={deleteAsset}
      />
      <ChangeAssetStatusModal
        loading={isChanging}
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        changeAssetStatus={ChangeAssetStatus}
        assetStatus={assetStatus}
        setAssetStatus={setAssetStatus}
      />
      <UpdateAssetValueModal
        propertyId={id as string}
        isOpen={openValuationModal}
        onClose={() => setOpenValuationModal(false)}
      />
    </Box>
  );
};

export default Header;
