'use client';

import React, { useEffect, useState } from 'react';
import NavigationTab from './components/NavigationTab';
import {
  Box,
  Stack,
  Button,
  Heading,
  Flex,
  Text,
  Input,
  InputLeftElement,
  InputGroup,
  Select,
  FormLabel,
  SkeletonText,
} from '@chakra-ui/react';
import {
  LocationIcon,
  InputSearchIcon,
  ChevronLeftIcon,
} from '~/lib/components/Icons/Icons';
import CompletedPayments from './components/CompletedPayments';
import PendingPayments from './components/PendingPayments';
import { useParams } from 'next/navigation';
import {
  GetAssetRemittances,
  GetAssetDetails,
} from '~/lib/api/services/assetsService';
import useNavigate from '~/lib/utils/useNavigate';

const index = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const tabs = ['pending payments', 'completed payments'];
  const [isLoading, setIsLoading] = React.useState(false);
  const [assetDetails, setAssetDetails] = useState<any>([]);
  const [assetRemittances, setAssetRemittances] = useState<any>(null);
  const [activeTab, setActiveTab] = React.useState<string>('pending payments');

  const getAssetDetails = async () => {
    setIsLoading(true);
    try {
      const res = await GetAssetDetails(id);
      const data = await res.data;
      setAssetDetails(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const getAssetRemittances = async () => {
    setIsLoading(true);
    try {
      const res = await GetAssetRemittances(id);
      const data = await res.data;
      setAssetRemittances(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAssetDetails();
    getAssetRemittances();
  }, [id]);

  const completedPayments = assetRemittances?.filter(
    (remittance: any) => remittance?.payment_status === 'completed'
  );

  const pendingPayments = assetRemittances?.filter(
    (remittance: any) => remittance?.payment_status === 'pending'
  );
  return (
    <Box
      py="40px"
      px="40px"
      borderTop="1px solid"
      borderColor="border.100"
      w="full"
    >
      <Stack spacing="30px" alignItems="flex-start" w="full">
        <Button
          onClick={() => navigate('/user/my-assets')}
          variant="ghost"
          leftIcon={<ChevronLeftIcon />}
          p="0"
          _hover={{ bg: 'none' }}
          color="brand.100"
        >
          Back
        </Button>
        <Box w="full">
          {isLoading ? (
            <SkeletonText noOfLines={3} spacing="4" skeletonHeight="4" />
          ) : (
            <Stack spacing="15px">
              <Heading fontWeight={500} fontSize={24}>
                {assetDetails?.property_name || 'Property Name'}
              </Heading>
              <Flex alignItems="center" gap="10px">
                <LocationIcon />
                <Text fontWeight={500}>
                  {`${assetDetails?.house_number}, ${assetDetails?.street_name}, ${assetDetails?.city_name}, ${assetDetails?.state_id} state.`}
                </Text>
              </Flex>
            </Stack>
          )}
        </Box>
        <NavigationTab
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          assetType={assetDetails?.asset_type}
          totalAmountReceived={assetDetails?.total_remittance_amount || 0}
        />
        <Box w="full">
          <Stack spacing="24px" w="full">
            {/* Search and filter section */}
            <Flex alignItems="center" justifyContent="space-between">
              {/* search input */}
              <InputGroup w="250px">
                <InputLeftElement>
                  <InputSearchIcon />
                </InputLeftElement>
                <Input w="full" rounded="40px" placeholder="Search order" />
              </InputGroup>
              <Box>
                <Flex alignItems="center" gap="30px">
                  {/* remittance status filter section */}
                  <Flex alignItems="center">
                    <FormLabel
                      htmlFor="filter"
                      fontSize="14px"
                      color="brand.400"
                      fontWeight={500}
                    >
                      {assetDetails?.asset_type === 'cashflow'
                        ? 'Cashflow'
                        : 'Installment'}{' '}
                      Status
                    </FormLabel>
                    <Select
                      id="filter"
                      placeholder="Select status"
                      w="220px"
                      borderColor="border.100"
                      rounded="40px"
                    >
                      <option value="all">All</option>
                      <option value="pending">Pending</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                    </Select>
                  </Flex>

                  {/* date filter section */}
                  <Flex alignItems="center">
                    <FormLabel
                      htmlFor="filter"
                      fontSize="14px"
                      color="brand.400"
                      fontWeight={500}
                    >
                      Date
                    </FormLabel>
                    <Input
                      id="filter"
                      type="date"
                      w="200px"
                      rounded="40px"
                      borderColor="border.100"
                      _placeholder={{ color: 'brand.400' }}
                      placeholder="Select date"
                    />
                  </Flex>
                </Flex>
              </Box>
            </Flex>
            {/* Payment list section */}
            <Box>
              {activeTab === 'pending payments' ? (
                <PendingPayments
                  remittances={pendingPayments}
                  isLoading={isLoading}
                />
              ) : (
                <CompletedPayments
                  remittances={completedPayments}
                  isLoading={isLoading}
                />
              )}
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default index;
