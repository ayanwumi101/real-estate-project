import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Flex, Select
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { AddIcon, InputSearchIcon } from '~/lib/components/Icons/Icons';

interface NavigationTabProps {
  setActiveTab: React.Dispatch<
    React.SetStateAction<'assets' | 'transactions' | 'securities' | 'analytics'>
  >;
  activeTab: 'assets' | 'transactions' | 'securities' | 'analytics';
  tabs: string[];
}

const NavigationTab: React.FC<NavigationTabProps> = ({
  setActiveTab,
  activeTab,
  tabs,
}) => {
  return (
    <Box borderBottom="1px solid" borderColor="border.100" pb="20px">
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center" gap="7px">
          {tabs.map((tab) => (
            <Button
              key={tab}
              onClick={() =>
                setActiveTab(
                  tab as 'assets' | 'transactions' | 'securities' | 'analytics'
                )
              }
              border="none"
              rounded="50px"
              h="40px"
              bg={activeTab === tab ? 'brand.500' : 'none'}
              color={activeTab === tab ? 'brand.100' : 'brand.800'}
              fontSize={15}
              fontWeight={600}
              px="22px"
              py="16px"
              textTransform={'capitalize'}
            >
              {`${tab} (10)`}
            </Button>
          ))}
        </Flex>

        <Flex alignItems="center" gap="10px">
          <Select w='160px' rounded='50px' border='1px solid' borderColor='border.100'>
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
          </Select>
          <InputGroup w="325px">
            <InputLeftElement pointerEvents="none">
              <InputSearchIcon />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search properties..."
              rounded="50px"
              fontSize={14}
              _placeholder={{ color: 'gray.500' }}
            />
          </InputGroup>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavigationTab;
