import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
} from '@chakra-ui/react';
import React from 'react';
import { AddIcon, InputSearchIcon } from '~/lib/components/Icons/Icons';

interface NavigationTabProps {
  setActiveTab: React.Dispatch<
    React.SetStateAction<'available' | 'sold' | 'instalment'>
  >;
  activeTab: 'available' | 'sold' | 'instalment';
  tabs: string[];
}

const NavigationTab: React.FC<NavigationTabProps> = ({
  setActiveTab,
  activeTab,
  tabs,
}) => {
  return (
    <Box borderBottom='1px solid' borderColor='border.100' pb='20px'>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center" gap="10px">
          {tabs.map((tab) => (
            <Button
              key={tab}
              onClick={() =>
                setActiveTab(tab as 'available' | 'sold' | 'instalment')
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
          <Button leftIcon={<AddIcon />} bg="brand.100" color='brand.200' fontWeight={600}>
            Add New Property
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavigationTab;
