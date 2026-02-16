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
} from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  InputSearchIcon,
  FilterPropertiesIcon,
  ShowFilterPropertiesIcon,
} from '../Icons/Icons';

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
    <Box>
      <Stack spacing="16px" borderBottom="1px solid #E4E4E4" py="12px">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          flexWrap={['wrap', 'nowrap']}
          gap={['20px', '0px']}
          w="full"
        >
          <InputGroup w="60%">
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
        {showFilterDropdowns && (
          <Flex alignItems="center" gap="16px">
            <Select
              placeholder="Select sales type"
              py="12px"
              rounded="50px"
              border="1px solid"
              borderColor="#C0C0C0"
              h="46px"
              _placeholder={{ color: '#8295AA', fontWeight: 500, fontSize: 14 }}
              value={salesType}
              onChange={handleSalesTypeChange}
            >
              <option value="all">All</option>
              <option value="sold">Sold</option>
              <option value="outright">Outright</option>
              <option value="instalment">Instalment</option>
            </Select>
            <Select
              placeholder="Select handover status"
              py="12px"
              rounded="50px"
              border="1px solid"
              borderColor="#C0C0C0"
              h="46px"
              _placeholder={{ color: '#8295AA', fontWeight: 500, fontSize: 14 }}
              value={handoverStatus}
              onChange={handleHandoverStatusChange}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </Select>
            <Select
              placeholder="Select allocation status"
              py="12px"
              rounded="50px"
              border="1px solid"
              borderColor="#C0C0C0"
              h="46px"
              _placeholder={{ color: '#8295AA', fontWeight: 500, fontSize: 14 }}
              value={allocationStatus}
              onChange={handleAllocationStatusChange}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </Select>
            <Select
              placeholder="Select documentation status"
              py="12px"
              rounded="50px"
              border="1px solid"
              borderColor="#C0C0C0"
              h="46px"
              _placeholder={{ color: '#8295AA', fontWeight: 500, fontSize: 14 }}
              value={documentationStatus}
              onChange={handleDocumentationStatusChange}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </Select>
          </Flex>
        )}
      </Stack>
    </Box>
  );
};

export default PropertyFilter;
