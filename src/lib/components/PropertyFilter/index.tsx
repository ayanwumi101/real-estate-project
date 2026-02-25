import {
  Stack,
  Flex,
  Input,
  InputGroup,
  Button,
  Box,
  Select,
  Divider,
  InputLeftElement,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  InputSearchIcon,
  FilterPropertiesIcon,
  ShowFilterPropertiesIcon,
} from '../Icons/Icons';
import { GetCountryStates } from '~/lib/api/services/locationService';

interface PropertyFilterType {
  searchQuery: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  salesType: string;
  handleSalesTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handoverStatus: string;
  handleHandoverStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  allocationStatus: string;
  handleAllocationStatusChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  documentationStatus: string;
  handleDocumentationStatusChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

interface PropertyFilterWithLocationType {
  searchQuery: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  salesType: string;
  handleSalesTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handoverStatus: string;
  handleHandoverStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  allocationStatus: string;
  handleAllocationStatusChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  documentationStatus: string;
  handleDocumentationStatusChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  location: string;
  handleLocationChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  states: {
    id: string;
    name: string;
    state_code: string;
    latitude: string;
    longitude: string;
    type: string;
  }[];
  setStates: (
    states: {
      id: string;
      name: string;
      state_code: string;
      latitude: string;
      longitude: string;
      type: string;
    }[]
  ) => void;
}

const PropertyFilter = ({
  searchQuery,
  handleSearchChange,
  salesType,
  handleSalesTypeChange,
  handoverStatus,
  handleHandoverStatusChange,
  allocationStatus,
  handleAllocationStatusChange,
  documentationStatus,
  handleDocumentationStatusChange,
}: PropertyFilterType) => {
  const [showFilterDropdowns, setShowFilterDropdowns] =
    useState<boolean>(false);
  return (
    <Box w="full">
      <Stack w="full" spacing="25px" borderBottom="1px solid #E4E4E4" py="12px">
        {/* search input and filter button section */}
        <Flex
          alignItems="center"
          justifyContent="space-between"
          gap={['10px', '0px']}
          w="full"
        >
          <InputGroup w={['full', '60%']}>
            <InputLeftElement pointerEvents="none">
              <InputSearchIcon />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search client..."
              rounded="50px"
              fontSize={14}
              w="full"
              _placeholder={{ color: 'gray.500' }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </InputGroup>

          <Button
            leftIcon={
              showFilterDropdowns ? (
                <ShowFilterPropertiesIcon />
              ) : (
                <FilterPropertiesIcon />
              )
            }
            variant="ghost"
            border="1px solid"
            borderColor={showFilterDropdowns ? '#D8D8FF' : '#E4E4E4'}
            fontWeight={500}
            fontSize={14}
            color="#2E353F"
            onClick={() => setShowFilterDropdowns(!showFilterDropdowns)}
            bg={showFilterDropdowns ? '#EDEDFF' : 'none'}
          >
            Filter
          </Button>
        </Flex>
        {/* filter dropdowns section */}
        {showFilterDropdowns && (
          <Flex alignItems="center" gap="16px" overflow="auto" w="full">
            <FormControl>
              <FormLabel fontSize={14} my="0" fontWeight={600}>
                Sales Type
              </FormLabel>
              <Select
                placeholder="Select sales type"
                py="12px"
                rounded="50px"
                border="1px solid"
                borderColor="#C0C0C0"
                h="46px"
                _placeholder={{
                  color: '#8295AA',
                  fontWeight: 500,
                  fontSize: 14,
                }}
                value={salesType}
                onChange={handleSalesTypeChange}
                w={['250px', 'auto']}
              >
                <option value="">All</option>
                {/* <option value="sold">Sold</option> */}
                <option value="outright">Outright</option>
                <option value="instalment">Instalment</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={14} my="0" fontWeight={600}>
                Handover Status
              </FormLabel>
              <Select
                placeholder="Select handover status"
                py="12px"
                rounded="50px"
                border="1px solid"
                borderColor="#C0C0C0"
                h="46px"
                _placeholder={{
                  color: '#8295AA',
                  fontWeight: 500,
                  fontSize: 14,
                }}
                value={handoverStatus}
                onChange={handleHandoverStatusChange}
                w={['250px', 'auto']}
              >
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel fontSize={14} my="0" fontWeight={600}>
                Allocation Status
              </FormLabel>
              <Select
                placeholder="Select allocation status"
                py="12px"
                rounded="50px"
                border="1px solid"
                borderColor="#C0C0C0"
                h="46px"
                _placeholder={{
                  color: '#8295AA',
                  fontWeight: 500,
                  fontSize: 14,
                }}
                value={allocationStatus}
                onChange={handleAllocationStatusChange}
                w={['250px', 'auto']}
              >
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel fontSize={14} my="0" fontWeight={600}>
                Documentation Status
              </FormLabel>
              <Select
                placeholder="Select documentation status"
                py="12px"
                rounded="50px"
                border="1px solid"
                borderColor="#C0C0C0"
                h="46px"
                _placeholder={{
                  color: '#8295AA',
                  fontWeight: 500,
                  fontSize: 14,
                }}
                value={documentationStatus}
                onChange={handleDocumentationStatusChange}
                w={['250px', 'auto']}
              >
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </Select>
            </FormControl>
          </Flex>
        )}
      </Stack>
    </Box>
  );
};

export default PropertyFilter;

export const PropertyFilterWithLocation = ({
  searchQuery,
  handleSearchChange,
  salesType,
  handleSalesTypeChange,
  handoverStatus,
  handleHandoverStatusChange,
  allocationStatus,
  handleAllocationStatusChange,
  documentationStatus,
  handleDocumentationStatusChange,
  location,
  handleLocationChange,
  states,
  setStates,
}: PropertyFilterWithLocationType) => {
  const [showFilterDropdowns, setShowFilterDropdowns] =
    useState<boolean>(false);

  useEffect(() => {
    const getCountryStates = async () => {
      try {
        const response = await GetCountryStates(
          'da4e88a4-4c55-4724-8727-098b50731b96'
        );
        setStates(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCountryStates();
  }, []);
  return (
    <Box w="full">
      <Stack w="full" spacing="25px" borderBottom="1px solid #E4E4E4" py="12px">
        {/* search input and filter button section */}
        <Flex
          alignItems="center"
          justifyContent="space-between"
          gap={['10px', '0px']}
          w="full"
        >
          <InputGroup w={['full', '60%']}>
            <InputLeftElement pointerEvents="none">
              <InputSearchIcon />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search client..."
              rounded="50px"
              fontSize={14}
              w="full"
              _placeholder={{ color: 'gray.500' }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </InputGroup>

          <Button
            leftIcon={
              showFilterDropdowns ? (
                <ShowFilterPropertiesIcon />
              ) : (
                <FilterPropertiesIcon />
              )
            }
            variant="ghost"
            border="1px solid"
            borderColor={showFilterDropdowns ? '#D8D8FF' : '#E4E4E4'}
            fontWeight={500}
            fontSize={14}
            color="#2E353F"
            onClick={() => setShowFilterDropdowns(!showFilterDropdowns)}
            bg={showFilterDropdowns ? '#EDEDFF' : 'none'}
          >
            Filter
          </Button>
        </Flex>
        {/* filter dropdowns section */}
        {showFilterDropdowns && (
          <Flex alignItems="center" gap="16px" overflow="auto" w="full">
            <FormControl>
              <FormLabel fontSize={14} my="0" fontWeight={600}>
                Location
              </FormLabel>
              <Select
                placeholder="Select property location"
                py="12px"
                rounded="50px"
                border="1px solid"
                borderColor="#C0C0C0"
                h="46px"
                _placeholder={{
                  color: '#8295AA',
                  fontWeight: 500,
                  fontSize: 14,
                }}
                value={location}
                onChange={handleLocationChange}
                w={['250px', 'auto']}
              >
                <option value="all">All</option>
                {states?.map((state) => (
                  <option key={state?.id} value={state?.id}>
                    {state?.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            {/* <FormControl>
              <FormLabel fontSize={14} my="0" fontWeight={600}>
                Sales Type
              </FormLabel>
              <Select
                placeholder="Select sales type"
                py="12px"
                rounded="50px"
                border="1px solid"
                borderColor="#C0C0C0"
                h="46px"
                _placeholder={{
                  color: '#8295AA',
                  fontWeight: 500,
                  fontSize: 14,
                }}
                value={salesType}
                onChange={handleSalesTypeChange}
                w={['250px', 'auto']}
              >
                <option value="all">All</option>
                <option value="sold">Sold</option>
                <option value="outright">Outright</option>
                <option value="instalment">Instalment</option>
              </Select>
            </FormControl> */}
            <FormControl>
              <FormLabel fontSize={14} my="0" fontWeight={600}>
                Handover Status
              </FormLabel>
              <Select
                placeholder="Select handover status"
                py="12px"
                rounded="50px"
                border="1px solid"
                borderColor="#C0C0C0"
                h="46px"
                _placeholder={{
                  color: '#8295AA',
                  fontWeight: 500,
                  fontSize: 14,
                }}
                value={handoverStatus}
                onChange={handleHandoverStatusChange}
                w={['250px', 'auto']}
              >
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel fontSize={14} my="0" fontWeight={600}>
                Allocation Status
              </FormLabel>
              <Select
                placeholder="Select allocation status"
                py="12px"
                rounded="50px"
                border="1px solid"
                borderColor="#C0C0C0"
                h="46px"
                _placeholder={{
                  color: '#8295AA',
                  fontWeight: 500,
                  fontSize: 14,
                }}
                value={allocationStatus}
                onChange={handleAllocationStatusChange}
                w={['250px', 'auto']}
              >
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel fontSize={14} my="0" fontWeight={600}>
                Documentation Status
              </FormLabel>
              <Select
                placeholder="Select documentation status"
                py="12px"
                rounded="50px"
                border="1px solid"
                borderColor="#C0C0C0"
                h="46px"
                _placeholder={{
                  color: '#8295AA',
                  fontWeight: 500,
                  fontSize: 14,
                }}
                value={documentationStatus}
                onChange={handleDocumentationStatusChange}
                w={['250px', 'auto']}
              >
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </Select>
            </FormControl>
          </Flex>
        )}
      </Stack>
    </Box>
  );
};
